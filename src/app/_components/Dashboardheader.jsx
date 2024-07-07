import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Dashboardheader = () => {
  return (
    <div className='p-4 font-semibold border-b shadow-sm flex items-center justify-between'>
        <h2 className='text-main text-3xl font-bold text-center'>
            Your Finance Companion  
        </h2>
        <div>
            <UserButton />
        </div>
    </div>
  )
}

export default Dashboardheader