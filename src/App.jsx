import { Route, Routes } from "react-router"
import ProductManager from "./Admin/Products/ProductsManager"
import { Toaster } from "react-hot-toast"
import UserManagement from "./Admin/Products/UserManagement"
import LoginPage from "./Pages/LoginPage"
import CashierInterface from "./Cachier/Pages/CashierInterface"

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/productsManager' element={<ProductManager/>}/>
        <Route path='/usersManagement' element={<UserManagement/>}/>
        <Route path='/cachier' element={<CashierInterface/>}/>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App