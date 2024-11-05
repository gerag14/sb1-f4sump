import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Book, 
  Users, 
  Star, 
  GraduationCap, 
  Search, 
  DollarSign, 
  Car, 
  ShoppingBag, 
  Megaphone, 
  MessageCircle,
  Clock,
  BarChart2 
} from 'lucide-react';
import Modal from './common/Modal';
import ServiceForm from './sales/ServiceForm';
import ProductSale from './sales/ProductSale';
import CashRegisterStatus from './cash/CashRegisterStatus';
import CreatePromotionModal from './promotions/CreatePromotionModal';
import PendingServices from './services/PendingServices';
import ActiveServices from './services/ActiveServices';
import { CashRegister, ServiceOrder } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showServiceModal, setShowServiceModal] = React.useState(false);
  const [showProductModal, setShowProductModal] = React.useState(false);
  const [showPromotionModal, setShowPromotionModal] = React.useState(false);
  const [cashRegister, setCashRegister] = React.useState<CashRegister>({
    id: '1',
    status: 'open',
    openedAt: new Date().toISOString(),
    initialAmount: 10000,
    currentAmount: 10000,
    transactions: []
  });
  const [pendingServices, setPendingServices] = React.useState<ServiceOrder[]>([]);
  const [activeServices, setActiveServices] = React.useState<ServiceOrder[]>([]);

  const searchResults = React.useMemo(() => {
    if (!searchTerm) return [];
    
    return [
      { id: '1', type: 'customer', title: 'Juan Pérez', subtitle: 'Cliente #123' },
      { id: '2', type: 'vehicle', title: 'Toyota Corolla', subtitle: 'ABC123' },
      { id: '3', type: 'service', title: 'Cambio de Aceite', subtitle: '#456' }
    ].filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleNewOperation = (type: 'service' | 'product' | 'promotion' | 'support') => {
    switch (type) {
      case 'service':
        setShowServiceModal(true);
        break;
      case 'product':
        setShowProductModal(true);
        break;
      case 'promotion':
        setShowPromotionModal(true);
        break;
      case 'support':
        // Handle support action
        break;
    }
  };

  const handleOpenRegister = (initialAmount: number) => {
    setCashRegister({
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      openedAt: new Date().toISOString(),
      initialAmount,
      currentAmount: initialAmount,
      transactions: []
    });
  };

  const handleCloseRegister = () => {
    if (cashRegister) {
      setCashRegister({
        ...cashRegister,
        status: 'closed',
        closedAt: new Date().toISOString()
      });
    }
  };

  const handleServiceCreated = (service: ServiceOrder) => {
    setPendingServices([...pendingServices, service]);
    setShowServiceModal(false);
  };

  const handleStartService = (service: ServiceOrder) => {
    setPendingServices(pendingServices.filter(s => s.id !== service.id));
    setActiveServices([...activeServices, { ...service, status: 'in_progress' }]);
  };

  const handleCompleteService = (service: ServiceOrder) => {
    setActiveServices(activeServices.filter(s => s.id !== service.id));
    // Here you would typically handle billing
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Operaciones Rápidas</h2>
          <div className="flex items-center space-x-4">
            {/* Smart Search */}
            <div className="relative flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar clientes, vehículos, servicios..."
                  className="pl-10 pr-4 py-2 w-[400px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {searchTerm && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        setSearchTerm('');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      <p className="font-medium">{result.title}</p>
                      <p className="text-sm text-gray-600">{result.subtitle}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleNewOperation('support')}
              className="btn btn-secondary flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Soporte
            </button>
            <button
              onClick={() => handleNewOperation('promotion')}
              className="btn btn-secondary flex items-center"
            >
              <Megaphone className="w-4 h-4 mr-2" />
              Crear Promoción
            </button>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <CashRegisterStatus
              cashRegister={cashRegister}
              onOpenRegister={handleOpenRegister}
              onCloseRegister={handleCloseRegister}
            />
          </div>
          <button
            onClick={() => navigate('/training')}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">Capacitación</p>
                <p className="text-sm text-gray-600 mt-1">Centro de aprendizaje</p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </button>
          <button
            onClick={() => handleNewOperation('product')}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">Nueva Venta</p>
                <p className="text-sm text-gray-600 mt-1">Registrar venta de productos</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </button>
          <button
            onClick={() => handleNewOperation('service')}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">Nuevo Servicio</p>
                <p className="text-sm text-gray-600 mt-1">Iniciar orden de servicio</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </button>
        </div>

        {/* Service Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Servicios Pendientes', value: pendingServices.length.toString(), icon: Clock },
            { title: 'Servicios en Proceso', value: activeServices.length.toString(), icon: Car },
            { title: 'Técnicos Disponibles', value: '4', icon: Users },
            { title: 'Ventas del Día', value: '$45,600', icon: DollarSign }
          ].map((stat) => (
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
                <div className="p-3 rounded-full bg-blue-50">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PendingServices
            services={pendingServices}
            onStartService={handleStartService}
          />
          <ActiveServices
            services={activeServices}
            onCompleteService={handleCompleteService}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        title="Nuevo Servicio"
      >
        <ServiceForm
          onServiceCreated={handleServiceCreated}
          onClose={() => setShowServiceModal(false)}
        />
      </Modal>

      <Modal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        title="Nueva Venta"
      >
        <ProductSale />
      </Modal>

      <CreatePromotionModal
        isOpen={showPromotionModal}
        onClose={() => setShowPromotionModal(false)}
        onSend={(message, customers) => {
          console.log('Sending promotion:', { message, customers });
          setShowPromotionModal(false);
        }}
      />
    </div>
  );
}