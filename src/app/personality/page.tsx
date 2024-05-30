"use client";

import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { exceptionHandler } from "@/lib/exceptionHandler";
import { toast } from "@/components/ui/use-toast";
import { getTraitsApi, updateTraitsApi } from "@/api";

export default function PersonalityPage() {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string[]>([]);
  const router = useRouter();

  const dataPersonality = useQuery({
    queryKey: ["traits-all"],
    queryFn: getTraitsApi,
  });

  const updatePersonalityMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? "";

      await updateTraitsApi({
        chat_id,
        traits: value.join(","),
      });

      queryClient.setQueryData(["traits"], value);
    },
    onSuccess: () => {
      toast({ title: "Success set personality traits of your agent" });
      router.push("/expertise");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    updatePersonalityMutation.mutate();
  }, [updatePersonalityMutation]);

  return (
    <Page
      title="Select the personality traits of your agent"
      link="/expertise"
      nextButton={
        <Button
          size="lg"
          variant="default"
          onClick={handleNext}
          disabled={value.length === 0 || updatePersonalityMutation.isPending}
        >
          {updatePersonalityMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          NEXT
        </Button>
      }
    >
      <div className="w-full my-4">
        <ToggleGroup
          variant="outline"
          size="lg"
          type="multiple"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12"
          onValueChange={setValue}
        >
          {dataPersonality &&
            dataPersonality.data &&
            dataPersonality.data.map((value) => (
              <ToggleGroupItem
                key={value}
                value={value}
                aria-label={value}
                className="text-lg h-14"
              >
                {value}
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
    </Page>
  );
}
