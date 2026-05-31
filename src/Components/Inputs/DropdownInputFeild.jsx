import React from 'react'

const DropdownInputFeild = ({ register, label, name, items, currentUser, error }) => {
    return (
        <>
            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
                <select { ...register(name) } name={name} defaultValue={currentUser?.name || name} className={`w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 ${error ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'} font-bold appearance-none`}>
                    {items.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                 { error && <p className="text-red-500 text-sm mt-1">{error?.message}</p> }
            </div>
        </>
    )
}

export default DropdownInputFeild