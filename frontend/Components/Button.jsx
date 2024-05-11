import React from 'react'
import '@/Styles/button.css'

const Button = ({title}) => {
  return (
    <button className='btn'>{title}</button>
  )
}

export default Button