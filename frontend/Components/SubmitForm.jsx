'use client'

import React, { useCallback, useEffect, useState } from 'react'
import InputBox from './InputBox'
import { useDropzone } from 'react-dropzone';
import '@/Styles/submitform.css'

const SubmitForm = () => {
    
    const [filename, setFileName] = useState('');
    const [acceptedFile, setAcceptedFile] = useState(null);
    const [metadata, setMetadata] = useState([]);
    const [solver, setSolver] = useState('py');

    useEffect(() => {
        setMetadata(new Array(3).fill(''));
    }, [solver])


    
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
        setAcceptedFile(null);
        setMetadata(new Array(3).fill(''));
    }

    const pyMetadata = [
        'Number of vehicles',
        'Starting Index',
        'Max distance',
    ]

    const onInputChange = (event,index) => {
        let arr = [...metadata];
        arr[index] = event.target.value;
        setMetadata(arr);
    }

  return (
    <section>
        <select className='solver_select'>
              <option>Python</option>
        </select>
        <h3>Input metadata parameters</h3>
        <ul className='inputs_list'>
            {
                pyMetadata.map((value, index) => {
                    return(
                        <li key={value}>
                            <label>{value}</label>
                            <input id={index} value={metadata[index]} onChange={(event) => onInputChange(event,index)}/>
                        </li>
                    )
                })
            }
        </ul>
        <h3>Drop your json file here!</h3>
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
    </section>
  )
}

export default SubmitForm