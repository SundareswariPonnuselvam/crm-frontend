import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const OAuthError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error === "no_email") {
      toast.error("Please ensure your account has a verified email address");
    } else if (message) {
      toast.error(decodeURIComponent(message));
    } else {
      toast.error("Authentication failed. Please try again.");
    }

    // Redirect to login after showing error
    navigate("/");
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="mx-auto mb-4 text-red-500">
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Authentication Error
        </h2>
        <p className="text-gray-600 mt-2">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default OAuthError;
