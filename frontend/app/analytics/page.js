'use client'

import React, { useEffect, useState } from 'react'
import '@/Styles/analytics.css'
import AnalyticsComponent from '@/Components/AnalyticsComponent'
import { Audio } from 'react-loader-spinner';



const page = () => {

  const [generalAnalytics, setGeneralAnalytics] = useState({})
  const [warning, setWarning] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setShowWarning(true);
      setWarning('Internal Server error. Try again later.')
    })

  }, [])


  return (
    <main className='analytics_container'>
      {loading
        ? <Audio height="80" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass/>
        : showWarning
          ? <p>{warning}</p>
          : <AnalyticsComponent analyticObject={generalAnalytics} />
      }
     
    </main>
  )
}

export default page