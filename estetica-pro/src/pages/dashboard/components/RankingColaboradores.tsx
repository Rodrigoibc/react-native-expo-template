import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface RankingItem {
  id: string;
  nome: string;
  foto?: string;
  totalVendas: number;
  totalAtendimentos: number;
  taxaConversao: number;
}

interface RankingColaboradoresProps {
  colaboradores: any[];
}

const RankingColaboradores: React.FC<RankingColaboradoresProps> = ({ colaboradores }) => {
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre'>('mes');
  
  // Simulação de dados de ranking (em um sistema real, isso viria de cálculos no backend)
  const rankingData: RankingItem[] = colaboradores.slice(0, 5).map((colab, index) => ({
    id: colab.id,
    nome: colab.nome,
    foto: colab.foto,
    totalVendas: Math.floor(Math.random() * 100000) + 5000, // Valor aleatório para simulação
    totalAtendimentos: Math.floor(Math.random() * 50) + 10, // Valor aleatório para simulação
    taxaConversao: Math.floor(Math.random() * 50) + 20 // Valor aleatório para simulação
  })).sort((a, b) => b.totalVendas - a.totalVendas);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Ranking de Colaboradores</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <ArrowDownTrayIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mb-4">
        <select 
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value as 'semana' | 'mes' | 'trimestre')}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="semana">Esta Semana</option>
          <option value="mes">Este Mês</option>
          <option value="trimestre">Este Trimestre</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {rankingData.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <div className="flex-shrink-0 w-8 text-center">
              <span className={`text-lg font-bold ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-yellow-700' : 'text-gray-500'}`}>
                {index + 1}º
              </span>
            </div>
            
            <div className="ml-3 flex-shrink-0">
              {item.foto ? (
                <img className="h-10 w-10 rounded-full" src={item.foto} alt={item.nome} />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
              )}
            </div>
            
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.nome}</p>
              <div className="flex text-xs text-gray-500 space-x-2">
                <span>R$ {item.totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span>•</span>
                <span>{item.totalAtendimentos} atendimentos</span>
              </div>
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{item.taxaConversao}%</p>
                <p className="text-xs text-gray-500">conversão</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-900">Total de Colaboradores</span>
          <span className="text-gray-700">{colaboradores.length}</span>
        </div>
      </div>
    </div>
  );
};

export default RankingColaboradores;