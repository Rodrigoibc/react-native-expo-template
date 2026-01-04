import React from 'react';
import { Link } from 'react-router-dom';

export default function CRM() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
            <Link
              to="/crm/leads"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Gerenciar Leads
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestão de Leads</h2>
            <p className="text-gray-600 mb-4">
              Gerencie todos os seus leads, desde o primeiro contato até a conversão em cliente.
            </p>
            <Link
              to="/crm/leads"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Acessar Leads →
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Clientes</h2>
            <p className="text-gray-600 mb-4">
              Acompanhe todo o histórico de atendimentos e interações com seus clientes.
            </p>
            <button className="text-green-600 hover:text-green-800 font-medium">
              Acessar Clientes →
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Integração WhatsApp</h2>
            <p className="text-gray-600 mb-4">
              Envie mensagens automaticamente para seus leads e clientes via WhatsApp.
            </p>
            <button className="text-green-600 hover:text-green-800 font-medium">
              Configurar Integração →
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Estatísticas do CRM</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-gray-900">128</p>
              <p className="text-gray-600">Leads Total</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">42</p>
              <p className="text-gray-600">Leads Novos</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">28</p>
              <p className="text-gray-600">Leads Convertidos</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">22%</p>
              <p className="text-gray-600">Taxa Conversão</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}