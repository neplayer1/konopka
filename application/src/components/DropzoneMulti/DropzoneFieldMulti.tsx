import React, {FC, useEffect, useMemo} from 'react';
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
    const thumbs = useMemo(() => {
      return acceptedFiles.map(file => (
        <div className="dropzone_preview__item" key={file.name}>
          <img src={file.preview} alt={''}/>
        </div>
      ));
    }, [acceptedFiles]);

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
      acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [acceptedFiles]);

    return (
        <section className="form-control form-control__dropzone">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div>Add images</div>
            </div>
            <div className="dropzone__preview">
                {thumbs}
            </div>
        </section>
    );
}
