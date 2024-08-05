import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
const isLocation = window.location.pathname.startsWith("/admin");
export const Layout = isLocation == true ? AdminLayout : MainLayout;
