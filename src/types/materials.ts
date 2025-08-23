export interface Material {
  id: string;
  modalidade: string;
  material: string;
  qtdUso: number;
  qtdEstoque: number;
  total: number;
}

export interface ModalidadeData {
  modalidade: string;
  uso: number;
  estoque: number;
  total: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}