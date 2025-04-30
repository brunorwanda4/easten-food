import { FiAlignJustify } from "react-icons/fi";
import { Categories } from "../../utils/categories";
import { Link } from "react-router-dom";

const CategoriesToggle = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 rounded-full"
      >
        <FiAlignJustify size={20} /> Categories
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content dropdown-center menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {Categories.map((item, index) => {
          return (
            <li key={index}>
              <Link to={`/products?category=${item.name}`} className=" flex space-x-1">
                <div className="avatar">
                  <div className="w-8 rounded">
                    <img
                      src={item.image}
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  </div>
                </div>
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesToggle;
