import React from 'react'
import '@/Styles/analytics.css'

const ProblemAnalytics = ({problem}) => {
  return (
    <section className='total_stats_container'>
        <h3>Solver: vrpSolver</h3>
        <p>Execution Time: {problem?.execTime}</p>
        <p>Memory: {problem?.memory}</p>
        <p>Memory Peak: {problem?.memoryPeak}</p>
        <p>Timestamp: {problem?.solvedAt}</p>
        <p>Submition Time: {problem?.submittedAt}</p>
        <p>System Time: {problem?.sysTime}</p>
        <p>Time after submission: {problem?.timeAfterSubmission}</p>
        <p>User Time: {problem?.userTime}</p>
    </section>
  )
}

export default ProblemAnalytics