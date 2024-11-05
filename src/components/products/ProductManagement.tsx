import React from 'react';
import { Package, Search, Save, Plus } from 'lucide-react';
import { Product } from '../../types';
import { products } from '../../data/products';
import SearchInput from '../common/SearchInput';

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [bulkEditMode, setBulkEditMode] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<Set<string>>(new Set());
  const [bulkPriceAdjustment, setBulkPriceAdjustment] = React.useState<{
    type: 'percentage' | 'fixed';
    value: number;
  }>({ type: 'percentage', value: 0 });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (product: Product) => {
    // Here you would typically make an API call to update the product
    console.log('Saving product:', product);
    setEditingProduct(null);
  };

  const handleBulkPriceUpdate = () => {
    const updatedProducts = Array.from(selectedProducts).map(id => {
      const product = products.find(p => p.id === id);
      if (!product) return null;

      const newPrice = bulkPriceAdjustment.type === 'percentage'
        ? product.price * (1 + bulkPriceAdjustment.value / 100)
        : product.price + bulkPriceAdjustment.value;

      return {
        ...product,
        price: Math.max(0, Math.round(newPrice))
      };
    });

    // Here you would typically make an API call to update multiple products
    console.log('Updating products:', updatedProducts);
    setBulkEditMode(false);
    setSelectedProducts(new Set());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Gestión de Productos</h2>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setBulkEditMode(!bulkEditMode)}
                className={`btn ${bulkEditMode ? 'btn-primary' : 'btn-secondary'}`}
              >
                Edición Masiva
              </button>
              <button className="btn btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar por nombre, marca o tipo..."
              />
            </div>
            {bulkEditMode && selectedProducts.size > 0 && (
              <div className="flex items-center space-x-4">
                <select
                  className="input max-w-[150px]"
                  value={bulkPriceAdjustment.type}
                  onChange={(e) => setBulkPriceAdjustment(prev => ({
                    ...prev,
                    type: e.target.value as 'percentage' | 'fixed'
                  }))}
                >
                  <option value="percentage">Porcentaje</option>
                  <option value="fixed">Monto Fijo</option>
                </select>
                <input
                  type="number"
                  className="input max-w-[120px]"
                  value={bulkPriceAdjustment.value}
                  onChange={(e) => setBulkPriceAdjustment(prev => ({
                    ...prev,
                    value: Number(e.target.value)
                  }))}
                  placeholder={bulkPriceAdjustment.type === 'percentage' ? '% Ajuste' : '$ Ajuste'}
                />
                <button
                  onClick={handleBulkPriceUpdate}
                  className="btn btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Actualizar ({selectedProducts.size})
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {bulkEditMode && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedProducts.size === filteredProducts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
                        } else {
                          setSelectedProducts(new Set());
                        }
                      }}
                    />
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  {bulkEditMode && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedProducts.has(product.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedProducts);
                          if (e.target.checked) {
                            newSelected.add(product.id);
                          } else {
                            newSelected.delete(product.id);
                          }
                          setSelectedProducts(newSelected);
                        }}
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="text"
                        className="input"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          name: e.target.value
                        })}
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="text"
                        className="input"
                        value={editingProduct.brand}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          brand: e.target.value
                        })}
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{product.brand}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${product.quality === 'premium' ? 'bg-green-100 text-green-800' :
                        product.quality === 'standard' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}`}>
                      {product.quality}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="number"
                        className="input"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          stock: Number(e.target.value)
                        })}
                      />
                    ) : (
                      <div className="text-sm text-gray-500">{product.stock}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="number"
                        className="input"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value)
                        })}
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingProduct?.id === product.id ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveProduct(editingProduct)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}