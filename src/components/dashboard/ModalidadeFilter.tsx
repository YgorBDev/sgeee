import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModalidadeFilterProps {
  modalidades: string[];
  selectedModalidade: string;
  onModalidadeChange: (modalidade: string) => void;
}

export function ModalidadeFilter({ 
  modalidades, 
  selectedModalidade, 
  onModalidadeChange 
}: ModalidadeFilterProps) {
  return (
    <Select value={selectedModalidade} onValueChange={onModalidadeChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filtrar por modalidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todas">Todas as modalidades</SelectItem>
        {modalidades.map((modalidade) => (
          <SelectItem key={modalidade} value={modalidade}>
            {modalidade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}