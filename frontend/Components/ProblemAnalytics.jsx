import React from 'react'
import '@/Styles/analytics.css'
import analyticsLogo from '@/public/analytics.svg'
import Image from 'next/image'

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

const ProblemAnalytics = ({ problem }) => {
    return (
        <section className='problem_analytics_container'>
            <div className='problem_analytics_header'>
                <Image src={analyticsLogo} alt='analytics logo' width={60} height={60}/>
                <h2>Analytics</h2>
            </div>
            <div className='problem_analytics_data'>
                <h3>Solver: vrpSolver</h3>
                <p>Execution Time: {problem?.execTime ? formatTime(problem.execTime) : 'N/A'}</p>
                <p>Memory: {problem?.memory ? formatMemory(problem.memory) : 'N/A'}</p>
                <p>Memory Peak: {problem?.memoryPeak ? formatMemory(problem.memoryPeak) : 'N/A'}</p>
                <p>Timestamp: {problem?.solvedAt ? new Date(problem.solvedAt).toLocaleString() : 'N/A'}</p>
                <p>Submission Time: {problem?.submittedAt ? new Date(problem.submittedAt).toLocaleString() : 'N/A'}</p>
                <p>System Time: {problem?.sysTime ? formatTime(problem.sysTime) : 'N/A'}</p>
                <p>Time after submission: {problem?.timeAfterSubmission ? formatTime(problem.timeAfterSubmission) : 'N/A'}</p>
                <p>User Time: {problem?.userTime ? formatTime(problem.userTime) : 'N/A'}</p>
            </div>
        </section>
    )
}

export default ProblemAnalytics