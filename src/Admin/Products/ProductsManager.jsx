import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import Backend from '../../Api/Backend.jsx';
import {FadeLoader} from 'react-spinners';
import ProductModel from '../../Components/Models/ProductModel.jsx';
import ProductsTable from '../../Components/Tables/ProductsTable.jsx';

const ProductManager = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && barcodeRef.current) {
      setTimeout(() => barcodeRef.current.focus(), 100);
    }
  }, [isModalOpen]);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async() => {
    try{
      const response = await Backend.get('/products');
      console.log(response.data);
      
      setProducts(response.data);
      setLoading(false);
    }catch(error){
      toast.error('Failed to fetch products.');
    }
  }

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async(barcode) => {
    try{
      const response = await Backend.delete(`/product/${barcode}`);
      toast.success(response?.data?.message || 'Product deleted successfully!');
      fetchProducts();
    }catch(error){
      toast.error(error?.response?.data?.message || 'Failed to delete product.');
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

    try{
        if(currentProduct){
          const updateResponse = await Backend.put(`/product/${currentProduct.barcode}`, productData);
          toast.success(updateResponse?.data?.message || 'Product updated successfully!');
          setIsModalOpen(false);
          fetchProducts();
        }else{
          const addProductResponse = await Backend.post('/products', productData);
          toast.success(addProductResponse?.data?.message || 'Product added successfully!');
          setIsModalOpen(false);
          fetchProducts();
        }
    }catch(error){
        toast.error(error?.response?.data?.message || 'Failed to add product.');
    }
    
  };

  const filteredProducts = !loading && products.filter(p => 
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.barcode.includes(searchTerm)
  );

  return (<>
    {loading ? (<div className='flex justify-center items-center h-screen'>
      <FadeLoader color="#06a1ee"/>
    </div>) : (
      <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inventory</h1>
            <p className="text-slate-500 font-medium">Real-time stock management and control.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                <p className="text-[10px] uppercase font-bold text-orange-600">Low Stock</p>
                <p className="text-xl font-bold text-orange-700">{products.filter(p => p.quantity > 0 && p.quantity <= p.minimum_stock).length}</p>
             </div>
             <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                <p className="text-[10px] uppercase font-bold text-red-600">Out of Stock</p>
                <p className="text-xl font-bold text-red-700">{products.filter(p => p.quantity === 0).length}</p>
             </div>
          </div>
        </div>

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

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <ProductsTable filteredProducts={filteredProducts} handleDelete={handleDelete} handleOpenModal={handleOpenModal}/>
        </div>
      </div>

      {isModalOpen && (<ProductModel 
        currentProduct={currentProduct} 
        setIsModalOpen={setIsModalOpen} 
        handleSave={handleSave} 
        barcodeRef={barcodeRef}
      />)}
    </div>
    )}
    </>
  );
};

export default ProductManager;