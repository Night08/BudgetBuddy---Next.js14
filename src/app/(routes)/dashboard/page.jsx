"use client";
import BarChartDashboard from '@/app/_components/BarChartDashboard';
import CardInfo from '@/app/_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from './budgets/_components/BudgetItem';
import ExpensesTable from './expenses/_components/ExpensesTable';

const Dashboard = () => {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState([])
  const [expensesList, setExpensesList] = useState([])

  useEffect(() => {
     user && getBudgetList();
  }, [user])
  
//    fetches budget list data from database 
  const getBudgetList = async () => {
      const results = await db.select({
          ...getTableColumns(Budgets),
          totalExpenditure: sql `sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql `count(${Expenses.name})`.mapWith(Number)
      }).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id).orderBy(desc(Budgets.id));

      setBudgetList(results)
      getAllExpenses();
  }

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
    <div className='p-8'>
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
        <p className='text-gray-500'>Manage your money more efficiently with BudgetBuddy!!!</p>

        <CardInfo budgetList={budgetList} />

        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='col-span-2 hover:shadow-sm grid gap-4'>
            <BarChartDashboard budgetList={budgetList} />

            <ExpensesTable expensesList={expensesList} refreshData={()=> getBudgetList()}/>
          </div>
          <div className='flex flex-col space-y-3'>
          { budgetList?.length > 0 ? budgetList.map((budget, index)=> ( 
            <BudgetItem budget={budget} key={index} />
          ))
        : <div className='flex flex-col space-y-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {[1,2,3].map((index)=>(
             <div key={index} className='h-[110px] bg-slate-200 rounded-lg animate-pulse'>
        </div>
         ))}
        </div>
        }
          </div>
        </div>
    </div>
  )
}

export default Dashboard