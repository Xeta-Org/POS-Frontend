import {AlertCircle, Barcode, DollarSign ,X, Layers } from 'lucide-react';
const ProductModel = ({currentProduct, setIsModalOpen, handleSave, barcodeRef}) => {
    return(
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
                    <input ref={barcodeRef} required name="sku" defaultValue={currentProduct?.barcode} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-12 outline-none transition-all font-mono" placeholder="Scan now..." />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Product Name</label>
                  <input required name="name" defaultValue={currentProduct?.product_name} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 outline-none transition-all font-bold"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Cost Price (RS)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" step="0.01" name="costPrice" defaultValue={currentProduct?.cost_price} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Selling Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" step="0.01" name="sellingPrice" defaultValue={currentProduct?.selling_price} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                  </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Stock Qty</label>
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                      <input required type="number" name="stock" defaultValue={currentProduct?.quantity || 0} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl p-4 pl-10 outline-none transition-all font-bold" />
                    </div>
                </div>

                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-orange-500" size={20}/>
                    <span className="text-xs font-bold text-orange-700">Minimum Stock Alert</span>
                  </div>
                  <input required type="number" name="minStock" defaultValue={currentProduct?.minimum_stock || 5} className="w-16 bg-white border border-orange-200 rounded-lg p-2 text-center font-bold text-orange-700 outline-none" />
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
    )
}

export default ProductModel;