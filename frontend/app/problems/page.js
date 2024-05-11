import Problem from '@/Components/Problem';
import React from 'react'
import '@/Styles/problemlist.css'

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

const page = () => {
  return (
    <main className='problemlist_container'>
        <h1>Problems List</h1>
        <div>
          <p></p>
        </div>
        <ul className='problemlist'>
        {
            problems.map((problem) => {
                return(
                    <li key={problem.id}>
                      <Problem problem={problem}/>
                    </li>
                )
            })
        }
      </ul>
    </main>
  )
}

export default page