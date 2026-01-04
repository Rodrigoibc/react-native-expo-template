import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';

export default function Servicos() {
  const { servicos, fetchServicos, createServico, updateServico, deleteServico, loading } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingServico, setEditingServico] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    duracao: 60,
    preco: 0,
    categoria: '',
    ativo: true
  });

  useEffect(() => {
    fetchServicos();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingServico) {
        await updateServico(editingServico.id, formData);
      } else {
        await createServico(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleEdit = (servico: any) => {
    setEditingServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao || '',
      duracao: servico.duracao,
      preco: servico.preco,
      categoria: servico.categoria,
      ativo: servico.ativo
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await deleteServico(id);
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      duracao: 60,
      preco: 0,
      categoria: '',
      ativo: true
    });
    setEditingServico(null);
    setShowForm(false);
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
            <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Novo Serviço
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicos.map((servico) => (
                <tr key={servico.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{servico.nome}</div>
                    <div className="text-sm text-gray-500">{servico.descricao}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {servico.duracao} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    R$ {servico.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {servico.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${servico.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {servico.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(servico)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(servico.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Formulário de Serviços */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingServico ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricao">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duracao">
                      Duração (min)
                    </label>
                    <input
                      type="number"
                      id="duracao"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.duracao}
                      onChange={(e) => setFormData({...formData, duracao: parseInt(e.target.value) || 0})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preco">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      id="preco"
                      step="0.01"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.preco}
                      onChange={(e) => setFormData({...formData, preco: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                    Categoria
                  </label>
                  <input
                    type="text"
                    id="categoria"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600"
                      checked={formData.ativo}
                      onChange={(e) => setFormData({...formData, ativo: e.target.checked})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Ativo</span>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {editingServico ? 'Atualizar' : 'Criar'} Serviço
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}