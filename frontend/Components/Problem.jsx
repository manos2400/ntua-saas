'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/Styles/problemlist.css'
import '@/Styles/submitform.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Problem = ({problem, fetchProbs}) => {

  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [jsonFile, setJsonFile] = useState('');

  useEffect(() => {
    const blob = new Blob([problem.datasets[0].data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    setJsonFile(url);
  }, [])

  const onRun = () => {
    fetch('http://localhost:4005/solveproblem', {
      method : 'post',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        metadata_id : problem.id,
        solver_id : 1
      })
    })
        .then(response => {
          if(response.status === 500){
            toast.error('Something went wrong. Try again later.');
          }
          else{
            toast.info('Problem submitted for solving!')
            return response.json();
          }
        })
        .then(response => {
          setTimeout(() => {
            fetchProbs();
          }, 1500);
        })
  }

  const onDelete = () => {
    fetch('http://localhost:4000/problems/' + problem.id, {
      method: 'delete',
    })
        .then(response => {
          fetchProbs();
        })
  }

  const onResult = () => {
    if(problem.status === 1){
      router.push('http://localhost:3000/problems/' + problem.id);
    }
  }

  const onDropdownClick = () => {
    setOpenDropdown(!openDropdown);
  }

  return (
      <>
        <div className='problem_container'>
          <div>
            <span>Solver</span>
            <p>{problem.solver}</p>
          </div>
          <div>
            <span>Dataset Name</span>
            <p>{problem.datasets[0].name}</p>
          </div>
          <div>
            <span>Dataset Description</span>
            <p>{problem.datasets[0].description}</p>
          </div>
          <div>
            <span>Metadata</span>
            <p>{problem.metadata.map((item) => {
              if (item.name === 'num_vehicles') {
                return 'Number of vehicles: ' + item.value + ', ';
              } else if (item.name === 'depot') {
                return 'Depot: ' + item.value + ', ';
              } else if (item.name === 'max_distance') {
                return 'Max Distance: ' + item.value + ', ';
              }
            })}</p>
          </div>
          <div>
            <span>Status</span>
            <p>{problem.status === 0 ? 'Pending' : 'Solved'}</p>
          </div>
          {problem.status === 0 && <button onClick={onRun} className='btn'>Run</button>}
          {problem.status === 1 && <button onClick={onResult} className='btn'>Result</button>}
          <button onClick={onDropdownClick} className='btn'>Details</button>
          <button onClick={onDelete} className='btn'>Delete</button>
        </div>
        {openDropdown
            ? <div className='dropdown_container'>
              <a href={jsonFile} target='_blank'>
                <h4>
                  Dataset JSON File
                </h4>
              </a>
            </div>

            : <></>
        }
        <ToastContainer
            position='bottom-center'
        />
      </>
  )
}

export default Problem
