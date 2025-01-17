import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Simulate a short delay before redirecting
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <div className="logout-loading">
      <h2>Logging out...</h2>
      <p>Please wait while we sign you out.</p>
    </div>
  );
};

export default Logout;
