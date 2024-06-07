'use client'

import React, { useState } from 'react'
import { useContext, createContext } from 'react'

const CreditsContext = createContext();

export const useCredits = () => {
    return useContext(CreditsContext);
}

export const CreditsProvider = ({children}) => {

    const [credits, setCredits] = useState(0);

    const fetchCredits = () => {
        fetch('http://localhost:4004/getCredits', {
          method: 'get',
        })
        .then(response => response.json())
        .then(data => {
          setCredits(data.globalCreds);
        })
      }


  return (
    <CreditsContext.Provider value={{credits, fetchCredits}}>
        {children}
    </CreditsContext.Provider>
  )
}

