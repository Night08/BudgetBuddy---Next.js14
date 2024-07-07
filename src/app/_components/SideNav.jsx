'use client';
import { UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname} from "next/navigation";
import React from "react";

const SideNav = () => {
    const {user, isSignedIn} = useUser();

    const path = usePathname();

    const menuList = [
        { id: 1,
          title: "Dashboard",
          icon: <LayoutDashboard />,
          path: '/dashboard'
        },
        { id: 2,
            title: "Budgets",
            icon: <PiggyBank />,
          path: '/dashboard/budgets'
          },
          { id: 3,
            title: "Expenses",
            icon: <ReceiptText />,
          path: '/dashboard/expenses'
          },
          { id: 4,
            title: "Upgrade",
            icon: <ShieldCheck />,
          path: '/dashboard/upgrade'
          },
    ]

  return ( <>
  <div className="h-screen relative px-4 py-2 border shadow-sm">
   <Link href={'/'} className="cursor-pointer"><Image src={'/logo.png'} alt="BudgetBuddy" width={150} height={70} /></Link> 

    <div className="mt-6">
        { menuList.map((menu, index) => { return ( <div key={index}>
            <Link href={menu.path}>
            <h2 className={`flex gap-2 items-center mb-2 font-medium  hover:text-main hover:bg-purple-100 p-5 cursor-pointer ${path==menu.path ? "text-main bg-purple-200" :"text-gray-700"}`}>
            {menu.icon}
            {menu.title}
        </h2> 
        </Link>
        </div>
        )
        })}
    </div>
    <div className="absolute bottom-4 m-1">
    <div className='flex items-center space-x-1'><UserButton /> { isSignedIn ? <b>{user.fullName}</b> : "Profile" }</div>
    </div>
  </div>
  </>) ;
};

export default SideNav;
