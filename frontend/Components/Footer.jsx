import React from 'react'
import '../Styles/footer.css'

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
    <footer className='footer_container'>
        <h3>Copyright! All rights reserved</h3>
        <ul className='contributors_container'>
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