import { getAllNews, deleteNewsById } from "../globalFunctions/globalAPI";
import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
const AdminNews = () => {
  const [api, setApi] = useState([]);
  const navigate = useNavigate();
  const _getAllNews = async () => {
    let response = await getAllNews();
    // Verileri en son güncelleme tarihine göre sırala
    response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setApi(response);
  };

  useEffect(() => {
    _getAllNews();
  }, []);

  const handleDelete = async (newsId) => {
    try {
      await deleteNewsById(newsId);
      _getAllNews();
    } catch (error) {
      console.error("Haber silinirken bir hata oluştu:", error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const truncateDate = (dateString, maxLength) => {
    return dateString.length > maxLength
      ? dateString.substring(0, maxLength)
      : dateString;
  };

  const columns = [
    {
      title: "Duyuru Resimi",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Duyuru Resmi"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Duyuru Başlık",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duyuru Açıklama",
      dataIndex: "detail",
      key: "detail",
      render: (detail) => truncateDescription(detail, 20),
    },
    {
      title: "Yayınlama Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => truncateDate(createdAt, 10),
    },
    {
      title: "Son Güncelleme",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => truncateDate(updatedAt, 10),
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
            onClick={() => {
              navigate(`newsupdate/${record._id}`);
            }}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Duyuru Sil"
            description="Duyuruyu Silmek İstediğinize emin misiniz ?"
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
      <button
        style={{
          width: 200,
          height: 45,
          backgroundColor: "#001529",
          fontSize: "1.1rem",
          color: "#fff",
          fontWeight: "500",
          borderRadius: 5,
          marginBottom: 15,
        }}
        onClick={() => {
          navigate("createNews");
        }}
      >
        Yeni Haber Ekle
      </button>
      <Table
        dataSource={api}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminNews;
