import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { generateFinanceiroPDF } from '../../lib/pdfGenerator';

export default function Financeiro() {
  const { transacoes, fetchTransacoes, loading } = useStore();
  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' });
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const transacoesFiltradas = transacoes.filter(transacao => {
    const dentroPeriodo = (!periodo.inicio || new Date(transacao.data) >= new Date(periodo.inicio)) && 
                          (!periodo.fim || new Date(transacao.data) <= new Date(periodo.fim));
    const tipoCorreto = filtroTipo === 'todos' || transacao.tipo === filtroTipo;
    return dentroPeriodo && tipoCorreto;
  });

  const totalReceitas = transacoesFiltradas
    .filter(t => t.tipo === 'receita')
    .reduce((sum, t) => sum + (t.valor || 0), 0);
  
  const totalDespesas = transacoesFiltradas
    .filter(t => t.tipo === 'despesa')
    .reduce((sum, t) => sum + (t.valor || 0), 0);
  
  const saldo = totalReceitas - totalDespesas;

  const handleExportPDF = () => {
    generateFinanceiroPDF(transacoesFiltradas, periodo);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Nova Transação
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data Início</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={periodo.inicio}
                onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data Fim</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={periodo.fim}
                onChange={(e) => setPeriodo({...periodo, fim: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value as any)}
              >
                <option value="todos">Todos</option>
                <option value="receita">Receitas</option>
                <option value="despesa">Despesas</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleExportPDF}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium"
              >
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm font-medium text-gray-500">Receitas</p>
            <p className="text-3xl font-bold text-green-600">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm font-medium text-gray-500">Despesas</p>
            <p className="text-3xl font-bold text-red-600">R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-sm font-medium text-gray-500">Saldo</p>
            <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transacoesFiltradas.map((transacao) => (
                <tr key={transacao.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transacao.descricao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${transacao.tipo === 'receita' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transacao.categoria_id}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {transacao.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transacao.data ? new Date(transacao.data).toLocaleDateString('pt-BR') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${transacao.status === 'pago' ? 'bg-green-100 text-green-800' : 
                        transacao.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {transacao.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}