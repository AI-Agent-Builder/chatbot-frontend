"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTrait } from "@/app/admin/_actions";
import { SubmitButton } from "./submit-button";

const initialState = {
  message: "",
};

export function EditTrait({ trait, descr }: { trait: string; descr: string }) {
  const [state, formAction] = useFormState(updateTrait, initialState);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={formAction}
          key={`${trait}-${descr}`}
        >
          <DialogHeader>
            <DialogTitle>Edit trait</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-4">
            <Input id="oldTrait" defaultValue={trait} name="oldTrait" hidden className="sr-only" />
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="trait" className="">
                  Trait
                </Label>
                <Input id="trait" defaultValue={trait} name="trait" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="prompt" className="">
                  Prompt
                </Label>
                <Textarea id="prompt" defaultValue={descr} name="prompt" rows={5} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
