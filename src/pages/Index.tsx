import { useState, useMemo } from "react";
import { Activity, Package, TrendingUp, BarChart3 } from "lucide-react";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { MaterialBarChart } from "@/components/dashboard/BarChart";
import { MaterialPieChart } from "@/components/dashboard/PieChart";
import { MaterialsTable } from "@/components/dashboard/MaterialsTable";
import { ModalidadeFilter } from "@/components/dashboard/ModalidadeFilter";
import { materialsData } from "@/data/materialsData";
import { Material, ModalidadeData, ChartData } from '@/types/materials';

const Index = () => {
  const [selectedModalidade, setSelectedModalidade] = useState<string>("todas");

  // Obter modalidades únicas
  const modalidades = useMemo(() => {
    return Array.from(new Set(materialsData.map(item => item.modalidade)));
  }, []);

  // Filtrar dados baseado na modalidade selecionada
  const filteredMaterials = useMemo(() => {
    if (selectedModalidade === "todas") {
      return materialsData;
    }
    return materialsData.filter(item => item.modalidade === selectedModalidade);
  }, [selectedModalidade]);

  // Calcular métricas gerais
  const metrics = useMemo(() => {
    const totalMaterials = filteredMaterials.reduce((sum, item) => sum + item.total, 0);
    const totalUso = filteredMaterials.reduce((sum, item) => sum + item.qtdUso, 0);
    const totalEstoque = filteredMaterials.reduce((sum, item) => sum + item.qtdEstoque, 0);
    
    return {
      totalMaterials,
      totalUso,
      totalEstoque,
      uniqueItems: filteredMaterials.length
    };
  }, [filteredMaterials]);

  // Preparar dados para gráfico de barras (por modalidade)
  const barChartData: ModalidadeData[] = useMemo(() => {
    const modalidadeMap = new Map<string, { uso: number; estoque: number; total: number }>();
    
    filteredMaterials.forEach(item => {
      const existing = modalidadeMap.get(item.modalidade) || { uso: 0, estoque: 0, total: 0 };
      modalidadeMap.set(item.modalidade, {
        uso: existing.uso + item.qtdUso,
        estoque: existing.estoque + item.qtdEstoque,
        total: existing.total + item.total
      });
    });

    return Array.from(modalidadeMap.entries()).map(([modalidade, data]) => ({
      modalidade,
      ...data
    }));
  }, [filteredMaterials]);

  // Preparar dados para gráfico de pizza
  const pieChartData: ChartData[] = useMemo(() => {
    return [
      {
        name: "Materiais em Uso",
        value: metrics.totalUso,
        color: "hsl(var(--sport-blue))"
      },
      {
        name: "Materiais em Estoque",
        value: metrics.totalEstoque,
        color: "hsl(var(--sport-green))"
      }
    ];
  }, [metrics]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Dashboard - Controle de Materiais Esportivos</h1>
          <p className="text-white/80">Gerencie e monitore todos os materiais esportivos em tempo real</p>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-2xl font-semibold">Visão Geral</h2>
          <ModalidadeFilter
            modalidades={modalidades}
            selectedModalidade={selectedModalidade}
            onModalidadeChange={setSelectedModalidade}
          />
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Total de Materiais"
            value={metrics.totalMaterials}
            subtitle="Soma de todos os materiais"
            variant="primary"
            icon={<Package />}
          />
          <MetricsCard
            title="Materiais em Uso"
            value={metrics.totalUso}
            subtitle="Atualmente sendo utilizados"
            variant="accent"
            icon={<Activity />}
          />
          <MetricsCard
            title="Materiais em Estoque"
            value={metrics.totalEstoque}
            subtitle="Disponíveis para uso"
            variant="warning"
            icon={<TrendingUp />}
          />
          <MetricsCard
            title="Tipos de Materiais"
            value={metrics.uniqueItems}
            subtitle="Itens diferentes cadastrados"
            icon={<BarChart3 />}
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MaterialBarChart
            data={barChartData}
            title="Comparação por Modalidade: Uso vs Estoque"
          />
          <MaterialPieChart
            data={pieChartData}
            title="Proporção Geral: Uso vs Estoque"
          />
        </div>

        {/* Tabela Detalhada */}
        <MaterialsTable
          materials={filteredMaterials}
          title="Detalhamento de Todos os Materiais"
        />
      </div>
    </div>
  );
};

export default Index;