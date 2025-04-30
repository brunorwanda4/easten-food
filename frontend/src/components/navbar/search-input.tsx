// components/SearchInput.tsx

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { fakeProducts } from "../../data/products";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCartProducts = fakeProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
  );

  return (
    <div className="dropdown dropdown-center w-96">
      <div tabIndex={0} role="button" className="relative w-full h-12">
        <input
          type="text"
          className="border-2 border-indigo-950 h-full rounded-full w-full px-4"
          placeholder="Search everything by name or id..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute top-1 right-2 cursor-pointer hover:bg-indigo-600 duration-200 bg-red-500 size-10 rounded-full items-center flex justify-center text-white">
          <IoIosSearch size={24} />
        </div>
      </div>
      {searchTerm.trim() && (
        <ul className="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm w-full max-h-80 overflow-y-auto flex flex-row">
          {filteredCartProducts.length > 0 ? (
            filteredCartProducts.map((item) => (
              <li key={item.id} className=" w-full">
                 <Link to={`/products/${item.id}`} className=" flex space-x-1">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={item.image} />
                  </div>
                </div>
                <span>{item.name}</span>
                 </Link>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
