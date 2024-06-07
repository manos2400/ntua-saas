'use client'

import React, { useEffect, useState } from 'react'
import '@/Styles/analytics.css'
import AnalyticsComponent from '@/Components/AnalyticsComponent'


const page = () => {

  const [generalAnalytics, setGeneralAnalytics] = useState({})


  useEffect(() => {
    fetch('http://localhost:4003/analytics',
    {
      method: 'get'
    }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setGeneralAnalytics(data);
    })
  }, [])


  return (
    <main className='analytics_container'>
      <AnalyticsComponent analyticObject={generalAnalytics}/>
    </main>
  )
}

export default page