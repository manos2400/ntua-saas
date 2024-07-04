import React from 'react'
import Image from 'next/image'
import LandingImage from '../public/LandingImage.png'
import '../Styles/landing.css'
import { raleway } from '@/app/layout'
import BlurDecor from './BlurDecor'

const LandingComponent = () => {
  return (
    <main className='landing_container'>
      <section className='landing_details'>
        <h1 className={raleway.className}>SolveMyProblem</h1>
        <h3>A revolutionary problem solver!</h3>
      </section>
      <section className='landing_hero'>
        <Image className='landing_image' src={LandingImage} width={960} height={600} alt='SolveMyProb_landing_image'/>
        {/*<span>Image design by freepiks</span>*/}
      </section>
      <BlurDecor color={1} strength={2} position={1}/>
    </main>
  )
}

export default LandingComponent