"use client"

import { getStringType, strictString } from "@/lib/checker";
import type { LLMs } from "@/ai/model";
import { LLM } from "@/lib/model/data";
import { getBaseRaw } from "@/server/api/util/coder";
import { useEditorStore } from "@/state/editor";
import { useCodeStore, useExtraData, useGeneralStore } from "@/state/scratch";
import { api } from "@/trpc/react";
import { createOpenAI } from "@ai-sdk/openai";
import { ArrowRight, RefreshCw, X } from "lucide-react";
import { useState, type FC, type ReactNode } from "react";
import { CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner"
import { fromError } from 'zod-validation-error';

export const GeneratorForm: FC<React.HTMLAttributes<HTMLFormElement> & { authCard: ReactNode }> = ({ children, authCard, ...props }) => {
    const getEditorAdvanced = useEditorStore(e => e.get)
    const getExtra = useExtraData(e => e.getExtra)
    const updateCode = useCodeStore(e => e.update)
    const updateData = useGeneralStore(e => e.updateData)

    const [isPending, setIsPending] = useState<-1 | 0 | 1>(0)

    const { mutateAsync: mutateAsyncLocal } = api.typeGenerator.fromUnknown.useMutation()

    const { mutateAsync } = api.starter.extirelyFromScratch.useMutation({
        onSuccess: (codes) => {
            updateCode(codes)
            updateData(JSON.stringify(codes.data, null, 2))
            setIsPending(0)
            window.open("/generated")
        },
        onError: (e) => {
            setIsPending(-1)
            toast(e.shape?.readable.title ?? "Failed", {
                description: e.shape?.readable.description ?? "Failed to generate code",
            })
        }
    })

    return (
        <form
            {...props}
            onSubmit={async (e: FormEvent<
                "prompt" | "user", "url" | "local" | "private"
            >) => {
                e.preventDefault();
                setIsPending(1)

                const local = strictString(e.target?.local?.value)

                const files = getExtra().files
                const file = files.length ? files[0] : undefined
                const content = strictString(e.target?.url?.value) ?? strictString(file ? await file.text() : "")

                if (!content) {
                    setIsPending(-1)
                    toast("Data should be provided", {
                        description: "Type API URL or upload/paste a data file (JSON, CSV, YAML)",
                    })
                    return;
                }

                const category = getStringType(content) ?? "URL"

                const user = strictString(e.target.user.value)
                const premium = false

                const advanced: ReturnType<typeof getEditorAdvanced> = getEditorAdvanced()

                const API_KEY = strictString(advanced.API_KEY)
                const API_URL = strictString(advanced.API_URL)
                const model = strictString(advanced.model)
                const provider = strictString(advanced.provider)

                if (!user || !premium) {
                    if (!API_KEY || (!API_URL && (!provider || provider === "custom")) || !model) {
                        setIsPending(-1)
                        toast("LLM settings are not provided", {
                            description: "Try using your own LLM, or Login get direct access",
                        })
                        return;
                    }
                }


                const prompt = strictString(e.target?.prompt?.value)
                    ?? "Create a website using the type definition, minimal & simple website"

                if (!local || !user) {
                    await mutateAsync({
                        prompt,
                        category,
                        content
                    })
                }
                else {
                    const typeResponse = await mutateAsyncLocal({
                        category, content
                    })

                    const API_URL_NEW = API_URL ?? strictString((provider && provider in LLM) ? LLM[provider as keyof LLMs]?.url ?? "" : "")

                    if (!API_URL_NEW) {
                        setIsPending(-1)
                        toast("API URL is not provided", {
                            description: "Try using your own LLM, or Login get direct access",
                        })
                        return;
                    }


                    const providerFunc = createOpenAI({
                        baseURL: API_URL_NEW,
                        apiKey: API_KEY,
                    });

                    const model = providerFunc(advanced.model ?? "");

                    const codeResponse = await getBaseRaw(model)({
                        input: {
                            prompt, type: typeResponse.type
                        }
                    })

                    updateCode(codeResponse)
                    updateData(JSON.stringify(typeResponse.data, null, 2))

                    setIsPending(0)
                    window.open("/generated")

                }
            }}
        >
            {children}
            <CardFooter className="px-4 pt-0 pb-4">
                <div className="flex w-full flex-wrap gap-3">
                    <div className="flex flex-1 items-center gap-1">
                        {authCard}
                    </div>
                    <button
                        type="submit"
                        className="cal-sans relative flex-1 p-[4px] md:max-w-36"
                        disabled={isPending === 1}
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-400 via-pink-400 to-orange-200" />
                        <div className={cn("group relative flex-1 flex items-center justify-center gap-1 rounded-xl bg-black px-4 py-2 text-white transition duration-200 md:justify-end hover:bg-transparent",
                            isPending ? "cursor-not-allowed" : "cursor-pointer",
                        )}>
                            <span className="mt-1">
                                {(() => {
                                    switch (isPending) {
                                        case -1: return "Failed"
                                        case 0: return "Generate"
                                        case 1: return "Generating"
                                    }
                                })()}
                            </span>
                            {(() => {
                                switch (isPending) {
                                    case -1: return <X size={18} />
                                    case 0: return <ArrowRight size={18} />
                                    case 1: return <RefreshCw size={18} className="animate-spin" />
                                }
                            })()}
                        </div>
                    </button>
                </div>
            </CardFooter>
        </form>
    );
}