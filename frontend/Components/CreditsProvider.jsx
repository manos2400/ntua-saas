'use client'

import React, { useState } from 'react'
import { useContext, createContext } from 'react'

const CreditsContext = createContext();

export const useCredits = () => {
    return useContext(CreditsContext);
}

export const CreditsProvider = ({children}) => {

    const [credits, setCredits] = useState(0);

    const fetchCredits = async () => {
        try {
          const result = await fetch('http://localhost:4004/getCredits', {
            method: 'get',
          });
  
          if(result.status !== 200){
            setCredits(0);
          }
          else{
            const data = await result.json();
            setCredits(data.globalCreds);
          }          
        } catch (error) {
          setCredits(0);
        }
        

        // .then(response => response.json())
        // .then(data => {
        //   setCredits(data.globalCreds);
        // })
      }


  return (
    <CreditsContext.Provider value={{credits, fetchCredits}}>
        {children}
    </CreditsContext.Provider>
  )
}

