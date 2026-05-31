import {Shield, Mail, Key, X, CheckCircle, AlertCircle, MoreVertical, Eye, EyeOff, Users} from 'lucide-react';
import InputField from '../Inputs/InputField';
import PasswordInputField from '../Inputs/PasswordInputField';
import DropdownInputFeild from '../Inputs/DropdownInputFeild';
const UserModel = ({ setIsModalOpen, currentUser, handleSaveUser, register, errors }) => {
    return(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <h2 className="text-2xl font-black text-slate-800">{currentUser ? 'Update User' : 'New User'}</h2>
              <button onClick={() => setIsModalOpen()} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
            </div>

            <form onSubmit={handleSaveUser} className="p-8 space-y-5">
              <div className='flex justify-between gap-4'>
                <InputField
                  label="First Name"
                  register={register}
                  name="first_name"
                  currentUser={currentUser}
                  error={errors.first_name}
                  placeholder="e.g. John"
                >
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </InputField>

                  <InputField
                    label="Last Name"
                    register={register}
                    name="last_name"
                    currentUser={currentUser}
                    error={errors.last_name}
                    placeholder="e.g. Doe"
                  >
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  </InputField>
              </div>

                <InputField
                  label="Username"
                  register={register}
                  name="username"
                  currentUser={currentUser}
                  error={errors.username}
                  placeholder="e.g. john_doe"
                >
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </InputField>

              <div className="grid grid-cols-2 gap-4">
                <DropdownInputFeild
                  label="Role"
                  register={register}
                  name="role"
                  currentUser={currentUser}
                  error={errors.role}
                  items={[
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Cashier', label: 'Cashier' },
                    { value: 'Manager', label: 'Manager' },
                  ]}
                />
                <DropdownInputFeild
                  label="Status"
                  register={register}
                  name="status"
                  currentUser={currentUser}
                  error={errors.status}
                  items={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' },
                  ]}
                />
              </div>

            <PasswordInputField
                label="Account Password"
                register={register}
                name="password"
                error={errors.password}
            >
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </PasswordInputField>

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