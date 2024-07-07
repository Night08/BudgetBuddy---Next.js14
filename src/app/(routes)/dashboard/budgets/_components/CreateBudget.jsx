"use client";
import React, { useState } from "react";
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

const CreateBudget = ({refreshData}) => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { user } = useUser();

  // creates new budget and insert it into the database
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
        toast("New Budget Created Successufully!");
        refreshData();
    }
  };
  return (
    <>
      <Dialog>
              {/*'asChild' attribute ensures that dialog box background is displayed hidden for better experience */}
        <DialogTrigger asChild>    
          <div className="bg-slate-100 font-semibold p-10 rounded-md items-center flex flex-col cursor-pointer border-2 border-dashed hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2> Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                onClick={onCreateBudget}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
         
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBudget;
