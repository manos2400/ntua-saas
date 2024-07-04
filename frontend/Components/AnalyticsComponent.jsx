import React from 'react'
import '@/Styles/analytics.css'

// Utility function to format time in a human-readable format
const formatTime = (seconds) => {
    const totalMilliseconds = Math.floor(seconds * 1000);
    const days = Math.floor(totalMilliseconds / (24 * 3600 * 1000));
    const hours = Math.floor((totalMilliseconds % (24 * 3600 * 1000)) / (3600 * 1000));
    const minutes = Math.floor((totalMilliseconds % (3600 * 1000)) / (60 * 1000));
    const secs = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
    const ms = totalMilliseconds % 1000;

    let timeString = '';
    if (days) timeString += `${days} d, `;
    if (hours) timeString += `${hours} h, `;
    if (minutes) timeString += `${minutes} min, `;
    if (secs) timeString += `${secs} s, `;
    timeString += `${ms} ms`;
    return timeString;
};

// Utility function to format memory in GB, TB, or MB
const formatMemory = (mb) => {
    mb = parseInt(mb);
    if (mb >= 1024 * 1024) {
        return `${(mb / (1024 * 1024)).toFixed(2)} TB`;
    } else if (mb >= 1024) {
        return `${(mb / 1024).toFixed(2)} GB`;
    } else {
        return `${mb.toFixed(2)} MB`;
    }
};

const AnalyticsComponent = ({ analyticObject }) => {
    return (
        <>
            <section className='total_stats_container'>
                <h2>General Analytics</h2>
                <p>Number of problems: {analyticObject?.nProblemsSubmitted}</p>
                <p>Number of finished problems: {analyticObject?.nProblemsSolved}</p>
                <p>Average Time after submission: {formatTime(analyticObject?.avgTimeAfterSubmission)}</p>
                <p>Minimum time after submission: {formatTime(analyticObject?.minTimeAfterSubmission)}</p>
                <p>Maximum time after submission: {formatTime(analyticObject?.maxTimeAfterSubmission)}</p>
                <p>Average Memory: {formatMemory(analyticObject?.avgMemory)}</p>
                <p>Maximum Memory: {formatMemory(analyticObject?.maxMemory)}</p>
                <p>Minimum Memory: {formatMemory(analyticObject?.minMemory)}</p>
                <p>Average Memory Peak: {formatMemory(analyticObject?.avgMemoryPeak)}</p>
                <p>Maximum Memory Peak: {formatMemory(analyticObject?.maxMemoryPeak)}</p>
                <p>Minimum Memory Peak: {formatMemory(analyticObject?.minMemoryPeak)}</p>
                <p>Average System Time: {formatTime(analyticObject?.avgSysTime)}</p>
                <p>Maximum System Time: {formatTime(analyticObject?.maxSysTime)}</p>
                <p>Minimum System Time: {formatTime(analyticObject?.minSysTime)}</p>
                <p>Average User Time: {formatTime(analyticObject?.avgUserTime)}</p>
                <p>Maximum User Time: {formatTime(analyticObject?.maxUserTime)}</p>
                <p>Minimum User Time: {formatTime(analyticObject?.minUserTime)}</p>
                <p>Average Execution Time: {formatTime(analyticObject?.avgExecTime)}</p>
                <p>Maximum Execution Time: {formatTime(analyticObject?.maxExecTime)}</p>
                <p>Minimum Execution Time: {formatTime(analyticObject?.minExecTime)}</p>
            </section>
            <section>
                <h2>Monthly Stats</h2>
                <ul>
                    {analyticObject?.monthlyStats
                        ? analyticObject?.monthlyStats.map((month) => {
                            return (
                                <li key={month.month} className='month_container'>
                                    <h3>Month: {month?.month}</h3>
                                    <p>Number of finished problems: {month?.nProblemsFinishedInThisMonth}</p>
                                    <p>Average Time after submission: {formatTime(month?.avgTimeAfterSubmission)}</p>
                                    <p>Minimum time after submission: {formatTime(month?.minTimeAfterSubmission)}</p>
                                    <p>Maximum time after submission: {formatTime(month?.maxTimeAfterSubmission)}</p>
                                    <p>Average Memory: {formatMemory(month?.avgMemory)}</p>
                                    <p>Maximum Memory: {formatMemory(month?.maxMemory)}</p>
                                    <p>Minimum Memory: {formatMemory(month?.minMemory)}</p>
                                    <p>Average Memory Peak: {formatMemory(month?.avgMemoryPeak)}</p>
                                    <p>Maximum Memory Peak: {formatMemory(month?.maxMemoryPeak)}</p>
                                    <p>Minimum Memory Peak: {formatMemory(month?.minMemoryPeak)}</p>
                                    <p>Average System Time: {formatTime(month.avgSysTime)}</p>
                                    <p>Maximum System Time: {formatTime(month?.maxSysTime)}</p>
                                    <p>Minimum System Time: {formatTime(month?.minSysTime)}</p>
                                    <p>Average User Time: {formatTime(month?.avgUserTime)}</p>
                                    <p>Maximum User Time: {formatTime(month?.maxUserTime)}</p>
                                    <p>Minimum User Time: {formatTime(month?.minUserTime)}</p>
                                    <p>Average Execution Time: {formatTime(month?.avgExecTime)}</p>
                                    <p>Maximum Execution Time: {formatTime(month?.maxExecTime)}</p>
                                    <p>Minimum Execution Time: {formatTime(month?.minExecTime)}</p>
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
                            return (
                                <li key={solver.name} className='solver_container'>
                                    <h3>Solver: {solver.name}</h3>
                                    <p>Number of finished problems: {solver.nProblemsSolved}</p>
                                    <p>Average Time after submission: {formatTime(solver.avgTimeAfterSubmission)}</p>
                                    <p>Minimum time after submission: {formatTime(solver.minTimeAfterSubmission)}</p>
                                    <p>Maximum time after submission: {formatTime(solver.maxTimeAfterSubmission)}</p>
                                    <p>Average Memory: {formatMemory(solver.avgMemory)}</p>
                                    <p>Maximum Memory: {formatMemory(solver.maxMemory)}</p>
                                    <p>Minimum Memory: {formatMemory(solver.minMemory)}</p>
                                    <p>Average Memory Peak: {formatMemory(solver.avgMemoryPeak)}</p>
                                    <p>Maximum Memory Peak: {formatMemory(solver.maxMemoryPeak)}</p>
                                    <p>Minimum Memory Peak: {formatMemory(solver.minMemoryPeak)}</p>
                                    <p>Average System Time: {formatTime(solver.avgSysTime)}</p>
                                    <p>Maximum System Time: {formatTime(solver.maxSysTime)}</p>
                                    <p>Minimum System Time: {formatTime(solver.minSysTime)}</p>
                                    <p>Average User Time: {formatTime(solver.avgUserTime)}</p>
                                    <p>Maximum User Time: {formatTime(solver.maxUserTime)}</p>
                                    <p>Minimum User Time: {formatTime(solver.minUserTime)}</p>
                                    <p>Average Execution Time: {formatTime(solver.avgExecTime)}</p>
                                    <p>Maximum Execution Time: {formatTime(solver.maxExecTime)}</p>
                                    <p>Minimum Execution Time: {formatTime(solver.minExecTime)}</p>
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
