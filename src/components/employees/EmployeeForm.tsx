import React from 'react';
import { Employee } from '../../types';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSave: (employee: Employee) => void;
  onClose: () => void;
}

export default function EmployeeForm({
  employee,
  onSave,
  onClose
}: EmployeeFormProps) {
  const [formData, setFormData] = React.useState<Partial<Employee>>(
    employee || {
      name: '',
      position: '',
      email: '',
      phone: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      specialties: [],
      schedule: {
        start: '08:00',
        end: '17:00'
      },
      salary: 0
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Employee);
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
            Posición
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Inicio
          </label>
          <input
            type="date"
            value={formData.startDate?.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
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
          Especialidades
        </label>
        <div className="space-y-2">
          {formData.specialties?.map((specialty, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={specialty}
                onChange={(e) => {
                  const newSpecialties = [...(formData.specialties || [])];
                  newSpecialties[index] = e.target.value;
                  setFormData({ ...formData, specialties: newSpecialties });
                }}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  const newSpecialties = formData.specialties?.filter((_, i) => i !== index);
                  setFormData({ ...formData, specialties: newSpecialties });
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
              specialties: [...(formData.specialties || []), '']
            })}
            className="btn btn-secondary w-full"
          >
            Agregar Especialidad
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horario Entrada
          </label>
          <input
            type="time"
            value={formData.schedule?.start}
            onChange={(e) => setFormData({
              ...formData,
              schedule: { ...formData.schedule!, start: e.target.value }
            })}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horario Salida
          </label>
          <input
            type="time"
            value={formData.schedule?.end}
            onChange={(e) => setFormData({
              ...formData,
              schedule: { ...formData.schedule!, end: e.target.value }
            })}
            className="input"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Salario
        </label>
        <input
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
          className="input"
          required
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