import React from 'react'
import Image from 'next/image'
import LandingImage from '../public/LandingImage.png'

const LandingComponent = () => {
  return (
    <main>
      <h1>SolveMyProblem</h1>
      <Image src={LandingImage} width={1004} height={600} alt='SolveMyProb landing image'/>
      <section>
        <h3>A revolutionary problem solver!</h3>
        <span>Image design by freepiks</span>
      </section>
    </main>
  )
}

export default LandingComponent