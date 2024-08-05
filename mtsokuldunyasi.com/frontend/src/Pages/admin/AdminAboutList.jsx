import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Popconfirm, message } from "antd";
import {
  getAllAboutList,
  deleteAllAboutList,
  addAboutList,
  updateAboutList,
} from "../globalFunctions/globalAPI";

const AdminAboutList = () => {
  const [api, setApi] = useState([]);
  const [open, setOpen] = useState(false); // Modal state
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    detail: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null); // To track the current editing item

  const _getAllAboutList = async () => {
    try {
      const response = await getAllAboutList();
      response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setApi(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    _getAllAboutList();
  }, []);

  const handleDelete = async (aboutListId) => {
    try {
      await deleteAllAboutList(aboutListId);
      _getAllAboutList();
      message.success("Madde Silme Başarılı");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Hata Oluştu Tekrar Deneyiniz !");
    }
  };

  const truncateDetail = (detail, maxLength) => {
    return detail.length > maxLength ? detail.substring(0, maxLength) : detail;
  };

  const showModal = (item) => {
    if (item) {
      setIsEditing(true);
      setCurrentId(item._id);
      setUserData({
        name: item.name,
        detail: item.detail,
      });
    } else {
      setIsEditing(false);
      setCurrentId(null);
      setUserData({
        name: "",
        detail: "",
      });
    }
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (isEditing) {
        await updateAboutList(currentId, userData);
        message.success("Madde Başarıyla Güncellendi");
      } else {
        await addAboutList(userData);
        message.success("Madde Ekleme Başarılı");
      }
      setUserData({
        name: "",
        detail: "",
      });
      setOpen(false);
      _getAllAboutList();
    } catch (error) {
      console.error("Error saving item:", error);
      message.error("Madde Ekleme Htalı");
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const columns = [
    {
      title: "Hakkında Liste Başlığı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hakkında Liste İçeriği",
      dataIndex: "detail",
      key: "detail",
      render: (detail) => truncateDetail(detail, 100),
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => showModal(record)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Hakkında Liste Maddesi Silinecektir!"
            description="Silmek İstediğinize emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Button onClick={() => showModal()} style={{ marginBottom: 15 }}>
        Yeni Madde Ekle
      </Button>
      <Modal
        title={isEditing ? "Madde Düzenle" : "Madde Ekle"}
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Devam Et"
        cancelText="Vazgeç"
      >
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Madde Başlığı"
            style={{ marginBottom: 10 }}
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Konu İçeriği"
            style={{ marginBottom: 10 }}
            name="detail"
            value={userData.detail}
            onChange={handleChange}
          />
        </div>
      </Modal>
      <Table
        dataSource={api}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminAboutList;
