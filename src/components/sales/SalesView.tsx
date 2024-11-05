import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  DollarSign, 
  Plus, 
  FileText,
  Calendar,
  Users,
  Search
} from 'lucide-react';
import { Sale } from '../../types';
import Modal from '../common/Modal';
import ProductSale from './ProductSale';
import ServiceForm from './ServiceForm';

export default function SalesView() {
  const [showNewSaleModal, setShowNewSaleModal] = React.useState(false);
  const [showNewServiceModal, setShowNewServiceModal] = React.useState(false);
  const [dateFilter, setDateFilter] = React.useState('today');

  const salesStats = [
    {
      title: 'Ventas del Día',
      value: '$45,600',
      change: '+12.5%',
      icon: DollarSign,
      changeType: 'increase' as const
    },
    {
      title: 'Ticket Promedio',
      value: '$8,500',
      change: '+5.2%',
      icon: TrendingUp,
      changeType: 'increase' as const
    },
    {
      title: 'Ventas Pendientes',
      value: '3',
      change: '-2 desde ayer',
      icon: Clock,
      changeType: 'decrease' as const
    }
  ];

  const recentSales: Sale[] = [];

  const handleServiceCreated = (service: any) => {
    console.log('Service created:', service);
    setShowNewServiceModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Quick Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Ventas</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowNewServiceModal(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Servicio
          </button>
          <button
            onClick={() => setShowNewSaleModal(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <FileText className="w-5 h-5 text-blue-600 mb-2" />
          <h3 className="font-medium">Reporte del Día</h3>
          <p className="text-sm text-gray-600">Resumen de operaciones</p>
        </button>
        <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <Calendar className="w-5 h-5 text-green-600 mb-2" />
          <h3 className="font-medium">Reporte Mensual</h3>
          <p className="text-sm text-gray-600">Análisis detallado</p>
        </button>
        <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <Users className="w-5 h-5 text-purple-600 mb-2" />
          <h3 className="font-medium">Top Clientes</h3>
          <p className="text-sm text-gray-600">Mejores compradores</p>
        </button>
        <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <TrendingUp className="w-5 h-5 text-orange-600 mb-2" />
          <h3 className="font-medium">Tendencias</h3>
          <p className="text-sm text-gray-600">Análisis de ventas</p>
        </button>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {salesStats.map((stat) => (
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
              <div className={`p-3 rounded-full 
                ${stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'}`}>
                <stat.icon className={`w-6 h-6 
                  ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            <p className={`text-sm mt-2 flex items-center
              ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Sales */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Últimas Ventas</h2>
            <div className="flex items-center space-x-4">
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input"
              >
                <option value="today">Hoy</option>
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar venta..."
                  className="input pl-9"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método de Pago
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.vehicle?.licensePlate}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sale.vehicle?.brand} {sale.vehicle?.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.type === 'service' ? 'Servicio' : 'Producto'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.paymentMethod === 'cash' ? 'Efectivo' :
                     sale.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    ${sale.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${sale.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {sale.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
              {recentSales.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No hay ventas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showNewSaleModal}
        onClose={() => setShowNewSaleModal(false)}
        title="Nueva Venta"
      >
        <ProductSale />
      </Modal>

      <Modal
        isOpen={showNewServiceModal}
        onClose={() => setShowNewServiceModal(false)}
        title="Nuevo Servicio"
      >
        <ServiceForm
          onServiceCreated={handleServiceCreated}
          onClose={() => setShowNewServiceModal(false)}
        />
      </Modal>
    </div>
  );
}