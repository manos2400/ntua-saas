import React from 'react'
import '@/Styles/analytics.css'


const AnalyticsComponent = ({analyticObject}) => {
  return (
    <>
      <section className='total_stats_container'>
          <h2>General Analytics</h2>
          <p>Number of problems: {analyticObject?.nProblemsSubmitted}</p>
          <p>Number of finished problems: {analyticObject?.nProblemsSolved}</p>
          <p>Average Time after submission: {analyticObject?.avgTimeAfterSubmission}</p>
          <p>Minimum time after submission: {analyticObject?.minTimeAfterSubmission}</p>
          <p>Maximum time after submission: {analyticObject?.maxTimeAfterSubmission}</p>
          <p>Average Memory: {analyticObject?.avgMemory}</p>
          <p>Maximum Memory: {analyticObject?.maxMemory}</p>
          <p>Minimum Memory: {analyticObject?.minMemory}</p>
          <p>Average Memory Peak: {analyticObject?.avgMemoryPeak}</p>
          <p>Maximum Memory Peak: {analyticObject?.maxMemoryPeak}</p>
          <p>Minimum Memory Peak: {analyticObject?.minMemoryPeak}</p>
          <p>Average System Time: {analyticObject?.avgSysTime}</p>
          <p>Maximum System Time: {analyticObject?.maxSysTime}</p>
          <p>Minimum System Time: {analyticObject?.minSysTime}</p>
          <p>Average User Time: {analyticObject?.avgUserTime}</p>
          <p>Maximum User Time: {analyticObject?.maxUserTime}</p>
          <p>Minimum User Time: {analyticObject?.minUserTime}</p>
          <p>Average Execution Time: {analyticObject?.avgExecTime}</p>
          <p>Maximum Execution Time: {analyticObject?.maxExecTime}</p>
          <p>Minimum Execution Time: {analyticObject?.minExecTime}</p>
      </section>
      <section>
          <h2>Monthly Stats</h2>
              <ul>
                  {analyticObject?.monthlyStats
                  
                  ? analyticObject?.monthlyStats.map((month) => {
                      return(
                          <li key={month.month} className='month_container'>
                              <h3>Month: {month?.month}</h3>
                              <p>Number of finished problems: {month?.nProblemsFinishedInThisMonth}</p>
                              <p>Average Time after submission: {month?.avgTimeAfterSubmission}</p>
                              <p>Minimum time after submission: {month?.minTimeAfterSubmission}</p>
                              <p>Maximum time after submission: {month?.maxTimeAfterSubmission}</p>
                              <p>Average Memory: {month?.avgMemory}</p>
                              <p>Maximum Memory: {month?.maxMemory}</p>
                              <p>Minimum Memory: {month?.minMemory}</p>
                              <p>Average Memory Peak: {month?.avgMemoryPeak}</p>
                              <p>Maximum Memory Peak: {month?.maxMemoryPeak}</p>
                              <p>Minimum Memory Peak: {month?.minMemoryPeak}</p>
                              <p>Average System Time: {month.avgSysTime}</p>
                              <p>Maximum System Time: {month?.maxSysTime}</p>
                              <p>Minimum System Time: {month?.minSysTime}</p>
                              <p>Average User Time: {month?.avgUserTime}</p>
                              <p>Maximum User Time: {month?.maxUserTime}</p>
                              <p>Minimum User Time: {month?.minUserTime}</p>
                              <p>Average Execution Time: {month?.avgExecTime}</p>
                              <p>Maximum Execution Time: {month?.maxExecTime}</p>
                              <p>Minimum Execution Time: {month?.minExecTime}</p>
                          </li>
                      )
                  })
                  : <p>Could not load monthly stats.</p>
                  }
              </ul>
      </section>
      <section>
        <h2>Solver stats </h2>
        <ul>
          {analyticObject?.solversStats
            ? analyticObject?.solversStats.map((solver) => {
                return(
                    <li key={solver.name} className='solver_container'>
                        <h3>Solver: {solver.name}</h3>
                        <p>Number of finished problems: {solver.nProblemsSolved}</p>
                        <p>Average Time after submission: {solver.avgTimeAfterSubmission}</p>
                        <p>Minimum time after submission: {solver.minTimeAfterSubmission}</p>
                        <p>Maximum time after submission: {solver.maxTimeAfterSubmission}</p>
                        <p>Average Memory: {solver.avgMemory}</p>
                        <p>Maximum Memory: {solver.maxMemory}</p>
                        <p>Minimum Memory: {solver.minMemory}</p>
                        <p>Average Memory Peak: {solver.avgMemoryPeak}</p>
                        <p>Maximum Memory Peak: {solver.maxMemoryPeak}</p>
                        <p>Minimum Memory Peak: {solver.minMemoryPeak}</p>
                        <p>Average System Time: {solver.avgSysTime}</p>
                        <p>Maximum System Time: {solver.maxSysTime}</p>
                        <p>Minimum System Time: {solver.minSysTime}</p>
                        <p>Average User Time: {solver.avgUserTime}</p>
                        <p>Maximum User Time: {solver.maxUserTime}</p>
                        <p>Minimum User Time: {solver.minUserTime}</p>
                        <p>Average Execution Time: {solver.avgExecTime}</p>
                        <p>Maximum Execution Time: {solver.maxExecTime}</p>
                        <p>Minimum Execution Time: {solver.minExecTime}</p>
                    </li>
                )
            })
            : <p>Could not load solver stats.</p>
          }
        </ul>
      </section>
    </>
  )
}

export default AnalyticsComponent


