import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import OrderPage from "./pages/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id/buy" element={<OrderPage />} />
        <Route path="/order/:id/confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}