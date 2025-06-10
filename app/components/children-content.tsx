import type { Child } from "~/api/children";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "./ui/table";
import { Label } from "./ui/label";

type ChildrenProps = {
  children: Child[];
};

export function ChildrenContent({ children }: ChildrenProps) {
  return (
    <div className="rounded-md border mx-4 mt-4 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Nome da Criança</TableHead>
            <TableHead className="w-[20%]">Idade</TableHead>
            <TableHead className="w-[20%]">Responsável</TableHead>
            <TableHead className="text-right pr-4 w-[20%]">
              <span className="text-right">Confirmar Presença</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {children.map((child) => (
            <TableRow key={child.id}>
              <TableCell className="font-medium">{child.full_name}</TableCell>
              <TableCell>{child.age} anos</TableCell>
              <TableCell>{child.parent_id}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2 px-4">
                  <Checkbox
                    id={`presenca-${child.id}`}
                    //   checked={obterPresenca(child.id)}
                    //   onCheckedChange={(checked) =>
                    //     marcarPresenca(child.id, checked as boolean)
                    //   }
                  />
                  <Label htmlFor={`presenca-${child.id}`}>Presente</Label>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
