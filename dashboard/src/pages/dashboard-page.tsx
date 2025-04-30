import CategoriesCard from "../components/cards/categories-card";
import TotalCategoriesCard from "../components/cards/total-categories-card";
import TotalProductCard from "../components/cards/total-product-card";
import TotalUsersCard from "../components/cards/total-user-card";
import NewProductsTables from "../components/table/new-produncts-table";

const DashboardPage = () => {
  return (
    <div className=" w-full space-y-4">
      <div className=" flex space-x-4">
        <TotalProductCard />
        <TotalCategoriesCard />
        <TotalUsersCard />
      </div>
      <div>
        <div className=" flex space-x-4">
          <CategoriesCard />
          <NewProductsTables />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
