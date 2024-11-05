import React from 'react';
import { Customer } from '../../types';
import Modal from '../common/Modal';
import { Send, Users } from 'lucide-react';

interface CreatePromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, customers: Customer[]) => void;
}

export default function CreatePromotionModal({
  isOpen,
  onClose,
  onSend
}: CreatePromotionModalProps) {
  const [message, setMessage] = React.useState('');
  const [selectedCustomers, setSelectedCustomers] = React.useState<Customer[]>([]);

  // Simulated customers data - replace with actual data
  const eligibleCustomers = React.useMemo(() => {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    return [
      {
        id: '1',
        name: 'Juan Pérez',
        phone: '+54911234567',
        lastServiceDate: '2023-12-15',
        vehicle: {
          brand: 'Toyota',
          model: 'Corolla',
          year: '2020',
          licensePlate: 'ABC123'
        }
      },
      // Add more customers as needed
    ].filter(customer => new Date(customer.lastServiceDate) <= ninetyDaysAgo);
  }, []);

  const handleSend = () => {
    onSend(message, selectedCustomers);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Promoción"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje de la Promoción
          </label>
          <textarea
            className="input min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriba su mensaje aquí..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Clientes Elegibles
            </label>
            <span className="text-sm text-gray-500">
              {selectedCustomers.length} seleccionados
            </span>
          </div>
          
          <div className="border rounded-lg divide-y max-h-[300px] overflow-y-auto">
            {eligibleCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-gray-600">
                    Último service: {new Date(customer.lastServiceDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {customer.vehicle.brand} {customer.vehicle.model} ({customer.vehicle.licensePlate})
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedCustomers.some(c => c.id === customer.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCustomers([...selectedCustomers, customer]);
                    } else {
                      setSelectedCustomers(selectedCustomers.filter(c => c.id !== customer.id));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            className="btn btn-primary flex items-center"
            disabled={!message || selectedCustomers.length === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar a {selectedCustomers.length} clientes
          </button>
        </div>
      </div>
    </Modal>
  );
}