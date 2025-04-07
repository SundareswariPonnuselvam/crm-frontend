import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    const handleSuccess = async () => {
      try {
        setLoading(true);

        if (!token || !userData) {
          throw new Error("Authentication data missing");
        }

        let user;
        try {
          user = JSON.parse(decodeURIComponent(userData));
        } catch (error) {
          throw new Error("Invalid user data");
        }

        // Store before verification to ensure smooth UX
        dispatch(setCredentials({ user, token }));
        localStorage.setItem("token", token);

        // Verify token with backend
        const verificationResponse = await api.get("/api/auth/verify-token");

        // Redirect after successful verification
        if (user.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (user.role === "telecaller") {
          navigate("/telecaller", { replace: true });
        } else {
          throw new Error("Invalid user role");
        }
      } catch (error) {
        toast.error(error.message || "Authentication failed");
        // Clear invalid credentials
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    handleSuccess();
  }, [searchParams, navigate, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            Finalizing your login...
          </h2>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthSuccess;
