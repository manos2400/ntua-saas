import React from 'react'
import '@/Styles/analytics.css'
import analyticsLogo from '@/public/analytics.svg'
import Image from 'next/image'

const ProblemAnalytics = ({problem}) => {
  return (
    <section className='problem_analytics_container'>
      <div className='problem_analytics_header'>
        <Image src={analyticsLogo} alt='analytics logo' width={60} height={60}/>
        <h2>Analytics</h2>
      </div>
      <div className='problem_analytics_data'>
        <h3>Solver: vrpSolver</h3>
        <p>Execution Time: {problem?.execTime}</p>
        <p>Memory: {problem?.memory}</p>
        <p>Memory Peak: {problem?.memoryPeak}</p>
        <p>Timestamp: {problem?.solvedAt}</p>
        <p>Submition Time: {problem?.submittedAt}</p>
        <p>System Time: {problem?.sysTime}</p>
        <p>Time after submission: {problem?.timeAfterSubmission}</p>
        <p>User Time: {problem?.userTime}</p>
      </div>
    </section>
  )
}

export default ProblemAnalytics