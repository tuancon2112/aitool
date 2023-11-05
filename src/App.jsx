import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages";
import Auth from "./pages/auth";
import Admin from "./admin/admin";
import ManageUser from "./manageuser/manageuser";
import MainPage from "./main/MainPage";
import Main2 from "./pages/index2";
import Admin2 from "./admin/admin2";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 👈 Renders at /app/ */}
        <Route path="/app1" element={<Main />} /> {/* 👈 Renders at /app/ */}
        <Route path="/app2" element={<Main2 />} />
        <Route path="/login" element={<Auth />} /> {/* 👈 Renders at /app/ */}
        <Route path="/register" element={<Auth />} />{" "}
        {/* 👈 Renders at /app/ */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin2" element={<Admin2 />} />
        <Route path="/manage-user" element={<ManageUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
