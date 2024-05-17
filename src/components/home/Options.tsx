import React from 'react'
import { BiPlus, BiUser, BiLogOut } from 'react-icons/bi'

type Props = {
  setFormState: (formState: boolean) => void,
}

function Options(props: Props) {
  return (
    <div className='w-76 h-166 bg-back rounded-16 grid justify-center'>
      <button onClick={()=> props.setFormState(true)}>
        <BiPlus className='text-titles text-60'/>
      </button>
      <button>
        <BiUser className='text-titles text-60'/>
      </button>
    </div>
  )
}

export default Options
