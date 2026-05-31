import React from 'react'

const InputField = ({ children, label, register, name, currentUser, error, placeholder }) => {
  return (
      <>
        <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{ label }</label>
            <div className="relative">
                  { children }
            <input { ...register(name) } name={name} defaultValue={currentUser?.[name]} className={`w-full bg-slate-50 border-none rounded-2xl p-4 pl-12 outline-none focus:ring-2 ${error ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'} font-bold`} placeholder={placeholder} />
        </div>
        { error && <p className="text-red-500 text-sm mt-1">{error?.message}</p> }
        </div>
      </>
  )
}

export default InputField