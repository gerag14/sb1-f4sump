import React from 'react';
import { Product, Customer, Service } from '../../types';
import { ShoppingCart, Trash2, Search, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';

// Mock services data - replace with actual data
const services = [
  {
    id: 'srv1',
    code: 'SRV-001',
    name: 'Cambio de Aceite Básico',
    type: 'service',
    price: 15000,
    supplier: 'Lubricentro',
    category: 'Servicio'
  },
  {
    id: 'srv2',
    code: 'SRV-002',
    name: 'Cambio de Aceite Premium',
    type: 'service',
    price: 25000,
    supplier: 'Lubricentro',
    category: 'Servicio'
  }
];

// Combine products and services for the table
const items = [
  ...products.map(p => ({
    ...p,
    code: `PRD-${p.id}`,
    category: p.type === 'oil' ? 'Aceite' : 
             p.type === 'oilFilter' ? 'Filtro de Aceite' : 
             'Otro',
    supplier: p.brand,
    type: 'product'
  })),
  ...services
];

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    phone: '+54911234567',
    lastServiceDate: '2024-02-15',
    vehicle: {
      brand: 'Toyota',
      model: 'Corolla',
      year: '2020',
      licensePlate: 'ABC123'
    }
  }
];

export default function ProductSale() {
  const [step, setStep] = React.useState<'products' | 'checkout'>('products');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cart, setCart] = React.useState<{
    itemId: string;
    quantity: number;
    listPrice: number;
    finalPrice: number;
    type: 'product' | 'service';
  }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<'cash' | 'card' | 'transfer'>('cash');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: typeof items[0]) => {
    const existing = cart.find(cartItem => cartItem.itemId === item.id);
    if (existing) {
      setCart(cart.map(cartItem =>
        cartItem.itemId === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { 
        itemId: item.id, 
        quantity: 1,
        listPrice: item.price,
        finalPrice: item.price,
        type: item.type
      }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.itemId === itemId
        ? { ...item, quantity }
        : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const listTotal = cart.reduce((sum, item) => sum + item.listPrice * item.quantity, 0);
  const discount = listTotal - total;

  const handleContinue = () => {
    if (cart.length > 0) {
      setStep('checkout');
    }
  };

  const handleFinish = () => {
    if (!selectedCustomer) return;

    const sale = {
      items: cart,
      customer: selectedCustomer,
      total,
      listTotal,
      discount,
      paymentMethod,
      date: new Date().toISOString()
    };

    console.log('Completing sale:', sale);
    // Here you would typically make an API call to save the sale
  };

  if (step === 'checkout') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Seleccionar Cliente</h3>
          <div className="space-y-2">
            {MOCK_CUSTOMERS.map(customer => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left p-4 rounded-lg border transition-colors
                  ${selectedCustomer?.id === customer.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'}`}
              >
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-gray-600">
                  {customer.vehicle.brand} {customer.vehicle.model} ({customer.vehicle.licensePlate})
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Método de Pago</h3>
          <div className="grid grid-cols-3 gap-4">
            {(['cash', 'card', 'transfer'] as const).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`p-4 rounded-lg border text-center transition-colors
                  ${paymentMethod === method 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'}`}
              >
                {method === 'cash' ? 'Efectivo' : 
                 method === 'card' ? 'Tarjeta' : 'Transferencia'}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span>${listTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Descuento:</span>
              <span className="text-green-600">-${discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep('products')}
              className="btn btn-secondary"
            >
              Volver
            </button>
            <button
              onClick={handleFinish}
              disabled={!selectedCustomer}
              className="btn btn-primary"
            >
              Finalizar Venta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, nombre, categoría o proveedor..."
            className="input pl-9 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${item.type === 'service' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.type === 'product' ? item.stock : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      ${item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => addToCart(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Agregar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Carrito</h3>
            <ShoppingCart className="w-5 h-5 text-gray-400" />
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay items en el carrito
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const itemData = items.find(i => i.id === item.itemId);
                if (!itemData) return null;
                return (
                  <div key={item.itemId} className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">{itemData.name}</p>
                      <div className="text-sm">
                        <p className="text-gray-500 line-through">
                          ${item.listPrice.toLocaleString()} c/u
                        </p>
                        <p className="text-gray-900">
                          ${item.finalPrice.toLocaleString()} c/u
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.itemId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="border-t pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${listTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Descuento:</span>
                    <span className="text-green-600">-${discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={cart.length === 0}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}