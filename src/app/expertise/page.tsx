"use client";

import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { getExpertisesApi, updateExpertiseApi } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { exceptionHandler } from "@/lib/exceptionHandler";

export default function ExpertisePage() {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string[]>([]);
  const router = useRouter();

  const dataExpertise = useQuery({
    queryKey: ["expertise-all"],
    queryFn: getExpertisesApi,
  });

  const updateExpertiseMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? "";

      await updateExpertiseApi({
        chat_id,
        expertise: value.join(","),
      });

      queryClient.setQueryData(["expertise"], value);
    },
    onSuccess: () => {
      toast({ title: "Expertises were added of your agent" });
      router.push("/upload");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    updateExpertiseMutation.mutate();
  }, [updateExpertiseMutation]);

  return (
    <Page
      title="Select the expertise of your agent"
      link="/upload"
      nextButton={
        <Button
          size="lg"
          variant="default"
          onClick={handleNext}
          disabled={value.length === 0 || updateExpertiseMutation.isPending}
        >
          {updateExpertiseMutation.isPending && (
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
          {dataExpertise.data &&
            dataExpertise.data.map((value) => (
              <ToggleGroupItem
                key={`expertise${value}`}
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
