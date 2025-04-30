import { Link } from "react-router-dom";
import LoginForm from "../components/form/loginForm";
import { marketImage } from "../libs/images";

const LoginPage = () => {
  return (
    <div className=" flex space-x-4 min-h-screen items-center">
      <div className=" flex w-1/2 card p-4 h-96">
        <div className=" flex justify-center">
          <h2 className="card-title text-2xl text-center">Login</h2>
        </div>
        <LoginForm />
        <Link to="/sign-up" className="mr-4 text-blue-600 hover:underline">
          Create account
        </Link>
      </div>
      <div>
        <img className=" h-screen object-cover" src={marketImage} />
      </div>
    </div>
  );
};

export default LoginPage;
