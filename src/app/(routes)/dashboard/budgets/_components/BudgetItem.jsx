import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const BudgetItem = ({budget}) => {
const [progressPercent, setProgressPercent] = useState()
    // calculates the progress percentage of amount spent and change progress bar
    useLayoutEffect(() => {
      calculateProgressPerc()
    }, [budget])
    
    const calculateProgressPerc = () => {
        const percent = (budget.totalExpenditure / budget.amount) * 100;
         setProgressPercent(percent.toFixed(2));
    }
  return (
    <Link href={'/dashboard/expenses/' + budget.id}>
        <div  className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[165px]'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='p-1 rounded-full text-2xl px-4 bg-slate-100'>
                {budget?.icon}
            </h2>
            <div>
                <h2 className='font-bold text-lg md:text-xl'>{budget?.name}</h2>
                <h2 className='text-gray-500'>{budget?.totalItem} Item</h2>
            </div>
            
        </div>
        <h2 className='text-lg font-bold text-main'>₹{budget?.amount}</h2>
        </div>

        <div className='mt-5'>
            <div className='flex items-center justify-between mb-2'>
                <h2 className='text-slate-400 text-xs'>₹{budget.totalExpenditure ? budget.totalExpenditure : 0} Spend</h2>
                <h2 className={`text-xs ${progressPercent > 100 ? "text-red-600 font-medium" : "text-slate-400 "}`} >₹{budget.amount - budget.totalExpenditure} {progressPercent > 100 ? "Overspent" : "Remaining"}</h2>
            </div>
            <div className='w-full bg-slate-300 h-2'>
<div className='w-full bg-slate-300 h-2 rounded-full'> 
<div className='bg-main h-2 rounded-full' style={{width: `${progressPercent > 100 ? 100 : progressPercent}%`}}>

            </div>
            </div>
            </div> 
        </div>
        </div>
    </Link>
  )
}

export default BudgetItem