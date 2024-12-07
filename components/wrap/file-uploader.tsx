"use client"

import {
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
} from "@/components/ui/file";
import { useExtraData } from "@/state/scratch";
import type { DropzoneOptions } from "react-dropzone";

const dropzone = {
    accept: {
        'application/json': ['.json'],
        'text/yaml': ['.yaml', '.yml'],
        'text/csv': ['.csv']
    },
    multiple: false,
    maxFiles: 1
} satisfies DropzoneOptions;

export const FileWrapper: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const { files, setFiles } = useExtraData()

    return (
        <FileUploader
            value={files}
            onValueChange={e => e ? setFiles(e) : setFiles([])}
            dropzoneOptions={dropzone}
        >
            {!!files.length && <FileUploaderContent className="px-3 pt-4">
                {files.map((e, i) => (
                    <FileUploaderItem className="rounded-sm bg-gradient-custom" key={123456} index={i}>
                        <span>{e.name}</span>
                        {/* <span>{e.size}</span> */}
                        <span className="opacity-60">{`(${e.type})`}</span>
                    </FileUploaderItem>
                ))}
            </FileUploaderContent>}
            {children}
        </FileUploader>
    );
}