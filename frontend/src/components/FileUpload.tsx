import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

interface FileUploadProps {
    onUploadSuccess: (fileId: string) => void;
    onRevert: () => void;
    module?: string;
    mode?: string;
    document?: string;
    fileName: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onRevert, module, mode, document, fileName }) => {
    const [file, setFile] = useState<any[]>([]);
    const pondRef = useRef<any>(null);

    useEffect(() => {
        if(fileName) {
            setFile([
                {
                    source: `http://localhost:3000/uploads/${module}/${fileName}`,
                    options: {
                        type: "local"
                    }
                }
            ])
        } else {
            setFile([]);

            if(pondRef.current) {
                pondRef.current.removeFiles();
            }
        }
    }, [fileName]);

    return (
        <FilePond
            ref={pondRef}
            files={file}
            onupdatefiles={setFile}
            allowMultiple={false}
            maxFiles={1}
            allowRevert={true}
            name="attachment"
            labelIdle='Drag & Drop file or <span class="filepond--label-action">Browse</span>'
            acceptFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
            labelFileTypeNotAllowed="File type not supported."
            server={{
                process: (fieldName: string, file: any, metadata: any, load: any, error: any, progress: any, abort: any) => {
                    const formData = new FormData();
                    formData.append("module", module || "");
                    formData.append("mode", mode || "");
                    formData.append("document", document || "")
                    formData.append(fieldName, file, file.name);
                    
                    const source = axios.CancelToken.source();
                    axios.post("http://localhost:3000/api/upload/file/", formData, {
                        onUploadProgress: (e) => {
                            if (e.total) progress(true, e.loaded, e.total);
                        },
                        cancelToken: source.token,
                    }).then((res) => {
                        onUploadSuccess(res.data.id);
                        load(res.data.id);
                    }).catch((err) => {
                        error("Upload failed.");
                    });

                    return { abort: () => { source.cancel(), abort(); } };
                },
                revert: async (uniqueFileId: any, load: any, error: any) => {
                    await axios.delete(`http://localhost:3000/api/upload/revert`, { data: { id: uniqueFileId, document: document, module: module } }).then(() => {
                        onRevert();
                        load();
                    }).catch(() => error("Failed to remove."));
                }
            }}
        />
    );
}