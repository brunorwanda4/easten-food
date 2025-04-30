import { useState } from "react";
import { Link } from "react-router-dom";
import CategoriesToggle from "./categories-toggle";
import AppLogo from "./logo";
import NavCard from "./nav-card";
import SearchInput from "./search-input";
import {
  PiShoppingBagOpenFill,
  PiShoppingCart,
  PiListBold,
  PiXBold,
} from "react-icons/pi";

const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="px-4 py-2 border-b border-b-zinc-300 fixed max-h-16 bg-white z-50 w-full flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <AppLogo noName />
        <div className="hidden lg:flex items-center space-x-4">
          <CategoriesToggle />
          <Link to="/products" className="flex items-center space-x-1">
            <PiShoppingBagOpenFill size={24} />
            <span>All Products</span>
          </Link>
          <Link
            to="/card"
            className="btn btn-ghost grayscale flex items-center space-x-1"
          >
            <PiShoppingCart size={24} />
            <span>Cart</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <SearchInput />
        <NavCard />
      </div>

      <div className="flex md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 focus:outline-none"
        >
          {menuOpen ? <PiXBold size={24} /> : <PiListBold size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 z-50 w-full bg-white border-t border-zinc-300 flex flex-col space-y-4 px-4 py-4 md:hidden">
          <SearchInput />
          <CategoriesToggle />
          <Link to="/products" className="flex items-center space-x-2">
            <PiShoppingBagOpenFill size={20} />
            <span>All Products</span>
          </Link>
          <Link to="/card" className="flex items-center space-x-2">
            <PiShoppingCart size={20} />
            <span>Cart</span>
          </Link>
          <NavCard />
        </div>
      )}
    </nav>
  );
};

export default MainNav;
