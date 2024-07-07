import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({budgetList}) => {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalExpenditure, setTotalExpenditure] = useState(0)
    
    useEffect(() => {
         budgetList && calculateCardDetails();
    }, [budgetList])
    
    const calculateCardDetails = () => {
        let totalBudgetAmount = 0;
        let totalExpenditureAmount = 0;

        budgetList.forEach((element)=> {
            totalBudgetAmount = totalBudgetAmount + Number(element.amount);
            totalExpenditureAmount = totalExpenditureAmount + Number(element.totalExpenditure)
        })

        setTotalBudget(totalBudgetAmount);
        setTotalExpenditure(totalExpenditureAmount);
    }
    

    return (
    <div>
        {budgetList?.length > 0 ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='p-7 border rounded-lg flex items-center justify-between font-semibold'>
            <div>
                <h2 className='text-sm'>
                    Total Budget
                </h2>
                <h2 className='font-bold text-2xl'> ₹{totalBudget}</h2>
            </div>
            <PiggyBank className='bg-main rounded-full p-3 w-12 h-12 text-white' />
        </div>

        <div className='p-7 border rounded-lg flex items-center justify-between font-semibold'>
            <div>
                <h2 className='text-sm'>
                    Total Expenditure
                </h2>
                <h2 className='font-bold text-2xl'> ₹{totalExpenditure}</h2>
            </div>
            <ReceiptText className='bg-main rounded-full p-3 w-12 h-12 text-white' />
        </div>

        <div className='p-7 border rounded-lg flex items-center justify-between font-semibold'>
            <div>
                <h2 className='text-sm'>
                    No. of Budgets
                </h2>
                <h2 className='font-bold text-2xl'> {budgetList?.length}</h2>
            </div>
            <Wallet className='bg-main rounded-full p-3 w-12 h-12 text-white' />
        </div>
    </div>
    : 
  <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1,2,3].map((index)=>(
             <div key={index} className='h-[110px] bg-slate-200 rounded-lg animate-pulse'>
        </div>
         ))}
    </div>
        
    }
    </div>
  )
}

export default CardInfo