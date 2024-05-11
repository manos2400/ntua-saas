import Button from '@/Components/Button'
import InputBox from '@/Components/InputBox'
import Status from '@/Components/Status'
import React from 'react'
import '@/Styles/input_box.css'
import BlurDecor from '@/Components/BlurDecor'

const page = () => {
  return (
    <>
        <Status />
        <main className='submit_container'>
          <select className='solver_select'>
              <option>Python</option>
          </select>
          <ul className='inputs_list'>
            <li>
              <InputBox />
            </li>
            <li>
              <InputBox />
            </li> 
          </ul>
          <div className='submit_buttons'>
            <Button title={'Upload'}/>
            <Button title={'Cancel'}/>
          </div>
          <BlurDecor color={2} strength={1} position={2}/>
          <BlurDecor color={1} strength={1} position={1}/>
        </main>
    </>
  )
}

export default page