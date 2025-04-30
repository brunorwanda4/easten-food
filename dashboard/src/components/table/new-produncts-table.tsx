import { NavLink } from "react-router-dom";
import Sparest from "../my-components/separest";

const NewProductsTables = () => {
  return (
    <div className="overflow-x-auto bg-base-100 shadow card w-2/3">
      <div className=" py-2 px-4 flex justify-between">
        <h2 className=" card-title">Best products</h2>
        <div className=" flex space-x-2">
          <button className=" btn btn-primary btn-sm">Add new Product</button>
          <NavLink to={"/dashboard/products"} className=" btn btn-sm">
            View all
          </NavLink>
        </div>
      </div>
      <Sparest />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewProductsTables;
