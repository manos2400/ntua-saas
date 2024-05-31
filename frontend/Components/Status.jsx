'use client';

import React, { useEffect, useState } from 'react'
import '../Styles/status.css'

const Status = () => {

  const [globalCreds, setGlobalCreds] = useState(0);


  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = () => {
    fetch('http://localhost:4004/getCredits', {
      method: 'get',
    })
    .then(response => response.json())
    .then(data => setGlobalCreds(data.globalCreds))
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
      console.log(response);
      fetchCredits();
    })
  }

  return (
    <div className='status_container'>
        <div>
          <h3>{`Available Credits: ${globalCreds}`}</h3>
          <button onClick={addCreds}>+</button>
        </div>
        <p>Services status: All online!</p>
    </div>
  )
}

export default Status