'use client'

import React from 'react'
import Image from 'next/image'
import Logo from '../public/SolveMyProbLogo.svg'
import Link from 'next/link';
import '../Styles/navbar.css'



const navbarItems = [
    {   
        id: 0,
        title: 'Home',
        active: false,
        href: '/'
    },
    {   
        id: 1,
        title: 'Submit',
        active: false,
        href: '/submit'
    },
    {   
        id: 2,
        title: 'Problems',
        active: false,
        href: '/problems'
    },
    {   
        id: 3,
        title: 'Analytics',
        active: false,
        href: '/analytics'
    },

];


const Navbar = () => {

    return (
    <nav className='navbar'>
        <Image alt='logo' src={Logo} width={120} height={120}/>
        <ul className='navbar-items'>
            {
                navbarItems.map((item) => {
                    return(
                        <li key={item.id}>
                            <Link href={item.href}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    </nav>
  )
}

export default Navbar