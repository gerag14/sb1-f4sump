import React from 'react';
import { Building2, Users, Settings as SettingsIcon } from 'lucide-react';
import CompanyForm from './CompanyForm';
import BranchForm from './BranchForm';
import UserForm from './UserForm';

export default function Settings() {
  const [activeTab, setActiveTab] = React.useState<'company' | 'branches' | 'users'>('company');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Configuración</h2>
        <SettingsIcon className="w-6 h-6 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center
                ${activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Datos de la Empresa
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center
                ${activeTab === 'branches'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Sucursales
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center
                ${activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <Users className="w-4 h-4 mr-2" />
              Usuarios
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' && <CompanyForm />}
          {activeTab === 'branches' && <BranchForm />}
          {activeTab === 'users' && <UserForm />}
        </div>
      </div>
    </div>
  );
}