import React, { useEffect, useRef, useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useApi } from "../hooks/useApi";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

interface FileUploadProps {
    onUploadSuccess: (file: {
        id: string,
        filename: string
    }) => void;
    onRevert: () => void;
    module?: string;
    mode?: string;
    document?: string;
    fileName: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onRevert, module, mode, document, fileName }) => {
    const { callApi } = useApi();
    
    const [files, setFiles] = useState<any[]>([]);
    const pondRef = useRef<any>(null);

    useEffect(() => {
        if(fileName) {
            setFiles([
                {
                    source: fileName,
                    options: {
                        type: "local",
                        metadata: {
                            poster: `${import.meta.env.VITE_API_URL}/uploads/${module}/${fileName}`
                        }
                    }
                }
            ])
        } else {
            setFiles([]);
        }
    }, [fileName, module]);

    return (
        <FilePond
            ref={pondRef}
            files={files}
            onupdatefiles={(fileItems: any) => {
                setFiles(fileItems.map((fileItem: any) => fileItem.file));
            }}
            allowMultiple={false}
            maxFiles={1}
            allowRevert={true}
            allowImagePreview={true}
            allowRemove={true}
            name="attachment"
            labelIdle='Drag & Drop file or <span class="filepond--label-action">Browse</span>'
            acceptedFileTypes={["image/*"]}
            labelFileTypeNotAllowed="File type not supported."
            data-max-file-size="5MB"
            imagePreviewHeight={170}
            server={{
                load: async (source: any, load: any, error: any) => {
                    const url = `${import.meta.env.VITE_API_URL}/uploads/${module}/${source}`;
                    try {
                        const res = await fetch(url);
                        const blob = await res.blob();
                        load(blob);
                    } catch (err: any) {
                        error("Failed to load existing file.")
                    }
                },
                process: (fieldName: string, file: any, _metadata: any, load: any, error: any, progress: any, _abort: any) => {
                    const formData = new FormData();
                    formData.append("module", module || "");
                    formData.append("mode", mode || "");
                    formData.append("document", document || "")
                    formData.append(fieldName, file, file.name);
                    
                    const controller = new AbortController()
                    callApi("post", "/upload/file/", formData, {
                        onUploadProgress: (e: any) => {
                            if (e.total) progress(true, e.loaded, e.total);
                        },
                        signal: controller.signal
                    }).then((res) => {
                        const uploaded = {
                            id: String(res.id),
                            filename: res.filename
                        };
                        onUploadSuccess(uploaded);
                        load(uploaded.id);
                    }).catch((_err) => {
                        error("Upload failed.");
                    });

                    return { abort: () => controller.abort() };
                },
                revert: async (uniqueFileId: any, load: any, error: any) => {
                    try {
                        const targetID = uniqueFileId === fileName ? document : uniqueFileId;
                        await callApi("delete", `/upload/revert`, {
                            data: {
                                id: targetID,
                                document: document,
                                module: module
                            }
                        }).then(() => {
                            onRevert();
                            load();
                        });
                    } catch (err: any) {
                        error("Failed to remove.");
                    }
                }
            }}
        />
    );
}
