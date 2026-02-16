import {Edit, Trash2} from 'lucide-react';
const ProductsTable = ({filteredProducts, handleDelete, handleOpenModal}) => {
    return(
        <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Product</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Barcode</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Cost Price</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Selling Price</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Inventory Level</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((product) => (
                  <tr key={product.barcode} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5 font-bold text-slate-700">{product.product_name}</td>
                    <td className="px-8 py-5">
                      <span className="font-mono text-sm bg-slate-100 px-3 py-1 rounded-lg text-slate-500 border border-slate-200">
                        {product.barcode}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">${Number(product.cost_price).toFixed(2)}</td>
                    <td className="px-8 py-5 font-bold text-slate-900">${Number(product.selling_price).toFixed(2)}</td>
                    <td className="px-8 py-5">
                      {product.quantity === 0 ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-600 italic">Out of Stock</span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${product.quantity <= product.minimum_stock ? 'bg-orange-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min((product.quantity / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-bold ${product.quantity <= product.minimum_stock ? 'text-orange-600' : 'text-emerald-600'}`}>
                            {product.quantity}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.barcode)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    )
}

export default ProductsTable;