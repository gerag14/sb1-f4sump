import React from 'react';
import { UserCircle, Plus, MessageCircle, Edit, Search } from 'lucide-react';
import { Customer } from '../../types';
import SearchInput from '../common/SearchInput';
import Modal from '../common/Modal';
import CustomerForm from './CustomerForm';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<'edit' | 'message' | null>(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [message, setMessage] = React.useState('');

  // Mock data - replace with actual data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      phone: '+54911234567',
      lastServiceDate: '2024-01-15',
      vehicle: {
        brand: 'Toyota',
        model: 'Corolla',
        year: '2020',
        licensePlate: 'ABC123'
      }
    },
    // Add more customers as needed
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewCustomer = () => {
    setSelectedCustomer(null);
    setModalType('edit');
    setShowModal(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType('edit');
    setShowModal(true);
  };

  const handleMessageCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType('message');
    setShowModal(true);
  };

  const handleSaveCustomer = (customer: Customer) => {
    // Here you would typically make an API call to save the customer
    console.log('Saving customer:', customer);
    setShowModal(false);
  };

  const handleSendMessage = () => {
    if (!selectedCustomer || !message.trim()) return;
    // Here you would typically make an API call to send the message
    console.log('Sending message to customer:', { customer: selectedCustomer, message });
    setShowModal(false);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Clientes</h2>
        <button
          onClick={handleNewCustomer}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre o patente..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Servicio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.vehicle.brand} {customer.vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500">
                      Patente: {customer.vehicle.licensePlate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.lastServiceDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleMessageCustomer(customer)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'edit' 
          ? (selectedCustomer ? 'Editar Cliente' : 'Nuevo Cliente')
          : 'Enviar Mensaje'}
      >
        {modalType === 'edit' ? (
          <CustomerForm
            customer={selectedCustomer}
            onSave={handleSaveCustomer}
            onClose={() => setShowModal(false)}
          />
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje para {selectedCustomer?.name}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input min-h-[150px]"
                placeholder="Escriba su mensaje..."
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendMessage}
                className="btn btn-primary"
                disabled={!message.trim()}
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}