import {Edit, Trash2} from 'lucide-react';
const UserTable = ({filteredUsers, handleOpenModal, deleteUser}) => {
    return(<>
        <table className="w-full text-left">
            <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Username</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Role</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {user.first_name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-700">{user.first_name} {user.last_name}</span>
                    </div>
                </td>
                <td className="px-8 py-5 text-slate-500 font-medium">{user.username}</td>
                <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {user.role}
                    </span>
                </td>
                <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    <span className={`text-sm font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {user.status}
                    </span>
                    </div>
                </td>
                <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(user)} className="p-2 text-slate-400 hover:text-blue-600 transition-all"><Edit size={18}/></button>
                    <button onClick={() => deleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={18}/></button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </>)
}

export default UserTable