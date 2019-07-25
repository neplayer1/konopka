import React, {FC, useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import {graphql} from "react-apollo";
import {addInteriorMutation} from "../../queries/mutations";
import {DropzoneFieldSingle} from "../../components/DropzoneSingle/DropzoneFieldSingle";
import {DropzoneFieldMulti} from "../../components/DropzoneMulti/DropzoneFieldMulti";

interface UserFile extends File {
    preview: string;
}

const AdminPage: FC<any> = (props) => {
    const {mutate} = props;
    const [mainFile, setMainFile] = useState<UserFile[]>([]);
    const [multiFiles, setMultiFiles] = useState<UserFile[]>([]);

    const {acceptedFiles: mainImageFile, getRootProps: mainImageRootProps, getInputProps: mainImageInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: mainImageFile => {
            setMainFile(mainImageFile.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const {acceptedFiles: multiImgFiles, getRootProps: multiImgRootProps, getInputProps: multiImgInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: multiImgFiles => {
            setMultiFiles(multiImgFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeName = useCallback((event) => {
        setName(event.target.value);
    }, []);
    const handleChangeType = useCallback((event) => {
        setType(event.target.value);
    }, []);
    const handleChangeYear = useCallback((event) => {
        setYear(event.target.value);
    }, []);
    const handleChangeDescription = useCallback((event) => {
        setDescription(event.target.value);
    }, []);

    const add = useCallback(() => {
        const preview = mainImageFile;
        const images = multiImgFiles;
        console.log(preview, images);
        mutate({
            variables: {name, type, year: +year, description, preview, images},
            // refetchQueries: [ { query: interiorsQuery }]
        });
    }, [name, type, year, description, mainImageFile, multiImgFiles, mutate]);

    return (
        <div className="admin-page">
            <input type="text" placeholder='name' value={name} onChange={handleChangeName}/>
            <input type="text" placeholder='type' value={type} onChange={handleChangeType}/>
            <input type="text" placeholder='year' value={year} onChange={handleChangeYear}/>
            <textarea placeholder='description' value={description} onChange={handleChangeDescription}/>
            <DropzoneFieldSingle acceptedFiles={mainFile} getRootProps={mainImageRootProps} getInputProps={mainImageInputProps}/>
            <DropzoneFieldMulti acceptedFiles={multiFiles} getRootProps={multiImgRootProps} getInputProps={multiImgInputProps}/>

            <button onClick={add}>add interior</button>
        </div>
    );
}

export default graphql(addInteriorMutation)(AdminPage)
