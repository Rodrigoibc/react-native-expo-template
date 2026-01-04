import React from 'react';
import { useStore } from '../../../store';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color}`}>
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <span className="font-medium text-gray-700">{subtitle}</span>
      </div>
    </div>
  </div>
);

const StatCards: React.FC = () => {
  const { leads, agenda, transacoes } = useStore();

  // Calcular estatísticas
  const totalLeads = leads.length;
  const leadsConvertidos = leads.filter(lead => lead.status === 'convertido').length;
  const taxaConversao = totalLeads > 0 ? Math.round((leadsConvertidos / totalLeads) * 100) : 0;
  
  const agendaHoje = agenda.filter(item => {
    const hoje = new Date().toISOString().split('T')[0];
    return item.data.split('T')[0] === hoje;
  }).length;
  
  const receitas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pago')
    .reduce((sum, t) => sum + (t.valor || 0), 0);
  
  const StatIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="h-8 w-8 flex items-center justify-center">
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total de Leads"
        value={totalLeads}
        subtitle="Leads cadastrados"
        icon={
          <StatIcon>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </StatIcon>
        }
        color="bg-indigo-500"
      />
      
      <StatCard
        title="Taxa de Conversão"
        value={`${taxaConversao}%`}
        subtitle="Leads convertidos"
        icon={
          <StatIcon>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </StatIcon>
        }
        color="bg-green-500"
      />
      
      <StatCard
        title="Agendamentos Hoje"
        value={agendaHoje}
        subtitle="Atendimentos agendados"
        icon={
          <StatIcon>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </StatIcon>
        }
        color="bg-blue-500"
      />
      
      <StatCard
        title="Receita Total"
        value={`R$ ${receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        subtitle="Receitas pagas"
        icon={
          <StatIcon>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </StatIcon>
        }
        color="bg-yellow-500"
      />
    </div>
  );
};

export default StatCards;