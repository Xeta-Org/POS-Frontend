import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';

const PasswordInputField = ({ children, label, name, register, error }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
      <>
        <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
            <div className="relative">
                  { children }
                <input { ...register(name) } type={showPassword ? "text" : "password"} name={name} className={`w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 outline-none focus:ring-2 ${error ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'} font-bold`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            { error && <p className="text-red-500 text-sm mt-1">{error?.message}</p> }
        </div>
      </>
  )
}

export default PasswordInputField