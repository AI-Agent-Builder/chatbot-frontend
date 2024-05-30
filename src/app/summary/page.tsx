"use client";

import * as React from "react";

import { Page } from "@/components/page";
import { useQueryClient } from "@tanstack/react-query";

export default function SummaryPage() {
  const queryClient = useQueryClient();

  // const name = queryClient.getQueryData(["name"]);
  const traits = (queryClient.getQueryData(["traits"]) as string[]) ?? [];
  const expertise = (queryClient.getQueryData(["expertise"]) as string[]) ?? [];
  const urls =
    (queryClient.getQueryData(["urls"]) as { url: string; name: string }[]) ??
    [];

  return (
    <Page title="Summary" link="/chat">
      <div className="flex flex-col w-[90vw] max-w-screen-md md:w-[50vw] gap-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h2 className="flex-1">Personality</h2>

          <div className="flex-3 flex justify-between items-center flex-wrap gap-2">
            {traits.map((value) => (
              <div className="border border-primary p-2 rounded-md" key={value}>
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h2 className="flex-1">Expertise</h2>

          <div className="flex-3 flex justify-between items-center flex-wrap gap-2">
            {expertise.map((value) => (
              <div className="border border-primary p-2 rounded-md" key={value}>
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h2 className="flex-1">Data sets</h2>

          <div className="flex-3 flex justify-between items-center flex-wrap gap-2">
            {urls.map(({ name }, index) => (
              <div
                className="border border-primary p-2 rounded-md"
                key={`${name}-${index}`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
