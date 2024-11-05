import React from 'react';
import { Supplier } from '../../types';

interface SupplierFormProps {
  supplier?: Supplier | null;
  onSave: (supplier: Supplier) => void;
  onClose: () => void;
}

export default function SupplierForm({
  supplier,
  onSave,
  onClose
}: SupplierFormProps) {
  const [formData, setFormData] = React.useState<Partial<Supplier>>(
    supplier || {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      products: [],
      paymentTerms: '',
      status: 'active',
      notes: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Supplier);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Empresa
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
            Persona de Contacto
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className="input"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Productos
        </label>
        <div className="space-y-2">
          {formData.products?.map((product, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={product}
                onChange={(e) => {
                  const newProducts = [...(formData.products || [])];
                  newProducts[index] = e.target.value;
                  setFormData({ ...formData, products: newProducts });
                }}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  const newProducts = formData.products?.filter((_, i) => i !== index);
                  setFormData({ ...formData, products: newProducts });
                }}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              products: [...(formData.products || []), '']
            })}
            className="btn btn-secondary w-full"
          >
            Agregar Producto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Términos de Pago
          </label>
          <input
            type="text"
            value={formData.paymentTerms}
            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            className="input"
            required
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="input min-h-[100px]"
        />
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