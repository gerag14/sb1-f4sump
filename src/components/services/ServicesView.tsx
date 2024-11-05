import React from 'react';
import { Wrench, Clock, Users, TrendingUp, Plus, Settings } from 'lucide-react';
import { Service } from '../../types';
import Modal from '../common/Modal';
import ServiceConfigForm from './ServiceConfigForm';

export default function ServicesView() {
  const [showConfigModal, setShowConfigModal] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);

  const serviceStats = [
    {
      title: 'Servicios del Día',
      value: '12',
      change: '+3 vs ayer',
      icon: Wrench,
      changeType: 'increase' as const
    },
    {
      title: 'Tiempo Promedio',
      value: '45min',
      change: '-5min mejora',
      icon: Clock,
      changeType: 'increase' as const
    },
    {
      title: 'Técnicos Activos',
      value: '4',
      change: '2 en servicio',
      icon: Users,
      changeType: 'neutral' as const
    },
    {
      title: 'Eficiencia',
      value: '94%',
      change: '+2.5%',
      icon: TrendingUp,
      changeType: 'increase' as const
    }
  ];

  const handleNewService = () => {
    setSelectedService(null);
    setShowConfigModal(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setShowConfigModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Servicios</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleNewService}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Servicio
          </button>
          <button
            onClick={() => setShowConfigModal(true)}
            className="btn btn-secondary flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </button>
        </div>
      </div>

      {/* Service Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceStats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full 
                ${stat.changeType === 'increase' ? 'bg-green-100' : 
                  stat.changeType === 'decrease' ? 'bg-red-100' : 'bg-blue-100'}`}>
                <stat.icon className={`w-6 h-6 
                  ${stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-blue-600'}`} />
              </div>
            </div>
            <p className={`text-sm mt-2 
              ${stat.changeType === 'increase' ? 'text-green-600' : 
                stat.changeType === 'decrease' ? 'text-red-600' : 'text-blue-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Servicios Realizados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Técnico
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duración
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Add your services data here */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={selectedService ? 'Editar Servicio' : 'Nuevo Servicio'}
      >
        <ServiceConfigForm
          service={selectedService}
          onSave={(service) => {
            console.log('Saving service:', service);
            setShowConfigModal(false);
          }}
          onClose={() => setShowConfigModal(false)}
        />
      </Modal>
    </div>
  );
}