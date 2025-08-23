import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Material } from '@/types/materials';

interface MaterialsTableProps {
  materials: Material[];
  title: string;
}

export function MaterialsTable({ materials, title }: MaterialsTableProps) {
  const getStatusBadge = (uso: number, estoque: number) => {
    const total = uso + estoque;
    const usoPercentage = (uso / total) * 100;
    
    if (usoPercentage >= 80) {
      return <Badge variant="destructive">Alto Uso</Badge>;
    } else if (usoPercentage >= 50) {
      return <Badge className="bg-sport-orange text-white">Médio Uso</Badge>;
    } else {
      return <Badge className="bg-sport-green text-white">Baixo Uso</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modalidade</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-center">Qtd. Uso</TableHead>
                <TableHead className="text-center">Qtd. Estoque</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.modalidade}</TableCell>
                  <TableCell>{material.material}</TableCell>
                  <TableCell className="text-center font-semibold text-sport-blue">
                    {material.qtdUso}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-sport-green">
                    {material.qtdEstoque}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {material.total}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(material.qtdUso, material.qtdEstoque)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}