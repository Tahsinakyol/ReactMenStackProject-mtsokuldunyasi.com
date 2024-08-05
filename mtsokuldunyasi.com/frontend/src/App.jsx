import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import "./App.css";
import NewsDetail from "./Pages/NewsDetail";
import NewsPage from "./Pages/NewsPage";
import Product from "./Pages/Product";
import Contact from "./Pages/Contact";
import Panel from "./Panel/Panel";
import AdminUserPage from "./Pages/admin/AdminUserPage";
import AdminNews from "./Pages/admin/AdminNews";
import CreateNews from "./Pages/admin/news/CreateNews";
import EditNews from "./Pages/admin/news/EditNews ";
import AdminIndex from "./Pages/admin/AdminIndex";
import AdminStar from "./Pages/admin/AdminStar";
import None from "./Pages/None";
import AdminBrand from "./Pages/admin/AdminBrand";
import CreateBrand from "./Pages/admin/news/createBrand";
import AdminAbout from "./Pages/admin/AdminAbout";
import AdminAboutList from "./Pages/admin/AdminAboutList";
import AdminContact from "./Pages/admin/AdminContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/About" element={<About />} />
      <Route path="/NewsDetail" element={<NewsDetail />} />
      <Route path="/NewsPage" element={<NewsPage />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Panel" element={<Panel />} />
      <Route path="/admin/*">
        <Route path="index" element={<AdminIndex />} />
        <Route path="users" element={<AdminUserPage />} />
        <Route path="stars" element={<AdminStar />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="news/newsupdate/:id" element={<EditNews />} />
        <Route path="news/createNews" element={<CreateNews />} />
        <Route path="brand" element={<AdminBrand />} />
        <Route path="brand/createBrand" element={<CreateBrand />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="about_list" element={<AdminAboutList />} />
        <Route path="contact" element={<AdminContact />} />
      </Route>
      <Route path="*" element={<None />} />
    </Routes>
  );
}

export default App;
