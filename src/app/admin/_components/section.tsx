import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

export function SectionAdmin({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-4">{children}</CardContent>
    </Card>
  );
}
