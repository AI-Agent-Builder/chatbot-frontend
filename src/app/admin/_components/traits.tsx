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
import { getTraitsDb } from "@/server/data-access";
import { EditTrait } from "./editTrait";

const dynamic = 'force-dynamic' 

export async function TraitsManager() {
  const traits = await getTraitsDb()
  return (
    <SectionAdmin title="Personality traits">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Trait</TableHead>
            <TableHead>Prompt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {traits.map((item, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{item.trait}</TableCell>
              <TableCell>{item.descr}</TableCell>
              <TableCell>
                <EditTrait key={`${item.trait}-${item.descr}`} trait={item.trait} descr={item.descr} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionAdmin>
  );
}
