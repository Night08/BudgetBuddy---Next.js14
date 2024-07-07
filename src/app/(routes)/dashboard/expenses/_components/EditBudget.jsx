"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import { PenBoxIcon } from "lucide-react";

const EditBudget = ({budgetInfo, refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
  
    const { user } = useUser();

    useEffect(() => {
     if(budgetInfo){
        setEmojiIcon(budgetInfo?.icon);
        setName(budgetInfo?.name)
        setAmount(budgetInfo?.amount)
     }
    }, [budgetInfo])
    

 const handleUpdateBudget = async () => {
   let result = await db.update(Budgets).set({
    name: name,
    amount: amount,
    icon: emojiIcon
   }).where(eq(Budgets.id, budgetInfo.id)).returning();

   if(result){
    toast("Budget Updated Successfully1");
    refreshData();
   }
 }

  return (
    <div>
          <Dialog>
              {/*'asChild' attribute ensures that dialog box background is displayed hidden for better experience */}
        <DialogTrigger asChild>    
        <Button className='flex gap-2 bg-main'><PenBoxIcon /> Edit Budget </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  className="text-lg"
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {" "}
                  {emojiIcon}{" "}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-black font-semibold my-1">
                    {" "}
                    Budget Name
                  </h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-gray-900"
                  />
                </div>

                <div className="mt-2">
                  <h2 className="text-black font-semibold my-1">
                    {" "}
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    defaultValue={budgetInfo?.amount}
                    placeholder="e.g. ₹10000"
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-gray-900"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
    
          <DialogFooter className="sm:justify-start">
            {/* creates budget and closes the dialog box  */}
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full bg-main hover:bg-purple-900"
                onClick={handleUpdateBudget}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
         
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget