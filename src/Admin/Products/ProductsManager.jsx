import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, Edit, Trash2, Package, AlertCircle, 
  Barcode, DollarSign, Filter, MoreVertical, ArrowUpDown, X, Layers 
} from 'lucide-react';
import toast from 'react-hot-toast';
import Backend from '../../Api/Backend.jsx';

const ProductManager = () => {
  // --- 1. Data State ---
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Coffee Beans', sku: '8801234567', price: 18.50, stock: 45, minStock: 10 },
    { id: 2, name: 'Organic Green Tea', sku: '8809876543', price: 12.00, stock: 4, minStock: 8 },
    { id: 3, name: 'Dark Chocolate 70%', sku: '8805544332', price: 5.50, stock: 0, minStock: 5 },
  ]);

  // --- 2. UI State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // null = add, object = edit
  const barcodeRef = useRef(null);

  // Auto-focus barcode field when modal opens
  useEffect(() => {
    if (isModalOpen && barcodeRef.current) {
      setTimeout(() => barcodeRef.current.focus(), 100);
    }
  }, [isModalOpen]);

  // --- 3. Handlers ---
  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
        "barcode": formData.get('sku'),
        "product_name": formData.get('name'),
        "cost_price": parseFloat(formData.get('costPrice')) * 0.7,
        "selling_price": parseFloat(formData.get('sellingPrice')),
        "quantity": parseInt(formData.get('stock')),
        "minimum_stock": parseInt(formData.get('minStock')),
    }
    console.log(productData);
    

    try{
        const addProductResponse = await Backend.post('/products', productData);
        toast.success(addProductResponse?.data?.message || 'Product added successfully!');
        setIsModalOpen(false);
    }catch(error){
        console.log(error);
        
        toast.error(error?.response?.data?.message || 'Failed to add product.');
    }
    
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      
      {/* --- HEADER & STATS --- */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inventory</h1>
            <p className="text-slate-500 font-medium">Real-time stock management and control.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                <p className="text-[10px] uppercase font-bold text-orange-600">Low Stock</p>
                <p className="text-xl font-bold text-orange-700">{products.filter(p => p.stock > 0 && p.stock <= p.minStock).length}</p>
             </div>
             <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                <p className="text-[10px] uppercase font-bold text-red-600">Out of Stock</p>
                <p className="text-xl font-bold text-red-700">{products.filter(p => p.stock === 0).length}</p>
             </div>
          </div>
        </div>

        {/* --- ACTION BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search products or scan..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={20} /> Add New Product
          </button>
        </div>

        {/* --- MAIN TABLE VIEW --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Product</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Barcode</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Price</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Inventory Level</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-700">{product.name}</td>
                    <td className="px-8 py-5">
                      <span className="font-mono text-sm bg-slate-100 px-3 py-1 rounded-lg text-slate-500 border border-slate-200">
                        {product.sku}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">${product.price.toFixed(2)}</td>
                    <td className="px-8 py-5">
                      {product.stock === 0 ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-600 italic">Out of Stock</span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${product.stock <= product.minStock ? 'bg-orange-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-bold ${product.stock <= product.minStock ? 'text-orange-600' : 'text-emerald-600'}`}>
                            {product.stock}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- ATTRACTIVE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-8 pb-4">
              <h2 className="text-2xl font-black text-slate-800">{currentProduct ? 'Edit Item' : 'Add Item'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 pt-4 space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Barcode / SKU</label>
                  <div className="relative">
                    <Barcode className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={20}/>
                    <input ref={barcodeRef} required name="sku" defaultValue={currentProduct?.sku} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-mono" placeholder="Scan now..." />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Product Name</label>
                  <input required name="name" defaultValue={currentProduct?.name} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold" placeholder="e.g. Fresh Milk 1L" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Cost Price (RS)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" step="0.01" name="costPrice" defaultValue={currentProduct?.price} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Selling Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" step="0.01" name="sellingPrice" defaultValue={currentProduct?.price} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                  </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Stock Qty</label>
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" name="stock" defaultValue={currentProduct?.stock || 0} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                </div>

                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-orange-500" size={20}/>
                    <span className="text-xs font-bold text-orange-700">Minimum Stock Alert</span>
                  </div>
                  <input required type="number" name="minStock" defaultValue={currentProduct?.minStock || 5} className="w-16 bg-white border border-orange-200 rounded-lg p-2 text-center font-bold text-orange-700 outline-none" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Discard</button>
                <button type="submit" className="flex-[2] bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95">
                  {currentProduct ? 'Save Changes' : 'Confirm & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;