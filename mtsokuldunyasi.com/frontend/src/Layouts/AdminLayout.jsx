import { useState } from "react";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SkinOutlined,
  HomeOutlined,
  BellOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  UserAddOutlined,
  PoweroffOutlined,
  ExclamationCircleFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Modal } from "antd";
import "./admin.css";
import { FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const userRole = getUserRole();
  // çıkış modalı start
  const { confirm } = Modal;

  const goOutModal = () => {
    confirm({
      title: "Çıkış Yapmak İstediğinize Emin misiniz?",
      icon: <ExclamationCircleFilled />,
      okText: "Evet",
      cancelText: "Hayır",
      onOk() {
        localStorage.removeItem("user");
        window.location.href = "/";
      },

      onCancel() {
        console.log("Hayır");
      },
    });
  };
  // çıkış modalı end
  if (userRole === "admin") {
    return (
      <div className="panel_outher">
        <Layout style={{ flex: 1 }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="adminLogoMains">
              {collapsed ? (
                <>
                  <img
                    className="panel_adminLogo_sm"
                    src="../../public/panel_logo_sm.png"
                  />
                </>
              ) : (
                <>
                  <img
                    className="panel_adminLogo"
                    src="../../public/panel_logo_lg.png"
                  />
                </>
              )}
            </div>
            <div className="demo-logo-vertical" />

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HomeOutlined />,
                  label: "Anasayfa",
                  onClick: () => {
                    navigate("/admin/index");
                  },
                },
                {
                  key: "2",
                  icon: <StarOutlined />,
                  label: "ÖneÇıkan(Anasayfa)",
                  onClick: () => {
                    navigate("/admin/stars");
                  },
                },
                {
                  key: "3",
                  icon: <BellOutlined />,
                  label: "Haberler/Duyurular",
                  onClick: () => {
                    navigate("/admin/news");
                  },
                },
                {
                  key: "4",
                  icon: <SkinOutlined />,
                  label: "İş Ortaklarımız",
                  onClick: () => {
                    navigate("/admin/brand");
                  },
                },
                {
                  key: "5",
                  icon: <InfoCircleOutlined />,
                  label: "Hakkımızda",
                  onClick: () => {
                    navigate("/admin/about");
                  },
                },
                {
                  key: "56",
                  icon: <InfoCircleOutlined />,
                  label: "Hakkımızda Liste",
                  onClick: () => {
                    navigate("/admin/about_list");
                  },
                },
                {
                  key: "7",
                  icon: <PhoneOutlined />,
                  label: "İletişim",
                  onClick: () => {
                    navigate("/admin/contact");
                  },
                },
                {
                  key: "8",
                  icon: <UserAddOutlined />,
                  label: "Kullanıcılar",
                  onClick: () => {
                    navigate("/admin/users");
                  },
                },
                {
                  key: "89",
                  icon: <PoweroffOutlined />,
                  label: "Çıkış Yap",

                  onClick: goOutModal,
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 15,
              }}
            >
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <h1 className="admin_panel_header">Admin Paneli</h1>
              </div>
              <img
                className="logoImage_panel"
                src="../../public/images/mts_logo_black.png"
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                maxHeight: "80vh",
                overflowY: "auto",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        <a
          href="https://www.mtsyazilimdunyasi.com"
          target="_blank"
          className="LineTextting"
        >
          <FaCode style={{ fontSize: 16 }} />
          Yazılım ve Tasarım
          <span style={{ color: "#fff" }}>Mts YazılımDünyası</span>
        </a>
      </div>
    );
  } else {
    return (window.location.href = "/panel");
  }
};

export default AdminLayout;
AdminLayout.propTypes = {
  children: PropTypes.node,
};
