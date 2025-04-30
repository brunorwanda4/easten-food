import { NavLink } from "react-router-dom";
import AppLogo from "./navbar/logo";
import { BsGrid1X2Fill, BsPeople } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { MdFoodBank } from "react-icons/md";

const DashboardAside = () => {
  return (
    <aside className=" w-72 bg-base-100 border-r border-base-content/20 px-2 py-3 space-y-4">
      <AppLogo />
      <div className=" flex flex-col space-y-2">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " btn btn-ghost text-primary justify-start"
              : " btn btn-ghost justify-start"
          }
          to={"/dashboard"}
        >
          <BsGrid1X2Fill size={16} /> Dashboard
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " btn btn-ghost text-primary justify-start"
              : " btn btn-ghost justify-start"
          }
          to={"/dashboard/products"}
        >
          <MdFoodBank size={16} /> Products
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " btn btn-ghost text-secondary justify-start"
              : " btn btn-ghost justify-start"
          }
          to={"/dashboard/categories"}
        >
          <BiCategory size={16} /> categories
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " btn btn-ghost text-secondary justify-start"
              : " btn btn-ghost justify-start"
          }
          to={"/dashboard/categories"}
        >
          <BsPeople size={16} /> Users
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardAside;
