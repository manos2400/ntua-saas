'use client'

import Problem from '@/Components/Problem';
import React, { useEffect, useState } from 'react'
import '@/Styles/problemlist.css'



// const problems = [
//   {
//       id: 1,
//       name: 'problem1',
//       timestamp: '2023',
//       status: 'executed',
//   },
//   {
//       id: 2,
//       name: 'problem2',
//       timestamp: '2023',
//       status: 'executed',
//   },
//   {
//       id: 3,
//       name: 'problem3',
//       timestamp: '2023',
//       status: 'executed',
//   },
//   {
//       id: 4,
//       name: 'problem4',
//       timestamp: '2023',
//       status: 'executed',
//   },
  
// ];

const page = () => {

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/solver_api/problemlist/getProblems', {
      method: 'get',
    })
    .then(response => {
      if(response.status !== 200){
        throw new Error('Server encountered unexpected error')
      }
      else{
        return response.json()
      }
    })
    .then(data => {
      setProblems(data.problems);
      console.log(data.problems);
      setLoading(false);
    })
    .catch(err => alert('Error: ' , err))
  }, [])
  

  return (
    !loading
    ?   <main className='problemlist_container'>
          <h1>Problems List</h1>
          <ul className='problemlist'>
          {
              problems.map((problem) => {
                  return(
                      <li key={problem.id}>
                        <Problem problem={problem}/>
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
      
    : <p>Loading...</p>
  )
}

export default page