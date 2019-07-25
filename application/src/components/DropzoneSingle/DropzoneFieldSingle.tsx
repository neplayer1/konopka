import React, {FC} from 'react';
import {DropzoneRootProps} from "react-dropzone";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  acceptedFiles: UserFile[];
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneRootProps) => DropzoneRootProps;
}

export const DropzoneFieldSingle:FC<TProps> = ({acceptedFiles, getRootProps, getInputProps}) => {

    const files = acceptedFiles.map((file: File) => {
        console.log(file.name)
        return (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        )
    });

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}
