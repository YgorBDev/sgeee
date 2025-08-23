import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MaterialWithEstoque {
  id: string;
  modalidade: string;
  material: string;
  qtdUso: number;
  qtdEstoque: number;
  total: number;
}

export function useMaterials() {
  return useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const { data: estoqueData, error } = await supabase
        .from('estoque')
        .select(`
          qtd_uso,
          qtd_estoque,
          modalidades!modalidade_id(nome),
          materiais!material_id(nome)
        `);

      if (error) throw error;

      const materials: MaterialWithEstoque[] = estoqueData.map((item: any) => ({
        id: `${item.modalidades.nome}-${item.materiais.nome}`,
        modalidade: item.modalidades.nome,
        material: item.materiais.nome,
        qtdUso: item.qtd_uso || 0,
        qtdEstoque: item.qtd_estoque || 0,
        total: (item.qtd_uso || 0) + (item.qtd_estoque || 0)
      }));

      return materials;
    }
  });
}

export function useModalidades() {
  return useQuery({
    queryKey: ['modalidades'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modalidades')
        .select('nome');

      if (error) throw error;

      return data.map(item => item.nome);
    }
  });
}