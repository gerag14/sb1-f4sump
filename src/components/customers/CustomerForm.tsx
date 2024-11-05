import React from 'react';
import { Customer } from '../../types';

interface CustomerFormProps {
  customer?: Customer | null;
  onSave: (customer: Customer) => void;
  onClose: () => void;
}

export default function CustomerForm({
  customer,
  onSave,
  onClose
}: CustomerFormProps) {
  const [formData, setFormData] = React.useState<Partial<Customer>>(
    customer || {
      name: '',
      phone: '',
      vehicle: {
        brand: '',
        model: '',
        year: '',
        licensePlate: ''
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Customer);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Datos del Vehículo</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <input
              type="text"
              value={formData.vehicle?.brand}
              onChange={(e) => setFormData({
                ...formData,
                vehicle: { ...formData.vehicle!, brand: e.target.value }
              })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo
            </label>
            <input
              type="text"
              value={formData.vehicle?.model}
              onChange={(e) => setFormData({
                ...formData,
                vehicle: { ...formData.vehicle!, model: e.target.value }
              })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <input
              type="text"
              value={formData.vehicle?.year}
              onChange={(e) => setFormData({
                ...formData,
                vehicle: { ...formData.vehicle!, year: e.target.value }
              })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patente
            </label>
            <input
              type="text"
              value={formData.vehicle?.licensePlate}
              onChange={(e) => setFormData({
                ...formData,
                vehicle: { ...formData.vehicle!, licensePlate: e.target.value.toUpperCase() }
              })}
              className="input"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}