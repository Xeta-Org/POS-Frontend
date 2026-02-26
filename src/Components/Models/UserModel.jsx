import {Shield, Mail, Key, X, CheckCircle, AlertCircle, MoreVertical, Eye, EyeOff, Users} from 'lucide-react';
const UserModel = ({setIsModalOpen, currentUser, handleSaveUser, showPassword, setShowPassword}) => {
    return(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <h2 className="text-2xl font-black text-slate-800">{currentUser ? 'Update User' : 'New User'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
            </div>

            <form onSubmit={handleSaveUser} className="p-8 space-y-5">
              <div className='flex justify-between gap-4'>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input required name="first_name" defaultValue={currentUser?.first_name} className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="e.g. John" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input required name="last_name" defaultValue={currentUser?.last_name} className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="e.g. Doe" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required type="text" name="username" defaultValue={currentUser?.username} className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="john_doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
                  <select name="role" defaultValue={currentUser?.role || 'Cashier'} className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold appearance-none">
                    <option value="Admin">Admin</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                  <select name="status" defaultValue={currentUser?.status || 'Active'} className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold appearance-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required={!currentUser} type={showPassword ? "text" : "password"} name="password" className="w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95">
                  {currentUser ? 'Update Account' : 'Confirm & Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default UserModel;