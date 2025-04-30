import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/form/add-product-form";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import DashboardAside from "../components/dashboard-aside";
import DashboardPage from "./dashboard-page";

// Component for the main Dashboard layout
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <DashboardAside />
      <div className=" px-4 py-2">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
