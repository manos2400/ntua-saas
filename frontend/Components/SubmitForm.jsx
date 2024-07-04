'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import '@/Styles/submitform.css'
import { useCredits } from './CreditsProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitForm = () => {
    
    const [filename, setFileName] = useState('');
    const [metadata, setMetadata] = useState([]);
    const [solver, setSolver] = useState(1);
    const [dataset_name, setDatasetName] = useState('');
    const [dataset_description, setDatasetDescription] = useState('');


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
            if(acceptedFiles[0] === null || acceptedFiles[0] === undefined){
                toast.error('No file uploaded.');
            }
            else if(!dataset_name || !dataset_description || !metadata[0] || !metadata[1] || !metadata[2] || isNaN(metadata[0]) || isNaN(metadata[1]) || isNaN(metadata[2])){
                toast.error('Please fill all the fields with valid data.');
            }
            else{
                let form = new FormData();
                form.append('file', acceptedFiles[0]);
                form.append('solver_id', solver.toString());
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
                    .then(response => response.json())
                    .then(data => {
                        // Print any errors from the submit microservice
                        if(data.error){
                            toast.error(data.error);
                        }
                        else{
                            toast.success('Problem submitted successfully');
                            fetchCredits();
                            ClearInputs();
                        }
                    })
    

                    
                } catch (error) {
                    toast.error('Internal Server error. Try again later.');
                    ClearInputs();
                }
            }

        }
        else{
            toast.error('Not enough credits to submit.');
            ClearInputs();
        }
    }

    const onCancel = async () =>{
        ClearInputs();
        // setShowMessage(false);
        // setMessage('');
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
        <h3>Submit your dataset and metadata (Costs 10 credits)</h3>
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
        <div {...getRootProps()} className='drag-drop_container'>
            <input {...getInputProps()}/>
            {
                isDragActive 
                ?   <p>Drop your file here ...</p>
                :   <p>Drag and drop the dataset file here or click to browse.</p>
            }
      
            <p className='filename'>{filename}</p>
        </div>
        <div className='submit_buttons'>
            <button className='btn' onClick={onSubmit}>Upload</button>
            <button className='btn' onClick={onCancel}>Cancel</button>
        </div>
        <ToastContainer
            position='bottom-center'
        />
    </section>
  )
}

export default SubmitForm