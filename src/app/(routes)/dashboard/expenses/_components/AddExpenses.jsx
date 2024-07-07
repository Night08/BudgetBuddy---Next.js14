"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const AddExpenses = ({budgetId, refreshData}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)

    // adds new expenses to expenses table in the database
    const handleAddNewExpense = async () => {
      setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name, 
            amount: amount,
            budgetId: budgetId,
            createdAt: new Date().toUTCString()
        }).returning({insertedId: Budgets.id})

        setName('');
        setAmount('');
        if(result){
          setLoading(false)
            refreshData();
            toast("New Expense Added Successfully!");
        }
        setLoading(false)
    }

  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-2xl'>Add Expense</h2>
        <div className="mt-4">
                  <h2 className="text-black font-semibold my-1">

                    Expense Name
                  </h2>
                  <Input
                    placeholder="e.g. College Project"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-gray-900"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-black font-semibold my-1">

                    Expense Amount
                  </h2>
                  <Input
                    placeholder="e.g. ₹1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-gray-900"
                  />
                </div>
                <Button disabled={!(name && amount || loading)} className="mt-3 bg-main w-full hover:bg-purple-900" onClick={handleAddNewExpense}>{loading ? <Loader className='animate-spin' /> : "Add New Expense" }</Button>
    </div>
  )
}

export default AddExpenses