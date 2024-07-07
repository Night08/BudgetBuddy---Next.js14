"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses  } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ExpensesTable from './_components/ExpensesTable';

  

const ExpensesRoute = () => {
    const {user} = useUser();

    const [expensesList, setExpensesList] = useState([])

    useEffect(() => {
      user && getAllExpenses();
    }, [user])

  // fetches all the expenses list
  const getAllExpenses = async () => {
    let result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Budgets.id))

    setExpensesList(result)
  }


  return (
    <div className='px-6 py-7'>
       <h2  className='font-bold text-3xl'> My Expenses </h2> 

        {/* Expenses list table  */}
        <div className='mt-5'>
            <ExpensesTable showHeader={false} expensesList={expensesList} refreshData={()=> getAllExpenses()}/>      
        </div>
    </div>
  )
}

export default ExpensesRoute