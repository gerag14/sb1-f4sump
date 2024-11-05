import React from 'react';
import Modal from './Modal';
import { Search } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'customer' | 'vehicle' | 'service' | 'product';
  title: string;
  subtitle: string;
}

export default function SearchModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Mock search results
  const results: SearchResult[] = searchTerm ? [
    {
      id: '1',
      type: 'customer',
      title: 'Juan Pérez',
      subtitle: 'Cliente #123'
    },
    {
      id: '2',
      type: 'vehicle',
      title: 'Toyota Corolla',
      subtitle: 'Patente: ABC123'
    },
    {
      id: '3',
      type: 'service',
      title: 'Cambio de Aceite',
      subtitle: 'Servicio #456'
    }
  ] : [];

  const handleResultClick = (result: SearchResult) => {
    // Handle navigation to the selected item
    console.log('Selected:', result);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Búsqueda Global"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
            placeholder="Buscar clientes, vehículos, servicios..."
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left p-4 hover:bg-gray-50 focus:bg-gray-50 outline-none"
            >
              <p className="font-medium">{result.title}</p>
              <p className="text-sm text-gray-600">{result.subtitle}</p>
            </button>
          ))}

          {searchTerm && results.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No se encontraron resultados
            </p>
          )}

          {!searchTerm && (
            <p className="text-center text-gray-500 py-4">
              Comienza a escribir para buscar
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}