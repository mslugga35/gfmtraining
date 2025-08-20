'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'GFMTF Training Jersey',
    description: 'Official team training jersey with moisture-wicking fabric',
    price: 45.99,
    category: 'Apparel',
    imageUrls: ['/api/placeholder/300/300'],
    inventory: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Navy', 'White'],
    isActive: true,
    sales: 45,
    revenue: 2069.55
  },
  {
    id: '2',
    name: 'Baseball Cap - GFMTF Logo',
    description: 'Adjustable baseball cap with embroidered GFMTF logo',
    price: 24.99,
    category: 'Accessories',
    imageUrls: ['/api/placeholder/300/300'],
    inventory: 50,
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'Red'],
    isActive: true,
    sales: 78,
    revenue: 1949.22
  },
  {
    id: '3',
    name: 'Training Gloves',
    description: 'Professional-grade batting gloves for training',
    price: 35.99,
    category: 'Equipment',
    imageUrls: ['/api/placeholder/300/300'],
    inventory: 12,
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White'],
    isActive: true,
    sales: 23,
    revenue: 827.77
  },
  {
    id: '4',
    name: 'Water Bottle - GFMTF',
    description: '32oz insulated water bottle with team logo',
    price: 18.99,
    category: 'Accessories',
    imageUrls: ['/api/placeholder/300/300'],
    inventory: 35,
    sizes: ['32oz'],
    colors: ['Black', 'Blue'],
    isActive: true,
    sales: 67,
    revenue: 1272.33
  },
];

interface NewProductForm {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  sizes: string[];
  colors: string[];
}

export default function ShopPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState<NewProductForm>({
    name: '',
    description: '',
    price: 0,
    category: 'Apparel',
    inventory: 0,
    sizes: [],
    colors: [],
  });

  const totalRevenue = mockProducts.reduce((sum, product) => sum + product.revenue, 0);
  const totalSales = mockProducts.reduce((sum, product) => sum + product.sales, 0);
  const totalInventory = mockProducts.reduce((sum, product) => sum + product.inventory, 0);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating product:', formData);
    setShowCreateModal(false);
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'Apparel',
      inventory: 0,
      sizes: [],
      colors: [],
    });
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const toggleProductStatus = (productId: string) => {
    console.log('Toggling product status:', productId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Shop Management</h1>
          <p className="text-gray-400 mt-1">
            Manage merchandise inventory and sales
          </p>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-white">{totalSales}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Products</p>
              <p className="text-2xl font-bold text-white">{mockProducts.length}</p>
            </div>
            <Package className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Inventory</p>
              <p className="text-2xl font-bold text-white">{totalInventory}</p>
            </div>
            <Package className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3">
            <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
              <option value="equipment">Equipment</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
            {/* Product Image */}
            <div className="aspect-square bg-gray-700 flex items-center justify-center">
              <Package className="h-16 w-16 text-gray-500" />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold text-sm line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  <button 
                    onClick={() => handleViewDetails(product)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-xs mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-white">${product.price}</span>
                <span className="text-xs text-gray-400">{product.category}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Inventory:</span>
                  <span className={`font-medium ${product.inventory < 10 ? 'text-red-400' : 'text-white'}`}>
                    {product.inventory}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Sales:</span>
                  <span className="text-white font-medium">{product.sales}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-green-400 font-medium">${product.revenue.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                  )}
                </div>
                
                <button
                  onClick={() => toggleProductStatus(product.id)}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    product.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Add New Product</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Inventory *
                  </label>
                  <input
                    type="number"
                    value={formData.inventory}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Available Sizes (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="S, M, L, XL"
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Available Colors (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Black, White, Red"
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    colors: e.target.value.split(',').map(c => c.trim()).filter(c => c) 
                  }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{selectedProduct.name}</h3>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-500" />
              </div>

              <p className="text-gray-300">{selectedProduct.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white ml-2 font-medium">${selectedProduct.price}</span>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white ml-2">{selectedProduct.category}</span>
                </div>
                <div>
                  <span className="text-gray-400">Inventory:</span>
                  <span className="text-white ml-2">{selectedProduct.inventory}</span>
                </div>
                <div>
                  <span className="text-gray-400">Sales:</span>
                  <span className="text-white ml-2">{selectedProduct.sales}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Sizes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProduct.sizes.map((size: string) => (
                    <span key={size} className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Colors:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedProduct.colors.map((color: string) => (
                    <span key={color} className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Edit Product
              </button>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}