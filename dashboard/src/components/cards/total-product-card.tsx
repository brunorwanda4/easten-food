import { BsBasket2Fill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const TotalProductCard = () => {
  return (
    <div className=" card bg-base-100 p-4 w-80 shadow border border-base-content/20 space-y-3">
      <div className=" flex justify-between items-center">
        <h3 className=" font-medium text-lg">Products</h3>
        <div className="">
          <BsBasket2Fill size={24} className=" text-primary" />
        </div>
      </div>
      <div className=" flex items-center space-x-4">
        <span className=" font-semibold text-4xl">76</span>
        <NavLink className={" btn btn-sm btn-primary"} to={"/dashboard/products"}>
          View all
        </NavLink>
      </div>
    </div>
  );
};

export default TotalProductCard;
