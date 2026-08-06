import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Navbar from "./common/components/Navbar";
import Login from "./loginAuth/Login";
import Categories from "./category/categories";
import Products from "./products/Products";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;