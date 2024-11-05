import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
}

export default function BranchForm() {
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [newBranch, setNewBranch] = React.useState<Omit<Branch, 'id'>>({
    name: '',
    address: '',
    phone: '',
    manager: ''
  });

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setBranches([...branches, { ...newBranch, id: Math.random().toString(36).substr(2, 9) }]);
    setNewBranch({ name: '', address: '', phone: '', manager: '' });
  };

  const handleDeleteBranch = (id: string) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sucursales</h3>
        
        {/* Existing Branches */}
        <div className="space-y-4">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="font-medium">{branch.name}</h4>
                  <p className="text-sm text-gray-600">{branch.address}</p>
                  <p className="text-sm text-gray-600">Tel: {branch.phone}</p>
                  <p className="text-sm text-gray-600">Encargado: {branch.manager}</p>
                </div>
                <button
                  onClick={() => handleDeleteBranch(branch.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Branch Form */}
      <form onSubmit={handleAddBranch} className="bg-white p-4 rounded-lg border max-w-2xl">
        <h4 className="font-medium mb-4">Agregar Nueva Sucursal</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Sucursal
            </label>
            <input
              type="text"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={newBranch.address}
              onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
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
              value={newBranch.phone}
              onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Encargado
            </label>
            <input
              type="text"
              value={newBranch.manager}
              onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })}
              className="input"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Sucursal
          </button>
        </div>
      </form>
    </div>
  );
}