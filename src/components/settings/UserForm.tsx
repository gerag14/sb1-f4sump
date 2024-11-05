import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  branch?: string;
  status: 'active' | 'inactive';
}

export default function UserForm() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [newUser, setNewUser] = React.useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'employee',
    status: 'active'
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Math.random().toString(36).substr(2, 9) }]);
    setNewUser({ name: '', email: '', role: 'employee', status: 'active' });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usuarios del Sistema</h3>
        
        {/*Continuing with the UserForm.tsx content:

        {/* Existing Users */}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New User Form */}
      <form onSubmit={handleAddUser} className="bg-white p-4 rounded-lg border max-w-2xl">
        <h4 className="font-medium mb-4">Agregar Nuevo Usuario</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="input"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User['role'] })}
              className="input"
              required
            >
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="employee">Empleado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value as User['status'] })}
              className="input"
              required
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Usuario
          </button>
        </div>
      </form>
    </div>
  );
}