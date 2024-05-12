import React from 'react'
import '../Styles/submitform.css'

const inputList = [
    {
        id: 1,
        name: 'someshit',
        format: 'xml'
    },
    {
        id: 2,
        name: 'nigga',
        format: 'csv'
    },
    {
        id: 3,
        name: 'boi',
        format: 'xml'
    },
    
];


const InputBox = () => {
  return (
    <section className='input_container'>
        <h2>title</h2>
        <ul className='input_items'>
            {
                inputList.map((item) => {
                    return(
                        <li key={item.id}>
                            <p>{item.id}</p>
                            <p>{item.name}</p>
                            <p>{item.format}</p>
                        </li>
                    )
                })
            }
        </ul>
    </section>
  )
}

export default InputBox