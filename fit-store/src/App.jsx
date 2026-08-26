import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/common/components/Navbar";
import Login from "./components/loginAuth/Login";
import Categories from "./components/category/categories";
import Products from "./components/products/Products";
import PendingApprovals from "./components/orders/PendingApprovals";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="page-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId/products" element={<Products />} />
          <Route path="/orders/pending" element={<PendingApprovals />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;