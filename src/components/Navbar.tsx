import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Users, BarChart2, Package, Wrench, Truck, UserCircle, Settings, Bell } from 'lucide-react';

interface NavbarProps {
  currentView: 'dashboard' | 'sales' | 'products' | 'services' | 'employees' | 'suppliers' | 'customers' | 'settings' | 'training';
  onNavigate: (view: 'dashboard' | 'sales' | 'products' | 'services' | 'employees' | 'suppliers' | 'customers' | 'settings' | 'training') => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Ventas', icon: ShoppingCart, view: 'sales' as const, path: '/sales' },
    { name: 'Servicios', icon: Wrench, view: 'services' as const, path: '/services' },
    { name: 'Productos', icon: Package, view: 'products' as const, path: '/products' },
    { name: 'Empleados', icon: Users, view: 'employees' as const, path: '/employees' },
    { name: 'Proveedores', icon: Truck, view: 'suppliers' as const, path: '/suppliers' },
    { name: 'Clientes', icon: UserCircle, view: 'customers' as const, path: '/customers' },
  ];

  const handleNavigation = (item: typeof menuItems[0]) => {
    onNavigate(item.view);
    navigate(item.path);
    setIsOpen(false);
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Nuevo curso disponible', message: 'Curso de cambio de aceite avanzado' },
    { id: 2, title: 'Recordatorio', message: 'Reunión de equipo mañana' },
  ];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => {
                navigate('/');
                onNavigate('dashboard');
              }} 
              className="flex items-center space-x-2 text-xl font-bold hover:text-blue-100"
            >
              <BarChart2 className="w-6 h-6" />
              <span>LubriCenter</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${currentView === item.view 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-blue-600" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 text-gray-800 z-50">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  onNavigate('settings');
                  navigate('/settings');
                }}
                className={`p-2 rounded-md hover:bg-blue-700 focus:outline-none
                  ${currentView === 'settings' ? 'bg-blue-700' : ''}`}
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                onNavigate('settings');
                navigate('/settings');
              }}
              className={`p-2 rounded-md hover:bg-blue-700 focus:outline-none mr-2
                ${currentView === 'settings' ? 'bg-blue-700' : ''}`}
            >
              <Settings className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium w-full text-left
                  ${currentView === item.view 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}