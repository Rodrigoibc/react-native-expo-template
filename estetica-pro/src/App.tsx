import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/layout/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import CRM from './pages/crm/CRM';
import Agenda from './pages/agenda/Agenda';
import Financeiro from './pages/financeiro/Financeiro';
import Leads from './pages/crm/Leads';
import Servicos from './pages/servicos/Servicos';
import Colaboradores from './pages/colaboradores/Colaboradores';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Navigate to="/dashboard" />
          </PrivateRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/crm" element={
          <PrivateRoute>
            <CRM />
          </PrivateRoute>
        } />
        
        <Route path="/crm/leads" element={
          <PrivateRoute>
            <Leads />
          </PrivateRoute>
        } />
        
        <Route path="/agenda" element={
          <PrivateRoute>
            <Agenda />
          </PrivateRoute>
        } />
        
        <Route path="/financeiro" element={
          <PrivateRoute>
            <Financeiro />
          </PrivateRoute>
        } />
        
        <Route path="/servicos" element={
          <PrivateRoute>
            <Servicos />
          </PrivateRoute>
        } />
        
        <Route path="/colaboradores" element={
          <PrivateRoute>
            <Colaboradores />
          </PrivateRoute>
        } />
        
        <Route path="*" element={
          <PrivateRoute>
            <Navigate to="/dashboard" />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;