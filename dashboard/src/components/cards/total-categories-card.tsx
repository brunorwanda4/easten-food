import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const TotalCategoriesCard = () => {
  return (
    <div className=" card bg-base-100 p-4 w-80 shadow border border-base-content/20 space-y-3">
      <div className=" flex justify-between items-center">
        <h3 className=" font-medium text-lg">Categories</h3>
        <div className="">
          <BiCategory size={24} className=" text-secondary" />
        </div>
      </div>
      <div className=" flex items-center space-x-4">
        <span className=" font-semibold text-4xl">7</span>
        <NavLink className={" btn btn-sm btn-secondary"} to={"/dashboard/categories"}>
          View all
        </NavLink>
      </div>
    </div>
  );
};

export default TotalCategoriesCard;
