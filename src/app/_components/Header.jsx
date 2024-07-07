"use client";
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Header = () => {
    const {user, isSignedIn} = useUser();
  return (
    <div className='px-5 py-2 flex justify-between items-center border shadow-sm'>
        <Image src={'/logo.png'}  alt='BudgetBuddy' width={150} height={70}/>
        
        { isSignedIn ? <div className='flex items-center space-x-1'><UserButton /> <b>{user.fullName}</b></div>: <Link href={'/sign-in'}> <Button>Sign In</Button> </Link>}
    
    </div>
  )
}

export default Header