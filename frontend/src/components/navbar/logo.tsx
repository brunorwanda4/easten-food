import { MyImage } from "../my-components/my-image";
import { Logo } from "../../assets/images";
import { Link } from "react-router-dom";

interface props {
  noName?: boolean;
}

const AppLogo = ({ noName }: props) => {
  return (
    <Link to={"/"} className="flex items-center space-x-2">
      <MyImage
        src={Logo}
        alt="Demo Image"
        className=""
        classname="transition duration-300 ease-in-out hover:scale-105"
        width={40}
        height={40}
      />
      {!noName && (
        <h1 className=" text-indigo-500 text-2xl font-semibold">ISOKO</h1>
      )}
    </Link>
  );
};

export default AppLogo;
