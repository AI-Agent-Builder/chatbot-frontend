import { TraitsManager } from "@/app/admin/_components/traits";
import { ExpertisesManager } from "./_components/expertises";

export default async function Admin() {
  return (
    <div className="container max-w-[1024px] p-2 md:p-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl md:text-left text-center mt-6">
        Admin panel
      </h1>
      <TraitsManager />
      <ExpertisesManager />
    </div>
  );
}
