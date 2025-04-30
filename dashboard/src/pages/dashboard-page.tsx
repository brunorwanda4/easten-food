import TotalCategoriesCard from "../components/cards/total-categories-card";
import TotalProductCard from "../components/cards/total-product-card";
import TotalUsersCard from "../components/cards/total-user-card";

const DashboardPage = () => {
  return (
    <div className=" w-full">
      <div className=" flex space-x-4">
        <TotalProductCard />
        <TotalCategoriesCard />
        <TotalUsersCard />
      </div>
    </div>
  );
};

export default DashboardPage;
