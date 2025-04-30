import { NavLink } from "react-router-dom";
import Sparest from "../my-components/separest";

const CategoriesCard = () => {
    
  return (
    <div className=" card bg-base-100 border border-base-content/20 py-4 shadow w-1/3">
      <div className=" px-4 flex justify-between ">
        <h2 className=" card-title">Categories</h2>
        <div className=" flex space-x-2">
          <button className=" btn btn-secondary btn-sm">Add category</button>
          <NavLink to={"/dashboard/categories"} className=" btn btn-sm">
            View all
          </NavLink>
        </div>
      </div>
      <Sparest />
      <div className=" px-4 space-y-2">
        {[...Array(6)].map((_, i) => {
            return (
                <div key={i}>
                    category name
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default CategoriesCard;
