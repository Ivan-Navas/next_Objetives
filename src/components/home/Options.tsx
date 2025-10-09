import { useAppContext } from '@/Context'
import React from 'react'
import { BiPlus, BiLogOut } from 'react-icons/bi'
import { signOut } from "next-auth/react"

type Props = {
  setFormState: (formState: boolean) => void,
}

function Options(props: Props) {
  const { logOut } = useAppContext();
  return (
    <div className='w-76 h-166 bg-back rounded-16 grid justify-center'>
      <button aria-label='option-buttons' onClick={() => props.setFormState(true)}>
        <BiPlus className='text-titles text-60' />
      </button>
      <button aria-label='option-buttons' onClick={() => {
        signOut()
        logOut()
      }}>
        <BiLogOut className='text-titles text-60' />
      </button>
    </div>
  )
}

export default Options
