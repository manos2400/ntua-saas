'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import '@/Styles/submitform.css'
import { useCredits } from './CreditsProvider';

const SubmitForm = () => {
    
    const [filename, setFileName] = useState('');
    // const [acceptedFile, setAcceptedFile] = useState(null);
    const [metadata, setMetadata] = useState([]);
    const [solver, setSolver] = useState(1);
    const [dataset_name, setDatasetName] = useState('');
    const [dataset_description, setDatasetDescription] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messsge, setMessage] = useState('');

    const {credits, fetchCredits} = useCredits();

    useEffect(() => {
        setMetadata(new Array(3).fill(''));
    }, [solver])

    const ClearInputs = () => {
        setFileName('');
        setMetadata(new Array(3).fill(''));
        setDatasetDescription('');
        setDatasetName('');
    }
    
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
        if(credits >= 10){
            setShowMessage(false);
            if(acceptedFiles[0] === null || acceptedFiles[0] === undefined){
                setShowMessage(true);
                setMessage('No file uploaded');
            }
            else if(!dataset_name || !dataset_description || !metadata[0] || !metadata[1] || !metadata[2] || isNaN(metadata[0]) || isNaN(metadata[1]) || isNaN(metadata[2])){
                setShowMessage(true);
                setMessage('Wrong Input. Make sure to fill everything and the number of vehicles, depot and max distance are numbers');
            }
            else{
                let form = new FormData();
                form.append('file', acceptedFiles[0]);
                form.append('solver_id', solver);
                form.append('name', dataset_name);
                form.append('description', dataset_description);
                form.append('num_vehicles', metadata[0]);
                form.append('depot', metadata[1]);
                form.append('max_distance', metadata[2]);

                try {
                    fetch('http://localhost:4001/submit_metadata',{
                        method: 'post',
                        body: form
                    })
                    .then(response => fetchCredits())
    
                    ClearInputs();
                    setShowMessage(true);
                    setMessage('Successful submission!')
                    
                } catch (error) {
                    setShowMessage(true);
                    setMessage('Internal Server error. Try again later.');
                    ClearInputs();
                }
            }

        }
        else{
            setShowMessage(true);
            setMessage('Not enough credits')
            ClearInputs();
        }
    }

    const onCancel = async () =>{
        ClearInputs();
        setShowMessage(false);
        setMessage('');
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

    const onDatasetDescriptionChange = (event) => {
        setDatasetDescription(event.target.value);
    }

    const onDatasetNameChange = (event) => {
        setDatasetName(event.target.value);
    }

  return (
    <section>
        <select className='solver_select'>
              <option>Vehicle Routing Problem Solver</option>
        </select>
        <h3>Input metadata parameters</h3>
        <div className='metadata'>
            <div>
                <label>Dataset name</label>
                <input value={dataset_name} onChange={onDatasetNameChange}/>
            </div>
            <div>
                <label>Dataset description</label>
                <input value={dataset_description} onChange={onDatasetDescriptionChange}/>
            </div>
        </div>
        <ul className='inputs_list'>
            {
                pyMetadata.map((value, index) => {
                    return(
                        <li key={value}>
                            <label>{value}</label>
                            <input id={index} value={metadata.length === 0 ? '' : metadata[index]} onChange={(event) => onInputChange(event,index)}/>
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
        {showMessage
        ? <span>{messsge}</span>
        : <></>
        }
    </section>
  )
}

export default SubmitForm