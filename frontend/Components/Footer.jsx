import React from 'react';
import '../Styles/footer.css';

const Contributors = [
    {
        name: 'Konstantinos Perifanos',
        email: 'kperifanos2@gmail.com'
    },
    {
        name: 'Emmanouil Kolydakis',
        email: 'el20156@mail.ntua.gr'
    },
    {
        name: 'Iasonas Kouriannidis',
        email: 'el20439@mail.ntua.gr'
    },
    {
        name: 'Dimitris Georgoulopoulos',
        email: 'el20862@mail.ntua.gr'
    },
];

const Footer = () => {
    return (
        <footer className='footer_container'>
            <h3>Copyright! All rights reserved</h3>
            <ul className='contributors_container'>
                {
                    Contributors.map((contributor) => {
                        return (
                            <li key={contributor.email} className='contributor_item'>
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

export default Footer;
