import React from 'react';
import { Service } from '../../types';

interface ServiceConfigFormProps {
  service?: Service | null;
  onSave: (service: Service) => void;
  onClose: () => void;
}

export default function ServiceConfigForm({
  service,
  onSave,
  onClose
}: ServiceConfigFormProps) {
  const [formData, setFormData] = React.useState<Partial<Service>>(
    service || {
      name: '',
      description: '',
      price: 0,
      duration: 60,
      type: 'full',
      includes: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Service);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Servicio
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
          Descripción
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input min-h-[100px]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
            className="input"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Servicio
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Service['type'] })}
          className="input"
          required
        >
          <option value="full">Completo</option>
          <option value="oil">Cambio de Aceite</option>
          <option value="inspection">Inspección</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Incluye
        </label>
        <div className="space-y-2">
          {formData.includes?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newIncludes = [...(formData.includes || [])];
                  newIncludes[index] = e.target.value;
                  setFormData({ ...formData, includes: newIncludes });
                }}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  const newIncludes = formData.includes?.filter((_, i) => i !== index);
                  setFormData({ ...formData, includes: newIncludes });
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
              includes: [...(formData.includes || []), '']
            })}
            className="btn btn-secondary w-full"
          >
            Agregar Item
          </button>
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