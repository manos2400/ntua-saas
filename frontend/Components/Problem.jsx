'use client'

import React from 'react'
import '@/Styles/problemlist.css'
import '@/Styles/submitform.css'


const Problem = ({problem}) => {

  const onEdit = () => {
    
  }

  const onRun = () => {
    fetch('http://localhost:3001/solver_api/solveProblem', {
      method : 'post',
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        metadata_id : problem.id,
        solver_id : 1
      })
    })
    .then(response => {
      if(response.status === 500){
        alert(response.json());
      }
      else{
        return response.json();
      }
    })
    .then(response => console.log(response))
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
      <button onClick={onEdit} className='btn'>edit</button>
      <button onClick={onRun} className='btn'>run</button>
      <button onClick={onResult} className='btn'>results</button>
      <button onClick={onDelete} className='btn'>delete</button>
    </div>
  )
}

export default Problem
