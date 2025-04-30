import { Link } from "react-router-dom";
import { girlsImage, } from "../libs/images";
import SignupForm from "../components/form/SignupForm";

const RegisterPage = () => {
  return (
    <div className=" flex space-x-4 min-h-screen ">
      <div className=" flex w-1/2 card p-4 h-96">
        <div className=" flex justify-center">
          <h2 className="card-title text-2xl text-center">Create account</h2>
        </div>
        <SignupForm />
        <Link to="/" className="mr-4 text-blue-600 hover:underline">
          Login
        </Link>
      </div>
      <div>
        <img className=" h-screen object-cover" src={girlsImage} />
      </div>
    </div>
  );
};

export default RegisterPage;
