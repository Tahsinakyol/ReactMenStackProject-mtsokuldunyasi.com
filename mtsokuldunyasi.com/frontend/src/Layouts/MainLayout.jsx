import FooterComponent from "../components/Layout/Footer/FooterComponent";
import Header from "../components/Layout/Header/Header";
import Proptypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div style={{ width: "100%" }}>
      <Header />
      {children}
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
MainLayout.propTypes = {
  children: Proptypes.node,
};
