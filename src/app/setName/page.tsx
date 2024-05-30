"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Page } from "@/components/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateNameApi } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { exceptionHandler } from "@/lib/exceptionHandler";
import { Loader2 } from "lucide-react";

export default function NamePage() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const router = useRouter();

  const setNameMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? "";
      await updateNameApi({
        chat_id,
        name,
      });
      queryClient.setQueryData(["name"], name);
    },
    onSuccess: () => {
      toast({ title: "Success name created" });
      router.push("/personality");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    setNameMutation.mutate();
  }, [setNameMutation]);

  return (
    <Page
      title="Type the name of your agent"
      nextButton={
        <Button
          size="lg"
          variant="default"
          onClick={handleNext}
          disabled={name.length === 0}
        >
          {setNameMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          NEXT
        </Button>
      }
    >
      <div className="flex max-lg items-center w-[70vw] md:w-[40vw]">
        <Input
          type="text"
          id="name"
          placeholder="..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Page>
  );
}
