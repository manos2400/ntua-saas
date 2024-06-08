'use client';

import React, { useEffect, useState } from 'react'
import { useCredits } from './CreditsProvider';
import '../Styles/status.css'

const Status = () => {

  const {credits, fetchCredits} = useCredits();
  const [status, setStatus] = useState('All services online');

  useEffect(() => {
    fetchAll();
  }, []);

  const checkMicroservice = (microservice, name) => {
    if(microservice.status !== 200){
      if(status === 'All services online'){
        setStatus(`${name} Microservice down`);
      }
      else{
        setStatus(status +  `,${name} Microservice down`);
      }
    }
  }

  const fetchAll = async () =>{
    await fetchCredits();

    try {
      const sumbit_ms = await fetch('http://localhost:4001/status', {
        method: 'get'
      })
  
      const analytics_ms = await fetch('http://localhost:4003/status', {
        method: 'get'
      })
  
  
      const generate_ms = await fetch('http://localhost:4005/status', {
        method: 'get'
      })    
   
      const problems_ms = await fetch('http://localhost:4000/status', {
        method: 'get'
      })
  
      const result_ms = await fetch('http://localhost:4002/status', {
        method: 'get'
      })
  
      checkMicroservice(sumbit_ms, 'Submit');
      checkMicroservice(analytics_ms, 'Analytics');
      checkMicroservice(generate_ms, 'Generate Results');
      checkMicroservice(problems_ms, 'Problems');
      checkMicroservice(result_ms, 'Results');
      
    } catch (error) {
      setStatus('All Microservices down')
    }

  }

  const addCreds = () => {
    fetch('http://localhost:4004/addCredits', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        credits : 10
      })
    })
    .then(response => response.json())
    .then(response => {
      fetchCredits();
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='status_container'>
        <div>
          <h3>{`Available Credits: ${credits}`}</h3>
          <button onClick={addCreds}>+</button>
        </div>
        <p>{status}</p>
    </div>
  )
}

export default Status