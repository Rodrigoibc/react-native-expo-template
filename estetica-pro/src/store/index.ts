import { create } from 'zustand';
import { supabase } from '../config/supabase';
import { 
  Lead, 
  LeadFormData, 
  FinanceiroTransacao, 
  CategoriaFinanceira 
} from '../models';

interface StoreState {
  leads: Lead[];
  clientes: any[];
  colaboradores: any[];
  servicos: any[];
  agenda: any[];
  transacoes: FinanceiroTransacao[];
  categorias: CategoriaFinanceira[];
  loading: boolean;
  error: string | null;
  
  // Leads
  fetchLeads: () => Promise<void>;
  createLead: (leadData: LeadFormData) => Promise<void>;
  updateLead: (id: string, leadData: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  
  // Agenda
  fetchAgenda: () => Promise<void>;
  createAgenda: (agendaData: any) => Promise<void>;
  updateAgenda: (id: string, agendaData: any) => Promise<void>;
  deleteAgenda: (id: string) => Promise<void>;
  
  // Financeiro
  fetchTransacoes: () => Promise<void>;
  createTransacao: (transacaoData: FinanceiroTransacao) => Promise<void>;
  updateTransacao: (id: string, transacaoData: Partial<FinanceiroTransacao>) => Promise<void>;
  deleteTransacao: (id: string) => Promise<void>;
  
  // Colaboradores
  fetchColaboradores: () => Promise<void>;
  createColaborador: (colaboradorData: any) => Promise<void>;
  updateColaborador: (id: string, colaboradorData: any) => Promise<void>;
  deleteColaborador: (id: string) => Promise<void>;
  
  // Serviços
  fetchServicos: () => Promise<void>;
  createServico: (servicoData: any) => Promise<void>;
  updateServico: (id: string, servicoData: any) => Promise<void>;
  deleteServico: (id: string) => Promise<void>;
  
  // Categorias Financeiras
  fetchCategorias: () => Promise<void>;
  createCategoria: (categoriaData: Omit<CategoriaFinanceira, 'id' | 'criado_em'>) => Promise<void>;
  updateCategoria: (id: string, categoriaData: Partial<CategoriaFinanceira>) => Promise<void>;
  deleteCategoria: (id: string) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  leads: [],
  clientes: [],
  colaboradores: [],
  servicos: [],
  agenda: [],
  transacoes: [],
  categorias: [],
  loading: false,
  error: null,
  
  // Leads
  fetchLeads: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('criado_em', { ascending: false });
      
      if (error) throw error;
      
      set({ leads: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createLead: async (leadData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('leads')
        .insert([leadData]);
      
      if (error) throw error;
      
      await get().fetchLeads();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateLead: async (id, leadData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('leads')
        .update(leadData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchLeads();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteLead: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchLeads();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Agenda
  fetchAgenda: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('agenda')
        .select('*')
        .order('data', { ascending: true });
      
      if (error) throw error;
      
      set({ agenda: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createAgenda: async (agendaData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('agenda')
        .insert([agendaData]);
      
      if (error) throw error;
      
      await get().fetchAgenda();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateAgenda: async (id, agendaData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('agenda')
        .update(agendaData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchAgenda();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteAgenda: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('agenda')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchAgenda();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Financeiro
  fetchTransacoes: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .order('data', { ascending: false });
      
      if (error) throw error;
      
      set({ transacoes: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createTransacao: async (transacaoData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transacoes')
        .insert([transacaoData]);
      
      if (error) throw error;
      
      await get().fetchTransacoes();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateTransacao: async (id, transacaoData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transacoes')
        .update(transacaoData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchTransacoes();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteTransacao: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('transacoes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchTransacoes();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Colaboradores
  fetchColaboradores: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('colaboradores')
        .select('*')
        .order('nome', { ascending: true });
      
      if (error) throw error;
      
      set({ colaboradores: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createColaborador: async (colaboradorData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('colaboradores')
        .insert([colaboradorData]);
      
      if (error) throw error;
      
      await get().fetchColaboradores();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateColaborador: async (id, colaboradorData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('colaboradores')
        .update(colaboradorData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchColaboradores();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteColaborador: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('colaboradores')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchColaboradores();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Serviços
  fetchServicos: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .order('nome', { ascending: true });
      
      if (error) throw error;
      
      set({ servicos: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createServico: async (servicoData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('servicos')
        .insert([servicoData]);
      
      if (error) throw error;
      
      await get().fetchServicos();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateServico: async (id, servicoData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('servicos')
        .update(servicoData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchServicos();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteServico: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('servicos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchServicos();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Categorias Financeiras
  fetchCategorias: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('categorias_financeiras')
        .select('*')
        .order('nome', { ascending: true });
      
      if (error) throw error;
      
      set({ categorias: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  createCategoria: async (categoriaData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('categorias_financeiras')
        .insert([categoriaData]);
      
      if (error) throw error;
      
      await get().fetchCategorias();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateCategoria: async (id, categoriaData) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('categorias_financeiras')
        .update(categoriaData)
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchCategorias();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteCategoria: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('categorias_financeiras')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchCategorias();
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));