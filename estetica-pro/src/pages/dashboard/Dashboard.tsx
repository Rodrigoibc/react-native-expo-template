import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store';
import StatCards from './components/StatCards';
import AgendaHoje from './components/AgendaHoje';
import RankingColaboradores from './components/RankingColaboradores';
import DateRangePicker from '../../components/ui/DateRangePicker';
import SearchBar from '../../components/ui/SearchBar';

export default function Dashboard() {
  const { user } = useAuth();
  const { 
    leads, 
    agenda, 
    colaboradores, 
    fetchLeads, 
    fetchAgenda, 
    fetchColaboradores 
  } = useStore();

  useEffect(() => {
    // Carregar dados iniciais
    fetchLeads();
    fetchAgenda();
    fetchColaboradores();
  }, []);

  // Calcular estatísticas
  const leadsConversao = leads.filter(lead => lead.status === 'convertido').length;
  const taxaConversao = leads.length > 0 ? Math.round((leadsConversao / leads.length) * 100) : 0;
  
  const agendaHoje = agenda.filter(item => {
    const hoje = new Date().toISOString().split('T')[0];
    return item.data.split('T')[0] === hoje;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <DateRangePicker />
              <SearchBar placeholder="Buscar no sistema..." />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <StatCards />

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Agenda de Hoje */}
          <div className="lg:col-span-2">
            <AgendaHoje agendaHoje={agendaHoje} />
          </div>

          {/* Ranking de Colaboradores */}
          <div className="lg:col-span-1">
            <RankingColaboradores colaboradores={colaboradores} />
          </div>
        </div>

        {/* Últimos Leads */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimos Leads</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.slice(0, 5).map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lead.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.telefone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${lead.status === 'convertido' ? 'bg-green-100 text-green-800' : 
                            lead.status === 'agendado' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.criado_em ? new Date(lead.criado_em).toLocaleDateString('pt-BR') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}