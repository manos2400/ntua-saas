'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { Audio } from 'react-loader-spinner';
import ProblemAnalytics from '@/Components/ProblemAnalytics';
import '@/Styles/analytics.css'
import ProblemResult from '@/Components/ProblemResult';

const page = () => {

    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [problemAnalytics, setProblemAnalytics] = useState({});
    const [problemResults, setProblemResults] = useState({});

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
            setProblemAnalytics(data);
            setLoading(false);


            fetch('http://localhost:4002/results/' + params.problemid, {
                method: 'get'
            })
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }
                else{
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                setProblemResults(data);
            })
            .catch(err => console.log(err))

        })
        .catch((err) => console.log(err))
    }, [])

  return (
    loading
        ? <Audio height="80" width="80" radius="9" color="green" ariaLabel="three-dots-loading" wrapperStyle wrapperClass/>
        
        : <div className='problem_results'>
            <ProblemResult problem={problemResults}/>
            <ProblemAnalytics problem={problemAnalytics}/>
          </div>
    
  )
}

export default page