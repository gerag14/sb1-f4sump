import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/products/ProductManagement';
import ServicesView from './components/services/ServicesView';
import EmployeeManagement from './components/employees/EmployeeManagement';
import SupplierManagement from './components/suppliers/SupplierManagement';
import CustomerManagement from './components/customers/CustomerManagement';
import Settings from './components/settings/Settings';
import Training from './components/training/Training';

export default function App() {
  const [currentView, setCurrentView] = React.useState<
    'dashboard' | 'sales' | 'products' | 'services' | 
    'employees' | 'suppliers' | 'customers' | 'settings' | 'training'
  >('dashboard');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentView={currentView} onNavigate={setCurrentView} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/services" element={<ServicesView />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/training" element={<Training />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}