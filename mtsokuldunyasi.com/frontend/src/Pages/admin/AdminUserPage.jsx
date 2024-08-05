import { useState, useCallback, useEffect } from "react";
import { Table, message, Button, Popconfirm, Modal, Input } from "antd";

const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [, setModalText] = useState("Content of the modal");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    name: "",
    surname: "",
    password: "",
    avatar: null,
  });

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    // {
    //   title: "Profil Resmi",
    //   dataIndex: "avatar",
    //   key: "avatar",
    //   render: (imgSrc) => (
    //     <img
    //       src={imgSrc}
    //       alt="Profil Resmi"
    //       style={{
    //         width: 50,
    //         height: 50,
    //         objectFit: "cover",
    //         borderRadius: "50%",
    //       }}
    //     />
    //   ),
    // },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "E-Posta Adresi",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soyadı",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "İşemler",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Popconfirm
            title="Yönetici Sil"
            description="Yöneticiyi Silmek İstediğinize emin misiniz ?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteUser(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fechUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}api/auth`, {});
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Bilgileri Kontrol Ediniz");
      }
    } catch (error) {
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fechUsers();
  }, [fechUsers]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setModalText("Kullanıcı Ekleniyor");
      setConfirmLoading(true);

      const response = await fetch(`${apiUrl}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        fechUsers();
        message.success("Kullanıcı Başarıyla Eklendi");
      } else {
        message.error("Kullanıcı Eklenirken Bir Hata Oluştu");
      }
    } catch (error) {
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const deleteUser = async (userId) => {
    try {
      const userResponse = await fetch(`${apiUrl}api/auth/${userId}`);
      const userData = await userResponse.json();

      if (userData.role === "admin") {
        message.error("Bu Yönetici Silinemez.");
        return;
      }

      const response = await fetch(`${apiUrl}api/auth/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fechUsers();
        message.success("Yönetici Başarıyla Silindi");
      } else {
        message.error("Silme İşlemi Başarısız Ediniz");
      }
    } catch (error) {
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Button onClick={showModal} style={{ marginBottom: 15 }}>
        Kullanıcı Ekle
      </Button>
      <Modal
        title="Kullanıcı Ekle"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Devam Et"
        cancelText="Vazgeç"
      >
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Kullanıcı Adı"
            style={{ marginBottom: 10 }}
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <Input
            placeholder="E-posta Adresi"
            style={{ marginBottom: 10 }}
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Adı"
            style={{ marginBottom: 10 }}
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Soyadı"
            style={{ marginBottom: 10 }}
            name="surname"
            value={userData.surname}
            onChange={handleChange}
          />
          <Input.Password
            placeholder="Şifre"
            style={{ height: 40 }}
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
      </Modal>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default AdminUserPage;
