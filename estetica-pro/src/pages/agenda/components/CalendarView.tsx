import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AgendaItem } from '../../../models/Agenda.model';

interface CalendarViewProps {
  agenda: AgendaItem[];
  onEdit: (item: AgendaItem) => void;
  onDelete: (id: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ agenda, onEdit, onDelete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Hoje
          </button>
          <button
            onClick={nextMonth}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Próximo
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(startOfMonth(currentDate));

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-medium text-gray-700 py-2">
          {format(addDays(startDate, i), dateFormat, { locale: ptBR })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'yyyy-MM-dd');
        const cloneDay = day;

        // Obter agendamentos para este dia
        const dayAgenda = agenda.filter(item => item.data.split('T')[0] === formattedDate);

        days.push(
          <div
            key={day.toString()}
            className={`min-h-32 border border-gray-200 p-1 ${
              !isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400' : ''
            } ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}
          >
            <div className="text-right text-sm mb-1">
              <span
                className={`inline-block w-7 h-7 text-center leading-7 rounded-full ${
                  isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {format(cloneDay, 'd')}
              </span>
            </div>
            <div className="overflow-y-auto max-h-24">
              {dayAgenda.map((item) => (
                <div
                  key={item.id}
                  className={`text-xs p-1 mb-1 rounded cursor-pointer ${
                    item.status === 'realizado' ? 'bg-green-100 text-green-800' :
                    item.status === 'confirmado' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                    item.status === 'ausente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => onEdit(item)}
                  title={`Cliente: ${item.cliente_id}\nServiço: ${item.servico_id}\nHorário: ${item.hora_inicio} - ${item.hora_fim}`}
                >
                  <div className="font-medium truncate">{item.hora_inicio}</div>
                  <div className="truncate">{item.cliente_id}</div>
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 mb-2">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {renderHeader()}
      <div className="calendar-container bg-white border rounded-lg">
        {renderDays()}
        <div className="calendar-body">
          {renderCells()}
        </div>
      </div>
      
      {/* Lista de Agendamentos do Dia Selecionado */}
      {selectedDate && (
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Agendamentos para {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
          </h3>
          <div className="space-y-3">
            {agenda
              .filter(item => isSameDay(new Date(item.data), selectedDate))
              .map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <div className="font-medium">{item.hora_inicio} - {item.hora_fim}</div>
                    <div className="text-sm text-gray-600">Cliente: {item.cliente_id}</div>
                    <div className="text-sm text-gray-600">Serviço: {item.servico_id}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;