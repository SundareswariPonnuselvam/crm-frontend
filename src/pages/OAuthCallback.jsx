import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const user = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      toast.error("OAuth login failed. Please try again.");
      navigate("/login");
      return;
    }

    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));
        dispatch(setCredentials({ token, user: userData }));

        // Store token in localStorage for persistence
        localStorage.setItem("token", token);

        navigate(userData.role === "admin" ? "/admin" : "/telecaller");
      } catch (err) {
        toast.error("Error processing your login.");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">
          Completing Login...
        </h2>
        <p className="text-gray-600 mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
