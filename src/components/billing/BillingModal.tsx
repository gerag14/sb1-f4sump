import React from 'react';
import { ServiceOrder, Sale } from '../../types';
import Modal from '../common/Modal';
import { Plus, Minus, Tag } from 'lucide-react';
import { products } from '../../data/products';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceOrder: ServiceOrder;
  onComplete: (sale: Sale) => void;
}

export default function BillingModal({
  isOpen,
  onClose,
  serviceOrder,
  onComplete
}: BillingModalProps) {
  const [additionalProducts, setAdditionalProducts] = React.useState<{
    productId: string;
    quantity: number;
  }[]>([]);
  const [paymentMethod, setPaymentMethod] = React.useState<'cash' | 'card' | 'transfer'>('cash');
  const [discount, setDiscount] = React.useState(0);

  const baseTotal = serviceOrder.servicePackage.total;
  const additionalTotal = additionalProducts.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  const total = (baseTotal + additionalTotal) * (1 - discount / 100);

  const handleAddProduct = (productId: string) => {
    setAdditionalProducts(prev => {
      const existing = prev.find(p => p.productId === productId);
      if (existing) {
        return prev.map(p =>
          p.productId === productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const handleComplete = () => {
    const sale: Sale = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      items: [
        {
          id: Math.random().toString(36).substr(2, 9),
          serviceId: serviceOrder.service.id,
          quantity: 1,
          price: serviceOrder.service.price,
          subtotal: serviceOrder.service.price
        },
        ...additionalProducts.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          productId: item.productId,
          quantity: item.quantity,
          price: products.find(p => p.id === item.productId)?.price || 0,
          subtotal: (products.find(p => p.id === item.productId)?.price || 0) * item.quantity
        }))
      ],
      total,
      employeeId: serviceOrder.assignedEmployee?.id || '',
      type: 'service',
      vehicle: serviceOrder.vehicle,
      paymentMethod,
      discount,
      serviceOrderId: serviceOrder.id,
      status: 'completed'
    };

    onComplete(sale);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Facturación de Servicio"
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Detalle del Servicio</h3>
          <p className="text-gray-600">
            {serviceOrder.service.name} - {serviceOrder.servicePackage.type}
          </p>
          <p className="text-gray-600">
            {serviceOrder.vehicle.brand} {serviceOrder.vehicle.model} ({serviceOrder.vehicle.licensePlate})
          </p>
          <p className="font-medium mt-2">
            Subtotal: ${serviceOrder.servicePackage.total.toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">Productos Adicionales</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleAddProduct(product.id)}
                className="text-left p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <p className="text-sm font-medium">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {additionalProducts.length > 0 && (
            <div className="space-y-2">
              {additionalProducts.map((item) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex justify-between items-center">
                    <span>{product.name}</span>
                    <div className="flex items-center space-x-4">
                      <span>${(product.price * item.quantity).toLocaleString()}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setAdditionalProducts(prev =>
                            prev.map(p =>
                              p.productId === item.productId && p.quantity > 1
                                ? { ...p, quantity: p.quantity - 1 }
                                : p
                            ).filter(p => p.quantity > 0)
                          )}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleAddProduct(item.productId)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pago
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['cash', 'card', 'transfer'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-2 border rounded-lg text-sm ${
                    paymentMethod === method
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {method === 'cash' ? 'Efectivo' : method === 'card' ? 'Tarjeta' : 'Transferencia'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descuento
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="input w-24"
              />
              <Tag className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="btn btn-primary w-full"
          >
            Completar y Facturar
          </button>
        </div>
      </div>
    </Modal>
  );
}