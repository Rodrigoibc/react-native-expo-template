// Modelo para Cliente
export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  cpf?: string;
  data_nascimento?: string;
  endereco?: string;
  criado_em: string;
  atualizado_em: string;
}

// Modelo para Colaborador
export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  funcao: string;
  ativo: boolean;
  criado_em: string;
}

// Modelo para Serviço
export interface Servico {
  id: string;
  nome: string;
  descricao?: string;
  duracao: number; // em minutos
  preco: number;
  categoria: string;
  ativo: boolean;
  criado_em: string;
}

// Modelo para Agenda
export interface AgendaItem {
  id: string;
  cliente_id: string;
  colaborador_id: string;
  servico_id: string;
  data: string; // ISO string
  hora_inicio: string; // HH:MM format
  hora_fim: string; // HH:MM format
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado' | 'ausente';
  observacoes?: string;
  valor_pago?: number;
  forma_pagamento?: string;
  criado_em: string;
  atualizado_em: string;
}

// Modelo para Transação Financeira
export interface FinanceiroTransacao {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  categoria_id: string;
  cliente_id?: string;
  colaborador_id?: string;
  agenda_id?: string;
  data: string; // ISO string
  forma_pagamento: string;
  status: 'pendente' | 'pago' | 'cancelado';
  criado_em: string;
  atualizado_em: string;
}

// Modelo para Categoria Financeira
export interface CategoriaFinanceira {
  id: string;
  nome: string;
  tipo: 'receita' | 'despesa';
  descricao?: string;
  ativo: boolean;
  criado_em: string;
}