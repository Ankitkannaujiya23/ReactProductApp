import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./mainPages/Login";
import Dashboard  from "./mainPages/Dashboard";
import AddProduct from "./mainPages/AddProduct";
import ProductList from "./mainPages/ProductList";
import HomePage from "./mainPages/HomePage";
import ViewAddedProduct from "./mainPages/ViewAddedProduct";
import ProductDetails from "./mainPages/ProductDetails";
const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<AddProduct />} />
            <Route path="/productList" element={<ProductList />} />            
            <Route path="/addedProducts" element={ <ViewAddedProduct/>} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
                      
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App;