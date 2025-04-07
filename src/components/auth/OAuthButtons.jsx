import { FaGoogle, FaGithub } from "react-icons/fa";
import { initiateGoogleOAuth, initiateGitHubOAuth } from "../../api/authApi";

export default function OAuthButtons() {
  return (
    <div className="space-y-4">
      <button
        onClick={initiateGoogleOAuth}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <FaGoogle className="h-5 w-5 text-red-500" />
        Continue with Google
      </button>
      <button
        onClick={initiateGitHubOAuth}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <FaGithub className="h-5 w-5 text-gray-800" />
        Continue with GitHub
      </button>
    </div>
  );
}
