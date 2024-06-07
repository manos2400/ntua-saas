'use client'

import Problem from '@/Components/Problem';
import React, { useEffect, useState } from 'react'
import '@/Styles/problemlist.css'



const page = () => {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    fetchProbs();
  }, [])


  const fetchProbs = () => {
    fetch('http://localhost:4000/problems', {
      method: 'get',
    })
    .then(response => {
      if(response.status === 400){
        setLoading(2); 
        return response.json();
      }
      else if(response.status === 200){
        return response.json();
      }
    })
    .then(data => {
      if(data === undefined){
        setProblems([]);
        setLoading(2);
      }
      else{
        setProblems(data);
        setLoading(0);
      }
    })
  }
  

  return (
    loading === 0
    ?   <main className='problemlist_container'>
          <h1>Problems List</h1>
          <ul className='problemlist'>
          {
              problems.map((problem) => {
                  return(
                      <li key={problem.id}>
                        <Problem problem={problem} fetchProbs={fetchProbs}/>
                      </li>
                  )
              })
          }
          </ul>
          {
            problems.length === 0
            ? <h2>No Problems submitted</h2>
            : <></>
          }
        </main>
      
    : (loading === 1
    
      ? <p>Loading...</p>
      : <p>No Problems submitted yet!</p>
  )
  )
}

export default page