import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  // Optional function to call after successful login
  onLoginSuccess?: (token: string, user: PublicUser) => void;
}

interface LoginApiResponseSuccess {
  success: true;
  message: string;
  token: string; // The JWT token from the backend
  user: PublicUser; // Public user data from the backend
}

interface LoginApiResponseError {
  success: false;
  message: string;
  // Optional: Add other error details if backend provides them
}
type LoginApiResponse = LoginApiResponseSuccess | LoginApiResponseError;

interface PublicUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string; 
}

function LoginForm({ onLoginSuccess }: LoginProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const redirect = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    const dataToSend: LoginFormData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Cast the JSON response to the union type
      const result: LoginApiResponse = await response.json();

      if (!response.ok) {
        setError(
          result.message || `Login failed with status: ${response.status}`
        );
      } else {
        const successResult = result as LoginApiResponseSuccess;
        console.log("Login successful:", successResult);

        setSuccess(successResult.message || "Login successful!");

        localStorage.setItem("authToken", successResult.token);

        localStorage.setItem("userInfo", JSON.stringify(successResult.user));

        if (onLoginSuccess) {
          onLoginSuccess(successResult.token, successResult.user);
        }

        redirect("/dashboard")
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Could not connect to the server. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div role="alert" className="alert alert-success mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* Email */}
      <div className="form-control mt-4 flex flex-col ">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john.doe@example.com"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      {/* Password */}
      <div className="form-control mt-4 flex flex-col">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          className="input input-bordered w-full"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-secondary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login" // Changed button text
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
