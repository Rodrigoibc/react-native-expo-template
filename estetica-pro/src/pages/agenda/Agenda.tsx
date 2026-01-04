import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import CalendarView from './components/CalendarView';
import AgendaForm from './components/AgendaForm';
import DateRangePicker from '../../components/ui/DateRangePicker';
import SearchBar from '../../components/ui/SearchBar';
import { 
  AgendaItem, 
  Cliente, 
  Colaborador, 
  Servico 
} from '../../models/Agenda.model';

export default function Agenda() {
  const { user } = useAuth();
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Carregar agenda
      const { data: agendaData, error: agendaError } = await supabase
        .from('agenda')
        .select('*')
        .order('data', { ascending: true });

      if (agendaError) throw agendaError;

      // Carregar clientes
      const { data: clientesData, error: clientesError } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });

      if (clientesError) throw clientesError;

      // Carregar colaboradores
      const { data: colaboradoresData, error: colaboradoresError } = await supabase
        .from('colaboradores')
        .select('*')
        .order('nome', { ascending: true });

      if (colaboradoresError) throw colaboradoresError;

      // Carregar serviços
      const { data: servicosData, error: servicosError } = await supabase
        .from('servicos')
        .select('*')
        .order('nome', { ascending: true });

      if (servicosError) throw servicosError;

      setAgenda(agendaData || []);
      setClientes(clientesData || []);
      setColaboradores(colaboradoresData || []);
      setServicos(servicosData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (agendaData: any) => {
    try {
      if (selectedAgenda) {
        // Atualizar
        const { error } = await supabase
          .from('agenda')
          .update(agendaData)
          .eq('id', selectedAgenda.id);

        if (error) throw error;
      } else {
        // Criar
        const { error } = await supabase
          .from('agenda')
          .insert([agendaData]);

        if (error) throw error;
      }

      await loadData();
      setShowForm(false);
      setSelectedAgenda(null);
    } catch (error) {
      console.error('Erro ao salvar agenda:', error);
    }
  };

  const handleEdit = (item: AgendaItem) => {
    setSelectedAgenda(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        const { error } = await supabase
          .from('agenda')
          .delete()
          .eq('id', id);

        if (error) throw error;

        await loadData();
      } catch (error) {
        console.error('Erro ao excluir agenda:', error);
      }
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
            <div className="flex items-center space-x-4">
              <DateRangePicker />
              <SearchBar placeholder="Buscar na agenda..." />
              <button
                onClick={() => {
                  setSelectedAgenda(null);
                  setShowForm(true);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Novo Agendamento
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CalendarView 
          agenda={agenda} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </main>

      {/* Formulário de Agendamento */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <AgendaForm
              clientes={clientes}
              colaboradores={colaboradores}
              servicos={servicos}
              initialData={selectedAgenda}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setSelectedAgenda(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}