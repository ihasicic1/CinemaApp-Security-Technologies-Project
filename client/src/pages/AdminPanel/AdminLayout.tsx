import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminPanel/AdminSidebar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main style={{flex: 1, background: "#F3F4F6", padding: "30px 40px", marginTop: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
