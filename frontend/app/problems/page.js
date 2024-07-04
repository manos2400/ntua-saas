'use client'

import Problem from '@/Components/Problem';
import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';
import '@/Styles/problemlist.css'

const Page = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(1);
  const [errorState, setErrorState] = useState('No problem submitted yet!');

  useEffect(() => {
    fetchProbs();
  }, [])

  const fetchProbs = () => {
    fetch('http://localhost:4000/problems', {
      method: 'get',
    })
        .then(response => {
          if (response.status === 400) {
            setLoading(2);
            return response.json();
          } else if (response.status === 200) {
            return response.json();
          }
        })
        .then(data => {
          if (data === undefined) {
            setProblems([]);
            setLoading(2);
          } else {
            setProblems(data);
            setLoading(0);
          }
        })
        .catch((err) => {
          setLoading(2);
          setErrorState('Internal server error. Try again later!')
        })
  }

  return (
      loading === 0 ? (
          <main className='problemlist_container'>
            <h1>Problems List</h1>
            {
              problems.length > 0 ? (
                  <ul className='problemlist'>
                    {problems.map((problem) => (
                        <li key={problem.id}>
                          <Problem problem={problem} fetchProbs={fetchProbs}/>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <h2>No problems submitted yet</h2>
              )
            }
          </main>
      ) : (
          loading === 1 ? (
              <Audio height="80" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass/>
          ) : (
              <p>{errorState}</p>
          )
      )
  )
}

export default Page
