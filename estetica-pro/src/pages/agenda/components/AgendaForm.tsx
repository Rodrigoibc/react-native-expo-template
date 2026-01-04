import React, { useState, useEffect } from 'react';
import { AgendaItem, Cliente, Colaborador, Servico } from '../../models/Agenda.model';

interface AgendaFormProps {
  clientes: Cliente[];
  colaboradores: Colaborador[];
  servicos: Servico[];
  initialData?: AgendaItem | null;
  onSave: (agendaData: any) => void;
  onClose: () => void;
}

const AgendaForm: React.FC<AgendaFormProps> = ({ 
  clientes, 
  colaboradores, 
  servicos, 
  initialData, 
  onSave, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    cliente_id: initialData?.cliente_id || '',
    colaborador_id: initialData?.colaborador_id || '',
    servico_id: initialData?.servico_id || '',
    data: initialData?.data ? initialData.data.split('T')[0] : '',
    hora_inicio: initialData?.hora_inicio || '',
    hora_fim: initialData?.hora_fim || '',
    status: initialData?.status || 'agendado',
    observacoes: initialData?.observacoes || '',
    valor_pago: initialData?.valor_pago || 0,
    forma_pagamento: initialData?.forma_pagamento || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        cliente_id: initialData.cliente_id,
        colaborador_id: initialData.colaborador_id,
        servico_id: initialData.servico_id,
        data: initialData.data ? initialData.data.split('T')[0] : '',
        hora_inicio: initialData.hora_inicio,
        hora_fim: initialData.hora_fim,
        status: initialData.status,
        observacoes: initialData.observacoes || '',
        valor_pago: initialData.valor_pago || 0,
        forma_pagamento: initialData.forma_pagamento || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cliente_id) newErrors.cliente_id = 'Cliente é obrigatório';
    if (!formData.colaborador_id) newErrors.colaborador_id = 'Colaborador é obrigatório';
    if (!formData.servico_id) newErrors.servico_id = 'Serviço é obrigatório';
    if (!formData.data) newErrors.data = 'Data é obrigatória';
    if (!formData.hora_inicio) newErrors.hora_inicio = 'Horário de início é obrigatório';
    if (!formData.hora_fim) newErrors.hora_fim = 'Horário de término é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave({
        ...formData,
        id: initialData?.id, // Incluir ID se estiver editando
        criado_em: initialData?.criado_em || new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      });
    }
  };

  // Calcular horário de término baseado na duração do serviço
  useEffect(() => {
    if (formData.servico_id && formData.hora_inicio) {
      const servico = servicos.find(s => s.id === formData.servico_id);
      if (servico) {
        // Converter hora_inicio para minutos desde meia-noite
        const [hours, minutes] = formData.hora_inicio.split(':').map(Number);
        const startMinutes = hours * 60 + minutes;
        
        // Adicionar duração do serviço
        const endMinutes = startMinutes + servico.duracao;
        
        // Converter de volta para HH:MM
        const endHours = Math.floor(endMinutes / 60);
        const endMinutesRemaining = endMinutes % 60;
        
        const horaFim = `${endHours.toString().padStart(2, '0')}:${endMinutesRemaining.toString().padStart(2, '0')}`;
        
        setFormData(prev => ({
          ...prev,
          hora_fim: horaFim
        }));
      }
    }
  }, [formData.servico_id, formData.hora_inicio, servicos]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cliente_id">
          Cliente
        </label>
        <select
          id="cliente_id"
          name="cliente_id"
          value={formData.cliente_id}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.cliente_id ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione um cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
        {errors.cliente_id && <p className="text-red-500 text-xs italic">{errors.cliente_id}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colaborador_id">
          Colaborador
        </label>
        <select
          id="colaborador_id"
          name="colaborador_id"
          value={formData.colaborador_id}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.colaborador_id ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione um colaborador</option>
          {colaboradores.map(colaborador => (
            <option key={colaborador.id} value={colaborador.id}>
              {colaborador.nome}
            </option>
          ))}
        </select>
        {errors.colaborador_id && <p className="text-red-500 text-xs italic">{errors.colaborador_id}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servico_id">
          Serviço
        </label>
        <select
          id="servico_id"
          name="servico_id"
          value={formData.servico_id}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.servico_id ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione um serviço</option>
          {servicos.map(servico => (
            <option key={servico.id} value={servico.id}>
              {servico.nome} - R$ {servico.preco.toFixed(2)}
            </option>
          ))}
        </select>
        {errors.servico_id && <p className="text-red-500 text-xs italic">{errors.servico_id}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data">
            Data
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.data ? 'border-red-500' : ''}`}
          />
          {errors.data && <p className="text-red-500 text-xs italic">{errors.data}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_inicio">
            Horário Início
          </label>
          <input
            type="time"
            id="hora_inicio"
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.hora_inicio ? 'border-red-500' : ''}`}
          />
          {errors.hora_inicio && <p className="text-red-500 text-xs italic">{errors.hora_inicio}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hora_fim">
            Horário Término
          </label>
          <input
            type="time"
            id="hora_fim"
            name="hora_fim"
            value={formData.hora_fim}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="agendado">Agendado</option>
            <option value="confirmado">Confirmado</option>
            <option value="realizado">Realizado</option>
            <option value="cancelado">Cancelado</option>
            <option value="ausente">Ausente</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoes">
          Observações
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor_pago">
            Valor Pago (R$)
          </label>
          <input
            type="number"
            id="valor_pago"
            name="valor_pago"
            value={formData.valor_pago}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            step="0.01"
            min="0"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="forma_pagamento">
            Forma de Pagamento
          </label>
          <select
            id="forma_pagamento"
            name="forma_pagamento"
            value={formData.forma_pagamento}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão de Crédito</option>
            <option value="cartao_debito">Cartão de Débito</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto</option>
            <option value="transferencia">Transferência</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {initialData ? 'Atualizar' : 'Criar'} Agendamento
        </button>
      </div>
    </form>
  );
};

export default AgendaForm;