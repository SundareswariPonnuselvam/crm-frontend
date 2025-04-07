import api from "./axios";

const register = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
};

const logout = async () => {
  const response = await api.get("/api/auth/logout");
  return response.data;
};

const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

const handleOAuthCallback = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const role = queryParams.get("role");

  if (token && role) {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        role: role,
      })
    );

    const dashboardPath = role === "admin" ? "/admin" : "/telecaller";

    // Ensure the redirection URL is logged for debugging
    const redirectUrl = `${window.location.origin}${dashboardPath}`;
    console.log("Redirecting to:", redirectUrl);

    window.location.href = redirectUrl;

    return true;
  }
  return false;
};

const openOAuthPopup = (provider) => {
  return new Promise((resolve, reject) => {
    const authUrl = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const newWindow = window.open(
      authUrl,
      `${provider} Login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const messageListener = (event) => {
      if (event.origin !== import.meta.env.VITE_API_URL) return;

      const { token, user, error } = event.data;

      if (token && user) {
        resolve({ token, user });
      } else {
        reject(error || "OAuth failed");
      }

      window.removeEventListener("message", messageListener);
      newWindow?.close();
    };

    window.addEventListener("message", messageListener);
  });
};

const googleLogin = () => openOAuthPopup("google");
const githubLogin = () => openOAuthPopup("github");

export const initiateGoogleOAuth = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
};

export const initiateGitHubOAuth = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
};

export const getCurrentUser = async (userId) => {
  const response = await api.get(`/api/users/${userId}`);
  return response.data;
};

export const authApi = {
  register,
  login,
  logout,
  getMe,
  googleLogin,
  githubLogin,
  handleOAuthCallback,
};
