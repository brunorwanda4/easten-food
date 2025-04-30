import { BsPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const TotalUsersCard = () => {
  return (
    <div className=" card bg-base-100 p-4 w-80 shadow border border-base-content/20 space-y-3">
      <div className=" flex justify-between items-center">
        <h3 className=" font-medium text-lg">Users</h3>
        <div className="">
          <BsPeopleFill size={24} className=" text-success" />
        </div>
      </div>
      <div className=" flex items-center space-x-4">
        <span className=" font-semibold text-4xl">4</span>
        <NavLink
          className={" btn btn-sm btn-success"}
          to={"/dashboard/categories"}
        >
          View all
        </NavLink>
      </div>
    </div>
  );
};

export default TotalUsersCard;
