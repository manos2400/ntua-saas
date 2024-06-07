'use client';

import React, { useEffect } from 'react'
import { useCredits } from './CreditsProvider';
import '../Styles/status.css'

const Status = () => {

  const {credits, fetchCredits} = useCredits();

  useEffect(() => {
    fetchCredits();
  }, []);


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
  }

  return (
    <div className='status_container'>
        <div>
          <h3>{`Available Credits: ${credits}`}</h3>
          <button onClick={addCreds}>+</button>
        </div>
        <p>Services status: All online!</p>
    </div>
  )
}

export default Status