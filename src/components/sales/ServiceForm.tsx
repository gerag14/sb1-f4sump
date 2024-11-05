import React from 'react';
import { Vehicle, Service, ServicePackage } from '../../types';
import { savedVehicles } from '../../data/vehicles';
import { products } from '../../data/products';
import { ChevronRight, ChevronLeft, Car, Package, Wrench } from 'lucide-react';

const VEHICLE_BRANDS = ['Toyota', 'Volkswagen', 'Ford', 'Chevrolet', 'Honda', 'Fiat', 'Peugeot', 'Renault'];

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Service Completo',
    description: 'Servicio completo de mantenimiento',
    price: 25000,
    duration: 120,
    type: 'full',
    includes: [
      'Cambio de aceite y filtro',
      'Cambio de filtro de aire',
      'Cambio de filtro de habitáculo',
      'Revisión de frenos',
      'Revisión de suspensión',
      'Diagnóstico computarizado'
    ]
  },
  {
    id: '2',
    name: 'Cambio de Aceite',
    description: 'Cambio de aceite y filtro',
    price: 12000,
    duration: 45,
    type: 'oil',
    includes: [
      'Cambio de aceite',
      'Cambio de filtro de aceite',
      'Revisión de niveles'
    ]
  }
];

interface ServiceFormProps {
  onServiceCreated: (serviceOrder: any) => void;
  onClose: () => void;
}

export default function ServiceForm({ onServiceCreated, onClose }: ServiceFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [licensePlate, setLicensePlate] = React.useState('');
  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = React.useState<ServicePackage | null>(null);
  const [newVehicleData, setNewVehicleData] = React.useState<Partial<Vehicle>>({});
  const [packages, setPackages] = React.useState<ServicePackage[]>([]);

  const handleLicensePlateSearch = () => {
    const found = savedVehicles.find(v => v.licensePlate.toLowerCase() === licensePlate.toLowerCase());
    if (found) {
      setVehicle(found);
      setCurrentStep(2);
    }
  };

  const handleNewVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const completeVehicle: Vehicle = {
      licensePlate,
      brand: newVehicleData.brand || '',
      model: newVehicleData.model || '',
      year: newVehicleData.year || '',
    };
    setVehicle(completeVehicle);
    setCurrentStep(2);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    
    if (vehicle) {
      const compatibleOils = products.filter(p => 
        p.type === 'oil' && 
        (!p.compatibility || p.compatibility.includes(`${vehicle.brand} ${vehicle.model}`))
      );
      
      const compatibleFilters = products.filter(p => 
        p.type === 'oilFilter' && 
        (!p.compatibility || p.compatibility.includes(`${vehicle.brand} ${vehicle.model}`))
      );

      const generatePackage = (quality: 'economic' | 'standard' | 'premium') => {
        const oil = compatibleOils.find(o => o.quality === quality) || compatibleOils[0];
        const oilFilter = compatibleFilters.find(f => f.quality === quality) || compatibleFilters[0];
        const airFilter = products.find(p => p.type === 'airFilter' && p.quality === quality);

        return {
          type: quality,
          oil,
          oilFilter,
          airFilter,
          total: service.price + (oil?.price || 0) + (oilFilter?.price || 0) + (airFilter?.price || 0)
        };
      };

      setPackages([
        generatePackage('economic'),
        generatePackage('standard'),
        generatePackage('premium')
      ]);
    }
    
    setCurrentStep(3);
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedPackage || !vehicle) return;
    
    const newServiceOrder = {
      id: Math.random().toString(36).substr(2, 9),
      vehicle,
      service: selectedService,
      servicePackage: selectedPackage,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    onServiceCreated(newServiceOrder);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { number: 1, title: 'Vehículo', icon: Car },
          { number: 2, title: 'Servicio', icon: Wrench },
          { number: 3, title: 'Paquete', icon: Package }
        ].map((step) => (
          <div
            key={step.number}
            className={`flex items-center ${
              currentStep === step.number
                ? 'text-blue-600'
                : currentStep > step.number
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${currentStep === step.number
                ? 'border-blue-600 bg-blue-50'
                : currentStep > step.number
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300'
              }`}
            >
              <step.icon className="w-4 h-4" />
            </div>
            <span className="ml-2 text-sm font-medium">{step.title}</span>
            {step.number < 3 && (
              <ChevronRight className="w-5 h-5 mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Vehicle Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por Patente
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                className="input"
                placeholder="ABC123"
              />
              <button
                onClick={handleLicensePlateSearch}
                className="btn btn-primary"
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Nuevo Vehículo</h3>
            <form onSubmit={handleNewVehicle} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <select
                  value={newVehicleData.brand}
                  onChange={(e) => setNewVehicleData({ ...newVehicleData, brand: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Seleccionar marca</option>
                  {VEHICLE_BRANDS.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo
                </label>
                <input
                  type="text"
                  value={newVehicleData.model}
                  onChange={(e) => setNewVehicleData({ ...newVehicleData, model: e.target.value })}
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
                  value={newVehicleData.year}
                  onChange={(e) => setNewVehicleData({ ...newVehicleData, year: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Continuar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 2: Service Selection */}
      {currentStep === 2 && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Vehículo Seleccionado</h3>
            <p>{vehicle?.brand} {vehicle?.model} ({vehicle?.year})</p>
            <p className="text-sm text-gray-600">Patente: {vehicle?.licensePlate}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="text-left p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <ul className="mt-2 space-y-1">
                      {service.includes.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${service.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{service.duration} min</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Package Selection */}
      {currentStep === 3 && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Servicio Seleccionado</h3>
            <p>{selectedService?.name}</p>
            <p className="text-sm text-gray-600">
              {vehicle?.brand} {vehicle?.model} ({vehicle?.licensePlate})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <button
                key={pkg.type}
                onClick={() => setSelectedPackage(pkg)}
                className={`text-left p-4 border rounded-lg transition-colors ${
                  selectedPackage?.type === pkg.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <h3 className="font-medium capitalize mb-2">{pkg.type}</h3>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">
                    • {pkg.oil?.name}
                  </li>
                  <li className="text-sm">
                    • {pkg.oilFilter?.name}
                  </li>
                  {pkg.airFilter && (
                    <li className="text-sm">
                      • {pkg.airFilter.name}
                    </li>
                  )}
                </ul>
                <p className="font-medium text-lg">
                  ${pkg.total.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="btn btn-secondary flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
            disabled={!selectedPackage}
          >
            Confirmar Servicio
          </button>
        )}
      </div>
    </div>
  );
}