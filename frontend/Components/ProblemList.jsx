import React from 'react'
import Button from './Button';

const problems = [
    {
        id: 1,
        name: 'problem1',
        timestamp: '2023',
        status: 'executed',
    },
    {
        id: 2,
        name: 'problem2',
        timestamp: '2023',
        status: 'executed',
    },
    {
        id: 3,
        name: 'problem3',
        timestamp: '2023',
        status: 'executed',
    },
    {
        id: 4,
        name: 'problem4',
        timestamp: '2023',
        status: 'executed',
    },
    
];

const ProblemList = () => {
  return (
    <ul>
        {
            problems.map((problem) => {
                return(
                    <li key={problem.id}>
                        <p>{problem.name}</p>
                        <p>{problem.timestamp}</p>
                        <p>{problem.status}</p>
                        <Button title={'edit'}/>
                        <Button title={'run'}/>
                        <Button title={'results'}/>
                        <Button title={'delete'}/> 
                    </li>
                )
            })
        }
    </ul>
  )
}

export default ProblemList