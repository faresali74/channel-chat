import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChannelSelectPage from "./pages/ChannelSelectPage";
import ChatPage from "./pages/ChatPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/channels" element={<ChannelSelectPage />} />
        <Route path="/chat/:channelId" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
