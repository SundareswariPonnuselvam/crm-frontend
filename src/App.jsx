import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./pages/ProtectedRoute";
import Auth from "./pages/Auth";
import TelecallerDashboard from "./pages/TelecallerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OAuthSuccess from "./pages/OAuthSuccess";
import OAuthError from "./pages/OAuthError";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/oauth-error" element={<OAuthError />} />
          <Route
            path="/telecaller"
            element={
              <ProtectedRoute allowedRoles={["telecaller"]}>
                <TelecallerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div>
                <h1>404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
