import React, { useState, useRef, useEffect } from 'react';
import { Users, UserPlus,Search, } from 'lucide-react';
import Backend from '../../Api/Backend.jsx'
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import UserModel from '../../Components/Models/UserModel.jsx';
import UserTable from '../../Components/Tables/UserTable.jsx';

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async() => {
    try{
      const getUserRespone = await Backend.get('/users');
      setUsers(getUserRespone.data);
      setLoading(false);
    }catch(error){
      toast.error('Failed to fetch users.');
    }
  }

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = Object.fromEntries(data.entries());
    
    try {
      if(currentUser){
        const userUpdateResponse = await Backend.put(`/user/${currentUser.id}`, userData);
        toast.success(userUpdateResponse?.data?.message || 'User updated successfully!');
        fetchUsers();
        setIsModalOpen(false);
      }else{
        const createUserResponse = await Backend.post('/add-user', userData);
        toast.success(createUserResponse?.data?.message || 'User created successfully!');
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create user.');
    }
  };

  const deleteUser = async (userId) => {
    try{
      const userDeleteResponse = await Backend.delete(`/user/${userId}`)
      toast.success(userDeleteResponse?.data?.message || 'User deleted successfully!');
      fetchUsers();
    }catch(error){
      toast.error('Failed to delete user.');
    }
  }

  const filteredUsers = !loading && users.filter(u => 
    u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <Users className="text-blue-600" size={32} /> User Management
            </h1>
            <p className="text-slate-500 font-medium">Manage staff accounts and system permissions.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-black font-bold shadow-xl transition-all active:scale-95"
          >
            <UserPlus size={20} /> Create New User
          </button>
        </div>

        {/* --- Search Bar --- */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users by name or username..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- Users Table --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (<div className='flex justify-center'>
            <FadeLoader color="#06a1ee" className="my-10" />
          </div>) : (<UserTable
            filteredUsers={filteredUsers}
            handleOpenModal={handleOpenModal}
            deleteUser={deleteUser}
          />)}
        </div>
      </div>

      {/* --- Create/Edit User Modal --- */}
      {isModalOpen && (<UserModel
        setIsModalOpen={setIsModalOpen}
        currentUser={currentUser}
        handleSaveUser={handleSaveUser}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      )}
    </div>
  );
};

export default UserManagement;