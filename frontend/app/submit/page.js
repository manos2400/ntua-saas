import Button from '@/Components/Button'
import InputBox from '@/Components/InputBox'
import Status from '@/Components/Status'
import React from 'react'

const page = () => {
  return (
    <main>
        <Status />
        <select>
            <option>Python</option>
        </select>
        <InputBox />
        <InputBox />
        <Button title={'Upload'}/>
        <Button title={'Cancel'}/>
    </main>
  )
}

export default page