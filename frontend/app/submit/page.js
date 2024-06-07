import Status from '@/Components/Status'
import BlurDecor from '@/Components/BlurDecor'
import '@/Styles/submitform.css'
import SubmitForm from '@/Components/SubmitForm'
import { CreditsProvider } from '@/Components/CreditsProvider'


const page = () => {

 
  return (
    <>
      <CreditsProvider>
        <Status />
        <main className='submit_container'>
          <SubmitForm />
          <BlurDecor color={2} strength={1} position={2}/>
          <BlurDecor color={1} strength={1} position={1}/>
        </main>
      </CreditsProvider>
    </>
  )
}

export default page