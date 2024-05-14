import React from 'react'
import Button from './Button';
import '@/Styles/problemlist.css'

const Problem = ({problem}) => {
  return (
    <div className='problem_container'>
      <p>{problem.name}</p>
      <p>{problem.timestamp}</p>
      <p>{problem.status}</p>
      <Button title={'edit'}/>
      <Button title={'run'}/>
      <Button title={'results'}/>
      <Button title={'delete'}/> 
    </div>
  )
}

export default Problem
