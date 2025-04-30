import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// import UserList from "./components/components/UserList";
import DashboardLayout from "./pages/dashboard-layout";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        {/* <Route path="/users" element={<UserList />} /> */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
