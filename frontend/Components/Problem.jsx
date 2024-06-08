'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/Styles/problemlist.css'
import '@/Styles/submitform.css'
import DropDown from '@/public/Dropdown.svg'
import Image from 'next/image'

const Problem = ({problem, fetchProbs}) => {

  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState('');

  const [openDropdown, setOpenDropdown] = useState(false);
  const [jsonFile, setJsonFile] = useState('');

  useEffect(() => {
    const blob = new Blob([problem.datasets[0].data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    setJsonFile(url);
  }, [])

  const onRun = () => {
    if(problem.status === 0){ 
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
          setShowWarning(true);
          setWarning('Something went wrong. Try again later.')
        }
        else{
          return response.json();
        }
      })
      .then(response => {
        setTimeout(() => {
          fetchProbs(); 
        }, 1500);
      })
    }
    else{
      setWarning('Problem already Solved!')
      setShowWarning(true);
    }

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
    if(problem.status === 0){
      setWarning('Problem not solved. Click run to solve the problem!');
      setShowWarning(true);
    }
    else{
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
          <span>Metadata</span>
          <p>{problem.metadata.map((item)=> {return(item.name + " = " + item.value + ', ')})}</p>
        </div>
        <div>
          <span>Status</span>
          <p>{problem.status === 0 ? 'Pending' : 'Solved'}</p>
        </div>
        <button onClick={onRun} className='btn'>run</button>
        <button onClick={onResult} className='btn'>results</button>
        <button onClick={onDelete} className='btn'>delete</button>
        {showWarning
          ? <span>{warning}</span>
          : <></>
        }
        <Image onClick={onDropdownClick} className='dropdown' alt='dropdown' height={20} width={20} src={DropDown}/>
      </div>
      {openDropdown
       
        ? <div className='dropdown_container'>
            <a href={jsonFile} target='_blank'>
              <h4>
                JSON file
              </h4>
            </a>
          </div>

        : <></>
      }
    </>
  )
}

export default Problem
