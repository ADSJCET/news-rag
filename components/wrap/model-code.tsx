"use client"

import { CodeOpenAI } from "@/lib/model/data";
import { editorOptions } from "../custom/editor";
import { useEditorStore } from "@/state/editor";
import { Editor } from "@monaco-editor/react";
import { RefreshCw } from "lucide-react";

const takeFirstFiveLetters = (str:string) => str.slice(0, 5) + (".".repeat(15))

export const ModelCodeEditor = () => {
    const { API_KEY, API_URL, provider, model } = useEditorStore()
    return (
        <div className="w-full overflow-hidden rounded-md">
            <Editor
                loading={<RefreshCw className="animate-spin stroke-custom" />}
                height={"190px"}
                value={CodeOpenAI({ baseURL: API_URL, apiKey: takeFirstFiveLetters(API_KEY), provider: provider, model: model })}
                defaultLanguage={"javascript"}
                path={"param"}
                {...editorOptions}
                options={{
                    ...editorOptions.options,
                    readOnly: true,
                    lineNumbers: "off",
                }}
            />
        </div>
    );
}