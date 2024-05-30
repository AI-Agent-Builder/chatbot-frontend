import { ReactNode } from "react";
import Link from "next/link";
import { Wave } from "@/components/wave";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Page({
  title,
  children,
  link,
  nextButton,
}: {
  title: string;
  link?: string;
  children?: ReactNode;
  nextButton?: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100dvh-50px)] h-100 flex flex-col p-4 md:p-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl md:text-left text-center mt-6">
        {title}
      </h1>
      <div className="flex flex-1 items-center justify-center relative">
        {children && <div className="flex z-10">{children}</div>}
        <div className={cn(`absolute w-full left-auto right-auto z-0 md:w-[40dvw]`, children && "blur-lg opacity-50")}>
          <Wave />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {link && !nextButton && (
          <Button size="lg" variant="default" asChild>
            <Link href={link}>NEXT</Link>
          </Button>
        )}
        {nextButton && nextButton}
      </div>
    </div>
  );
}
