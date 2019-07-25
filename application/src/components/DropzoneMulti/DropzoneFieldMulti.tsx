import React, {FC, useEffect} from 'react';
import {DropzoneRootProps} from 'react-dropzone';


interface UserFile extends File {
  preview: string;
}

type TProps = {
  acceptedFiles: UserFile[];
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneRootProps) => DropzoneRootProps;
}

export const DropzoneFieldMulti:FC<TProps> = ({acceptedFiles, getRootProps, getInputProps}) => {

    const thumbs = acceptedFiles.map(file => (
        <div  key={file.name}>
            <div>
                <img src={file.preview} alt={''}/>
            </div>
        </div>
    ));
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
      acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [acceptedFiles]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>Only images will be accepted</em>
            </div>
            <aside>
                {thumbs}
            </aside>
        </section>
    );
}
