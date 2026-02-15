import { Route, Routes } from "react-router"
import ProductManager from "./Admin/Products/ProductsManager"
import { Toaster } from "react-hot-toast"

const App = () => {
  return(
    <>
      <Routes>
        <Route path='/productsManager' element={<ProductManager/>}/>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App