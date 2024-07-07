"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses  } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpenses from '../_components/AddExpenses';
import ExpensesTable from '../_components/ExpensesTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenBoxIcon, Trash } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';
  

const ExpenseScreen = ({params}) => {
    const {user} = useUser();

    const [budgetInfo, setBudgetInfo] = useState()
    const [expensesList, setExpensesList] = useState([])
    const router = useRouter();

    useEffect(() => {
      user && getBudgetInfo();
    }, [user])
    
    // fetch budget information 
    const getBudgetInfo = async () => {
        const results = await db.select({
            ...getTableColumns(Budgets),
            totalExpenditure: sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.name})`.mapWith(Number)
        }).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)).where(eq(Budgets.id, params.id)).groupBy(Budgets.id);

        setBudgetInfo(results[0])

        // get expenses list
        getExpensesList();
    }

    // fetch latest expenses list
    const getExpensesList = async () => {
        let result = await db.select().from(Expenses).where(eq(Expenses.budgetId, params.id)).orderBy(desc(Expenses.id))
        setExpensesList(result)
    }

    // delete budget from the database
    const handleDeleteBudget = async () => {
      let deletedExpensesResult = await db.delete(Expenses).where(eq(Expenses.budgetId, params.id)).returning()

      if(deletedExpensesResult){
        let result = await db.delete(Budgets).where(eq(Budgets.id, params.id)).returning()
      }
      toast("Budget Deleted Successfully1");
      router.replace("/dashboard/budgets");

    }

  return (
    <div className='px-6 py-7'>
        <div className='font-bold text-3xl flex items-center justify-between'> <h2 className='flex gap-2 items-center'> <ArrowLeft className='cursor-pointer font-bold' onClick={()=> router.back()} /> My Expenses </h2> 
          <div className='flex gap-2 items-center'>
            <EditBudget budgetInfo={budgetInfo} refreshData={()=> getBudgetInfo()}/>
          <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button className="flex gap-2" variant='destructive'><Trash /> Delete Budget</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your budget along with all the expenses
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteBudget}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </div> 
            

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
           { budgetInfo ?  <BudgetItem budget={budgetInfo} /> : <div className='w-full h-[145px] animate-pulse bg-slate-200 rounded-lg' ></div> }

            <AddExpenses budgetId={params.id} refreshData={()=> getBudgetInfo()}/> {/* refreshData ensures that the component
                                                                      display the updated data all the time */}
        </div>

        {/* Expenses list table  */}
        <div className='mt-5'>
          
            <ExpensesTable expensesList={expensesList} refreshData={()=> getBudgetInfo()}/> 
             
        </div>
    </div>
  )
}

export default ExpenseScreen