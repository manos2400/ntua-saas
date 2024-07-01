'use client';

import React, { useEffect, useState } from 'react'
import { useCredits } from './CreditsProvider';
import '../Styles/status.css'

const Status = () => {

  const {credits, fetchCredits} = useCredits();
  const [status, setStatus] = useState('All services online');

  useEffect(() => {
    fetchAll();
  }, []);

  const checkMicroservice = (microservice) => {
    if(microservice.status === 200){
      return true;
    }
  }
  
  const fetchAll = async () =>{
    await fetchCredits();
    
    let oneFailed = false;
    let statusTemp = '';
    
    try {
      const sumbmit_ms = await fetch('http://localhost:4001/status', {
        method: 'get'
        })
        
      if(!checkMicroservice(sumbmit_ms)){
        console.log(statusTemp);
        if(!oneFailed){
          statusTemp = 'Submit Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Submit Microservice down';
        }
        console.log(statusTemp);
      }

    } catch (error) {
        if(!oneFailed){
          statusTemp = 'Submit Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Submit Microservice down';
        }
    }


    try {
      const analytics_ms = await fetch('http://localhost:4003/status', {
        method: 'get'
        })

        if(!checkMicroservice(analytics_ms)){
          console.log(statusTemp);

          if(!oneFailed){
            statusTemp = 'Analytics Microservice down';
            oneFailed = true;
          }
          else{
            statusTemp = statusTemp + ', Analytics Microservice down';
          }
          console.log(statusTemp);

        }
        
    } catch (error) {
        if(!oneFailed){
          statusTemp = 'Analytics Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Analytics Microservice down';
        }
    }
          
              
    try {
      const generate_ms = await fetch('http://localhost:4005/status', {
        method: 'get'
        })  

        if(!checkMicroservice(generate_ms)){
          if(!oneFailed){
            statusTemp = 'Generate Results Microservice down';
            oneFailed = true;
          }
          else{
            statusTemp = statusTemp + ', Generate Results Microservice down';
          }
        }

        } catch (error) {
            if(!oneFailed){
              statusTemp = 'Generate Result Microservice down';
              oneFailed = true;
            }
            else{
              statusTemp = statusTemp + ', Generate Result Microservice down';
            }
    }

    

    try {
      const problems_ms = await fetch('http://localhost:4000/status', {
        method: 'get'
      })


      if(!checkMicroservice(problems_ms)){
        if(!oneFailed){
          statusTemp = 'Problems Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Problems Microservice down';
        }
      }


    } catch (error) {
        if(!oneFailed){
          statusTemp = 'Problems Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Problems Microservice down';
        }
    }
    

    try {
      const result_ms = await fetch('http://localhost:4002/status', {
        method: 'get'
      })

      if(!checkMicroservice(result_ms)){
        if(!oneFailed){
          statusTemp = 'Results Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Results Microservice down';
        }
      }
  
    } catch (error) {
        if(!oneFailed){
          statusTemp = 'Results Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Results Microservice down';
        }
    }

    try {
      const credits_ms = await fetch('http://localhost:4004/status', {
        method: 'get'
      })

      if(!checkMicroservice(credits_ms)){
        if(!oneFailed){
          statusTemp = 'Credits Microservice down';
          oneFailed = true;
        }
        else{
          statusTemp = statusTemp + ', Credits Microservice down';
        }
      }

    } catch (error) {
      if(!oneFailed){
        statusTemp = 'Credits Microservice down';
        oneFailed = true;
      }
      else{
        statusTemp = statusTemp + ', Credits Microservice down';
      }
    }

    if(statusTemp){
      setStatus(statusTemp);
    }
  
  }

  const addCreds = () => {
    fetch('http://localhost:4004/addCredits', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        credits : 10
      })
    })
    .then(response => response.json())
    .then(response => {
      fetchCredits();
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className='status_container'>
        <div>
          <h3>{`Available Credits: ${credits}`}</h3>
          <button onClick={addCreds}>+</button>
        </div>
        <p>{status}</p>
    </div>
  )
}

export default Status