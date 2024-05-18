'use client'

import React, { useCallback, useEffect, useState } from 'react'
import InputBox from './InputBox'
import { useDropzone } from 'react-dropzone';
import '@/Styles/submitform.css'

const SubmitForm = () => {
    
    const [filename, setFileName] = useState('');
    const [acceptedFile, setAcceptedFile] = useState(null);
    
    const onDrop = useCallback(acceptedFiles => {
        const file = new FileReader;
        file.onload = function() {
            console.log(file.result);
        }

        if(acceptedFiles[0] !== null){
            setFileName(acceptedFiles[0].name);
        }

        file.readAsDataURL(acceptedFiles[0]);
    }, []);
    
    const {acceptedFiles ,getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/json': ['.json']
        },
        maxFiles: 1
    });


    const onSubmit = async () => {
        console.log(acceptedFiles[0]);
    }

    const onCancel = async () =>{
        setFileName('');
        console.log('nigger');
        setAcceptedFile(null);
    }

    



  return (
    <>
        <select className='solver_select'>
              <option>Python</option>
        </select>
        <ul className='inputs_list'>
            <li>
                <label>SOME</label>

                <input />
            </li>
            <li>
                <label>SOME</label>
                <input />
            </li> 
            <li>
                <label>SOME</label>
                <input />
            </li> 
        </ul>
        <div {...getRootProps()} className='drag-drop_container'>
            <input {...getInputProps()}/>
            {
                isDragActive 
                ?   <p>Drop the files here ...</p>
                :   <p>Drag and drop files here or click to browse</p>
            }
      
            <p className='filename'>{filename}</p>
        </div>
        <div className='submit_buttons'>
            <button className='btn' onClick={onSubmit}>Upload</button>
            <button className='btn' onClick={onCancel}>Cancel</button>
        </div>
    </>
  )
}

export default SubmitForm