import React, {FC, useCallback, useEffect, useMemo} from 'react';
import InputFiles from "react-input-files";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadMultiFilesContext} from "context/ctxUploadMultiFiles";
import {UploadSingleFileContext} from "context/ctxUploadSingleFile";
import {FileControlPreview} from "components/FileControl/FileControlPreview";
import {useFileControlModel} from "components/FileControl/useFileControlModel";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  label: string;
  multiple?: boolean;
  previewUrl?: string;
  errorValidationClass?: string;
}

export const FileControl: FC<TProps> = (props) => {
  const {previewUrl, label, multiple, errorValidationClass} = props;
  const {handleDragStart, handleDrop, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd, handleDeleteFile} = useFileControlModel();
  const {multiFiles, setMultiFiles, setRemovedImagesUrls} = useContextStrict(UploadMultiFilesContext);
  const {singleFile, setSingleFile} = useContextStrict(UploadSingleFileContext);

  useEffect(() => {
    return () => {
      setMultiFiles([]);
      setRemovedImagesUrls([]);
      setSingleFile('');
    }
  }, [setRemovedImagesUrls, setMultiFiles, setSingleFile]);

  const handleSetFiles = useCallback((files: FileList) => {
    if (!multiple) {
      const fileWithPreview = Object.assign(files[0], {
        preview: URL.createObjectURL(files[0])
      });
      setSingleFile(fileWithPreview);
    } else {
      const filesWithPreview = Array.from(files).map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));

      const uniqueFiles = filesWithPreview.reduce((acc: UserFile[], el: UserFile) => {
        if (!(multiFiles as UserFile[]).find(({lastModified}) => el.lastModified === lastModified)) {
          acc.push(el);
        }
        return acc;
      }, []);

      if (uniqueFiles.length !== 0) {
        setMultiFiles([...multiFiles, ...uniqueFiles]);
      }
    }
  }, [multiple, setSingleFile, setMultiFiles, multiFiles]);

  //render
  const multiFilesPreviews = useMemo(() => {
    return multiFiles.map(file => {
      const isUrl = typeof file === "string";
      if (isUrl) {
        const url = file as string;
        return (
          <FileControlPreview src={`http://localhost:3005/api/${url}`}
                              key={url} dataUrl={url} draggable={true}
                              onDelete={handleDeleteFile}
                              onDragEnd={handleDragEnd}
                              onDragEnter={handleDragEnter}
                              onDragLeave={handleDragLeave}
                              onDragOver={handleDragOver}
                              onDragStart={handleDragStart}
                              onDrop={handleDrop}
          />
        );
      } else {
        file = file as UserFile;
        const fileIndex = multiFiles.indexOf(file);
        return (
          <FileControlPreview src={file.preview}
                              key={file.name} dataIndex={fileIndex} draggable={true}
                              onDelete={handleDeleteFile}
                              onDragEnd={handleDragEnd}
                              onDragEnter={handleDragEnter}
                              onDragLeave={handleDragLeave}
                              onDragOver={handleDragOver}
                              onDragStart={handleDragStart}
                              onDrop={handleDrop}
          />
        )
      }
    });
  }, [multiFiles, handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleDragEnd, handleDeleteFile]);

  const singleFilePreview = useMemo(() => {
    const file = singleFile as UserFile;
    if (previewUrl && typeof singleFile === "string") {
      return (
        <FileControlPreview src={`http://localhost:3005/api/${previewUrl}`} key={previewUrl}/>
      )
    } else {
      if (!file) {
        return null;
      }
      return (
        <FileControlPreview src={file.preview} key={file.name}/>
      )
    }
  }, [previewUrl, singleFile]);

  return (
    <div className="form-control form-control__dropzone">
      <InputFiles onChange={handleSetFiles} multiple={multiple}>
        <div className={`form-control form-control__button ${errorValidationClass}`}>{label}</div>
      </InputFiles>
      <div className="dropzone__preview">
        {!multiple && singleFilePreview}
        {multiple && multiFilesPreviews}
      </div>
    </div>
  );
}
