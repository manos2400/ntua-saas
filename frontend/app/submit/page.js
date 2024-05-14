import Status from '@/Components/Status'
import React from 'react'
import BlurDecor from '@/Components/BlurDecor'
import '@/Styles/submitform.css'
import SubmitForm from '@/Components/SubmitForm'


const page = () => {

  return (
    <>
        <Status />
        <main className='submit_container'>
          <SubmitForm />
          <BlurDecor color={2} strength={1} position={2}/>
          <BlurDecor color={1} strength={1} position={1}/>
        </main>
    </>
  )
}

export default page