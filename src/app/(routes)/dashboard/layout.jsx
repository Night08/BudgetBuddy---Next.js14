"use client";
import React, { useEffect } from 'react'
import SideNav from "@/app/_components/SideNav";
import Dashboardheader from '@/app/_components/Dashboardheader';
import { db } from '@/utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { Budgets } from '@/utils/schema';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

const DashboardLayout = ({children}) => {
    const router = useRouter()
    const {user} = useUser()

    useEffect(()=>{
        user && checkUserBudgets();
    }, [user])

    const checkUserBudgets =  async () => {
        const results = await db.select().from(Budgets).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))

        if(results.length == 0){
            router.replace('/dashboard/budgets')
        }
    }

  return (<>
    <div className='fixed md:w-64 hidden md:block'>
        <SideNav />
    </div>
    <div className='md:ml-64'>
        <Dashboardheader />
        <Toaster />
        {children}
    </div>
    </>
  )
}

export default DashboardLayout