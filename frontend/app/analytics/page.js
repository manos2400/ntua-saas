'use client'

import React, { useEffect, useState } from 'react'
import '@/Styles/analytics.css'
import AnalyticsComponent from '@/Components/AnalyticsComponent'


const page = () => {

  const [generalAnalytics, setGeneralAnalytics] = useState({})
  const [warning, setWarning] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4003/analytics',
    {
      method: 'get'
    }
    )
    .then(response => {
      if(response.status === 200){
        return response.json();
      }
      else{
        throw new Error('Server Error');
      }    
    })
    .then(data => {
      setGeneralAnalytics(data);
    })
    .catch((err) => {
      setShowWarning(true);
      setWarning('Internal Server error. Try again later.')
    })

  }, [])


  return (
    <main className='analytics_container'>
      {showWarning
        ? <p>{warning}</p>
        : <AnalyticsComponent analyticObject={generalAnalytics} />
      }
    </main>
  )
}

export default page