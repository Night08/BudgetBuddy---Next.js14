import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "BudgetBuddy: Your Personal Finance Companion",
  description: "BudgetBuddy simplifies expense tracking and budget management. Easily log expenses, set budgets, and get real-time insights into your spending habits. Stay on top of your finances with our secure, user-friendly interface. Start your journey to financial freedom today with BudgetBuddy.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
