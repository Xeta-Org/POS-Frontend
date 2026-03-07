import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShoppingCart, 
  ChevronRight, 
  LayoutDashboard, 
  ShieldCheck,
  Store
} from 'lucide-react';
import toast from 'react-hot-toast';
import Backend from '../Api/Backend';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handdleLogin = async(e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const userData = {
        "username": formData.get('username'),
        "password": formData.get('password')
    }

    try{
        const res = await Backend.post('/login', userData)
        const role  = res.data.role

        if(role == "admin"){
            console.log(role);
            
        }else if(role == "Cashier"){
            navigate('/cachier')
            
        }else{
            console.log("no user");
            
        }
    }catch(error){
        toast.error("Login Faild")
    }
    
    
  }

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* --- Left Side: POS Branding & Stats --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] relative flex-col justify-between p-16">
        {/* Decorative Grid Pattern for a "Tech" feel */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-12">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <ShoppingCart size={28} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">SwiftPOS <span className="text-blue-500">Pro</span></span>
          </div>

          <h1 className="text-6xl font-black text-white leading-[1.1] mb-8">
            Fast Sales.<br />
            <span className="text-blue-500">Smart</span> Inventory.
          </h1>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md max-w-sm">
              <div className="text-blue-400 mt-1"><ShieldCheck size={20}/></div>
              <div>
                <p className="text-white font-bold text-sm">Encrypted Terminals</p>
                <p className="text-slate-400 text-xs">All transaction data is end-to-end encrypted.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="relative z-10 flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Store size={14} /> Terminal ID: #0042-XP
          </div>
          <div className="flex items-center gap-2">
            v4.2.0 Stable Build
          </div>
        </div>
      </div>

      {/* --- Right Side: Employee Login Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="w-full max-w-[420px]">
          
          <div className="mb-12">
            <div className="lg:hidden flex items-center gap-2 mb-8">
               <ShoppingCart className="text-blue-600" size={32} />
               <span className="text-xl font-black text-slate-900 uppercase">SwiftPOS</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Staff Login</h2>
            <p className="text-slate-500 font-medium">Scan your ID or enter credentials to open your shift.</p>
          </div>

          <form onSubmit={handdleLogin} className="space-y-6">
            {/* Employee ID / Username */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Employee ID/Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all" size={20} />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="w-full pl-12 pr-4 py-4.5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-800"
                />
              </div>
            </div>

            {/* Shift Access Code / Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Access Pin</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4.5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-bold text-slate-800"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Quick-Access Button */}
            <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 group transition-all active:scale-[0.98]">
              <LayoutDashboard size={20} className="group-hover:rotate-12 transition-transform" />
              Login
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
             <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
             <p className="text-[13px] font-bold text-blue-900">System Online: All payment gateways active.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;