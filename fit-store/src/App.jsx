import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Navbar from "./common/components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more page routes here as your app grows */}
        {/* <Route path="/categories" element={<Categories />} /> */}
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;