import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/common/components/Navbar";
import Login from "./components/loginAuth/Login";
import Categories from "./components/category/categories";
import Products from "./components/products/Products";
import PendingApprovals from "./components/orders/PendingApprovals";
import AdminConsole from "./components/adminConsole/AdminConsole";
import AdminConsoleHome from "./components/adminConsole/AdminConsoleHome";
import AboutUsSection from "./components/adminConsole/sections/AboutUsSection";
import CategoryTypesSection from "./components/adminConsole/sections/CategoryTypesSection";
import HeroSection from "./components/adminConsole/sections/HeroSection";

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
          <Route path="/admin-console" element={<AdminConsole />}>
            <Route index element={<AdminConsoleHome />} />
            <Route path="about-us" element={<AboutUsSection />} />
            <Route path="category-types" element={<CategoryTypesSection />} />
            <Route path="hero" element={<HeroSection />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;