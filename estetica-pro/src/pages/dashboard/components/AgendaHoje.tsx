import React from 'react';

interface AgendaItem {
  id: string;
  cliente_id: string;
  colaborador_id: string;
  servico_id: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado' | 'ausente';
  observacoes?: string;
  valor_pago?: number;
  forma_pagamento?: string;
  criado_em: string;
  atualizado_em: string;
}

interface AgendaHojeProps {
  agendaHoje: AgendaItem[];
}

const AgendaHoje: React.FC<AgendaHojeProps> = ({ agendaHoje }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda de Hoje</h2>
      {agendaHoje.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhum agendamento para hoje</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agendaHoje.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.hora_inicio} - {item.hora_fim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.cliente_id} {/* Deveria ser o nome do cliente - isso seria resolvido com joins no backend */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.servico_id} {/* Deveria ser o nome do serviço - isso seria resolvido com joins no backend */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${item.status === 'realizado' ? 'bg-green-100 text-green-800' : 
                        item.status === 'confirmado' ? 'bg-blue-100 text-blue-800' : 
                        item.status === 'cancelado' ? 'bg-red-100 text-red-800' : 
                        item.status === 'ausente' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgendaHoje;