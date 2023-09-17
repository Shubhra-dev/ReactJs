import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="Pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
