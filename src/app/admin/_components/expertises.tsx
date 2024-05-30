import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SectionAdmin } from "./section";
import { getExpertisesDb } from "@/server/data-access";
import { EditExpertis } from "./editExpertis";

const dynamic = 'force-dynamic' 

export async function ExpertisesManager() {
  const skills = await getExpertisesDb()
  return (
    <SectionAdmin title="Skills">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Skills</TableHead>
            <TableHead>Prompt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((item, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{item.expertise}</TableCell>
              <TableCell>{item.descr}</TableCell>
              <TableCell>
                <EditExpertis key={`expertise-${item.expertise}-${item.descr}`} expertise={item.expertise} descr={item.descr} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionAdmin>
  );
}
