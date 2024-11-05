import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { ServiceOrder } from '../../types';

interface PendingServicesProps {
  services: ServiceOrder[];
  onStartService: (service: ServiceOrder) => void;
}

export default function PendingServices({ services, onStartService }: PendingServicesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Servicios Pendientes</h2>
        <Clock className="w-5 h-5 text-blue-600" />
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
                onClick={() => onStartService(service)}
                className="btn btn-primary flex items-center text-sm"
              >
                Iniciar
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No hay servicios pendientes
          </p>
        )}
      </div>
    </div>
  );
}