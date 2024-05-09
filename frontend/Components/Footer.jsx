import React from 'react'

const Contributors = [
    {
        name: 'Konstantinos Perifanos',
        email: 'kperifanos2@gmail.com'
    },
    {
        name: 'Konstantinos Perifanos',
        email: 'dim2@gmail.com'
    },
    {
        name: 'Konstantinos Perifanos',
        email: 'manos2@gmail.com'
    },
    {
        name: 'Konstantinos Perifanos',
        email: 'jason2@gmail.com'
    },
    
];

const Footer = () => {
  return (
    <footer>
        <h3>Copyright! All rights reserved</h3>
        <ul>
            {
                Contributors.map((contributor) => {
                    return(
                        <li key={contributor.email}>
                            <h4>{contributor.name}</h4>
                            <span>{contributor.email}</span>
                        </li>
                    )
                })
            }
        </ul>
    </footer>
  )
}

export default Footer