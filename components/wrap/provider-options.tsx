"use client"

import {
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Combobox } from "@/components/custom/combo-extra";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LLM } from "@/lib/model/data";
import { capitalize } from "@/lib/utils";
import { useEditorStore } from "@/state/editor";
import { BrainCircuit, Landmark, Link, Lock } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { ModelCodeEditor } from "./model-code";
import { strictString } from "@/lib/checker";

const providers = Object.entries(LLM)

export const AdvancedOptions = () => {
    const { API_KEY, API_URL, setProvider, provider, setModel, model, changeAPI_KEY, changeAPI_URL } = useEditorStore()
    const [models, setModels] = useState<string[]>([]);


    useEffect(() => {
        setModels(
            (provider && provider !== "custom" && provider in LLM) ?
                Object.keys(LLM[provider].models)
                : []
        )
    }, [provider])
    return (
        <>
            <CardContent>
                <div className="flex w-full flex-col gap-3">
                    {/* @ts-ignore */}
                    <Select name="provider" onValueChange={setProvider} value={provider ?? ""}>
                        <div className="flex gap-3">
                            <Button variant={"secondary"} size={"icon"} className="px-3">
                                <Landmark />
                            </Button>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Provider" />
                            </SelectTrigger>
                        </div>
                        <SelectContent className="w-full">
                            {providers.map(([key, value]) => (
                                <SelectItem key={key} value={key} icon={
                                    "icon" in value ?
                                        <img src={`/icons/${value.icon}`} alt={key} className="h-full w-auto" />
                                        : undefined
                                }>
                                    {value.title}
                                </SelectItem>
                            ))}
                            <SelectSeparator />
                            <SelectItem value="custom" icon={
                                <img src={"/icons/ollama_light.svg"} alt={"Ollam Icon"} className="h-full w-auto" />
                            }>Custom</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* {models.length !== 0 && <Select name="model" onValueChange={setModel} value={model ?? "custom"}>
                        <div className="flex gap-3">
                            <Button variant={"secondary"} size={"icon"} className="px-3">
                                <BrainCircuit />
                            </Button>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Model" />
                            </SelectTrigger>
                        </div>
                        <SelectContent>
                            {models.map(p => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                            <SelectItem value="custom">custom</SelectItem>
                        </SelectContent>
                    </Select>} */}

                    <div className="flex gap-3">
                        <Button variant={"secondary"} size={"icon"} className="px-3">
                            <BrainCircuit />
                        </Button>
                        {(models.length === 0) ?
                            <Input value={model}
                                onChange={e => setModel(e.target.value)}
                                name="model"
                                placeholder="Select Model"
                            />
                            : <Combobox
                                mode='single'
                                options={models.map(e => ({ label: e, value: e }))}
                                placeholder='Search Model'
                                selected={model}
                                onChange={(value) => setModel(value as string)}
                                onCreate={(value) => {
                                    const newValue = strictString(value)
                                    newValue && setModels(e => [...e, newValue])
                                }}
                                className={"flex-1"}
                                inputProps={{
                                    name: "model"
                                }}
                            />
                        }
                    </div>
                </div>
                <div className="mt-3 grid w-full gap-3">
                    <Label>API Key</Label>
                    <div className="flex gap-3">
                        <Button variant={"secondary"} size={"icon"} className="px-3">
                            <Lock />
                        </Button>
                        <Input value={API_KEY ?? ""} type="password" onChange={e => changeAPI_KEY(e.target.value)} name="API_KEY" placeholder="sk-xxxxxxxxxxx" />
                    </div>

                    {provider === "custom" && <>
                        <Label>Custom API URL</Label>
                        <div className="flex gap-3">
                            <Button variant={"secondary"} size={"icon"} className="px-3">
                                <Link />
                            </Button>
                            <Input disabled={models.length !== 0} value={API_URL} onChange={e => changeAPI_URL(e.target.value)} name="API_URL" placeholder="http://localhost:11434" />
                        </div>
                    </>}
                </div>
            </CardContent>
            <CardFooter>
                <Suspense>
                    <ModelCodeEditor />
                </Suspense>
            </CardFooter>
        </>
    );
}