import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <div>
       <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
    <div className="mx-auto max-w-[70%] text-center">
      <h1 className="text-3xl leading-8 font-extrabold sm:text-5xl space-y-2">
        BudgetBuddy
        <strong className="font-extrabold mt-2 text-main sm:block"> Your Personal Finance Companion </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      BudgetBuddy simplifies expense tracking and budget management. Easily log expenses, set budgets, and get real-time insights into your spending habits. Stay on top of your finances with our secure, user-friendly interface. Start your journey to financial freedom today with BudgetBuddy.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-main px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-900 focus:outline-none focus:ring active:bg-purple-900 sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </Link>


      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Banner