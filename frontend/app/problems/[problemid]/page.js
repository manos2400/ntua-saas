'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { Audio } from 'react-loader-spinner';
import ProblemAnalytics from '@/Components/ProblemAnalytics';
import '@/Styles/analytics.css'

const page = () => {

    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [problem, setProblem] = useState({})

    useEffect(() => {
        fetch('http://localhost:4003/analytics/' + params.problemid, {
            method: 'get'
        })
        .then(response => {
            if(response.status === 404){
                throw new Error('Problem not found');
            }
            else if(response.status === 200){
                return response.json();
            }
            else{
                throw new Error('Unexpected error');
            }
        })
        .then(data => {
            setProblem(data);
            console.log(data);
            setLoading(false);
        })
        .catch((err) => console.log(err))
    }, [])

  return (
    <main className='analytics_container'>
        {loading
            ? <Audio height="80" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass/>
            
            : <ProblemAnalytics problem={problem}/>

        }
    </main>
  )
}

export default page