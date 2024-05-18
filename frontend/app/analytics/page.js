import React from 'react'
import '@/Styles/analytics.css'

const solvers = [{
  problemsSubmitted: 2,
  problemsSolved: 2,
  AverageTimeAfterSubmission: 1,
  AverageTimeAfterSubmissionHR: 1,
  MinimumTimeAfterSubmission: 1,
  MinimumTimeAfterSubmissionHR: 1,
  MaximumTimeAfterSubmission: 1,
  MaximumTimeAfterSubmissionHR: 1,
}]

const page = () => {
  return (
    <main className='analytics_container'>
      <section className='total_stats_container'>
        <p>Number of problems: </p>
        <p>Number of finished problems: </p>
        <p>Average Time after submission: </p>
        <p>Average Time after submission HR: </p>
        <p>Minimum time after submission: </p>
        <p>Minimum time after submission HR: </p>
        <p>Maximum time after submission: </p>
        <p>Maximum time after submission HR: </p>
      </section>
      <section className='solver_stats_container'>
        <h2>Solver stats: </h2>
        <ul>
          {
            solvers.map((item) => {
              return(
                <li>
                  <p>Problems Submitted: {item.problemsSolved}</p>
                  <p>Problems solved: {item.problemsSolved}</p>
                  <p>Average Time after submission: {item.AverageTimeAfterSubmission}</p>
                  <p>Average Time after submission HR: {item.AverageTimeAfterSubmissionHR}</p>
                  <p>Minimum time after submission: {item.MinimumTimeAfterSubmission} </p>
                  <p>Minimum time after submission HR: {item.MinimumTimeAfterSubmissionHR}</p>
                  <p>Maximum time after submission: {item.MaximumTimeAfterSubmission}</p>
                  <p>Maximum time after submission HR: {item.MaximumTimeAfterSubmissionHR}</p>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className='monthly_stats_container'>
        <h2>Monthly Stats</h2>
        <p>Month: </p>
        <p>Number of finished problems: </p>
        <p>Average Time after submission: </p>
        <p>Average Time after submission HR: </p>
        <p>Minimum time after submission: </p>
        <p>Minimum time after submission HR: </p>
        <p>Maximum time after submission: </p>
        <p>Maximum time after submission HR: </p>
      </section>
    </main>
  )
}

export default page