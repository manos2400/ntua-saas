'use client';

import React, { useEffect, useState } from 'react'
import '../Styles/status.css'

const Status = () => {

  const [globalCreds, setGlobalCreds] = useState(0);


  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = () => {
    fetch('http://localhost:3001/solver_api/credits/getCredits', {
      method: 'get',
    })
    .then(response => response.json())
    .then(data => setGlobalCreds(data.globalCreds))
  }

  return (
    <div className='status_container'>
        <h3>{`Available Credits: ${globalCreds}`}</h3>
        <p>Services status: All online!</p>
    </div>
  )
}

export default Status