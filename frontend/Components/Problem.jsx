'use client'

import React from 'react'
import Button from './Button';
import '@/Styles/problemlist.css'
import '@/Styles/submitform.css'


const Problem = ({problem}) => {

  const onEdit = () => {
    
  }

  const onRun = () => {
    if(problem.status === 'executed'){
      alert('Already executed');
    }
    else{
      //API CALL
    }
  }

  const onDelete = () => {
    //API CALL
  }

  const onResult = () => {
    if(problem.status === 'ready'){
      alert('You need to run the problem to get results');
    }
    else{
      //API CALL
    }
  }

  return (
    <div className='problem_container'>
      <p>{problem.name}</p>
      <p>{problem.timestamp}</p>
      <p>{problem.status}</p>
      <button onClick={onEdit} className='btn'>edit</button>
      <button onClick={onRun} className='btn'>run</button>
      <button onClick={onResult} className='btn'>results</button>
      <button onClick={onDelete} className='btn'>delete</button>
    </div>
  )
}

export default Problem
