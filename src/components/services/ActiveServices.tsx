import React from 'react';
import { Timer, CheckCircle } from 'lucide-react';
import { ServiceOrder } from '../../types';

interface ActiveServicesProps {
  services: ServiceOrder[];
  onCompleteService: (service: ServiceOrder) => void;
}

export default function ActiveServices({ services, onCompleteService }: ActiveServicesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Servicios Activos</h2>
        <Timer className="w-5 h-5 text-green-600" />
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">
                  {service.vehicle.brand} {service.vehicle.model}
                </h3>
                <p className="text-sm text-gray-600">
                  Patente: {service.vehicle.licensePlate}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {service.service.name} - {service.servicePackage.type}
                </p>
              </div>
              <button
                onClick={() => onCompleteService(service)}
                className="btn btn-primary flex items-center text-sm"
              >
                Completar
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay servicios activos
          </p>
        )}
      </div>
    </div>
  );
}