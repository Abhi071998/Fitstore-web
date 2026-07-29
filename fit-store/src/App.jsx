import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Navbar from "./common/components/Navbar";
import Login from "./loginAuth/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;