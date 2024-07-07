import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetList}) => {
  return (
    <div className='rounded-lg border p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width={'95%'} height={350}>
      <BarChart
        width={550}
        height={350}
        data={budgetList}
        margin={{
          top: 10,
          bottom: 5, 
          left: 5,
          right: 5
        }}
      >
        <XAxis dataKey='name'/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalExpenditure' stackId='a' fill='#5C22AC'/>
        <Bar dataKey='amount' stackId='a' fill='#BE98F2'/>

      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard