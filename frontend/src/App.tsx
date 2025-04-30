import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./app/Home";
import MainNav from "./components/navbar/main-nav";
import Footer from "./components/footer";
import Products from "./app/Products";
import Card from "./app/Card";
import Product from "./app/Product";

const App = () => {
  return (
    <Router>
      <MainNav />
      <div className=" pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<Card />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
