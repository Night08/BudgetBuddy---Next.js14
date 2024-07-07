"use client";
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

const BudgetList = () => {
    const {user} = useUser();
    const [budgetList, setBudgetList] = useState([])

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
    }
  return (
    <div className='mt-7'> 
        <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={()=> getBudgetList()}/>
        {
        budgetList?.length > 0 ? budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget}/>
        ))
        : [1,2,3,4,5].map((item, index) => (
            <div className='w-full rounded-lg bg-slate-200 h-[145px] animate-pulse'></div>
        ))
    }
        </div>
       
    </div>
  )
}

export default BudgetList