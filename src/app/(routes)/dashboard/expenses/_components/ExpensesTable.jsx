import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpensesTable = ({expensesList, refreshData, showHeader = true}) => {

    const handleDeleteExpense = async (expense) => {
        let result = await db.delete(Expenses).where(eq(Expenses.id, expense.id)).returning()

        if(result){
            refreshData();
            toast("Expense Item Deleted Successfully!")
        }
    }

  return (
    <div className='mt-3'>
         {showHeader && <h2 className='font-bold text-xl'>Latest Expenses</h2>} 
        <div className='grid grid-cols-4 p-2 bg-slate-300 mt-3'>
            <h2  className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold'>Date</h2>
            <h2 className='font-bold'>Action</h2>
        </div>
        {
            expensesList.map((expenses, index) => (
                <div className='grid grid-cols-4 p-2 bg-slate-50' key={index}>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2 ><Trash2 className='text-red-600 hover:bg-slate-200 w-10 py-[2px] rounded-lg cursor-pointer' onClick={()=> handleDeleteExpense(expenses)}/></h2>
        </div>
            ))
        }

    </div>
  )
}

export default ExpensesTable