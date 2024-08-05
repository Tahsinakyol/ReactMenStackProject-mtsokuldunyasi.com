import { getAllBrand, deleteBrandById } from "../globalFunctions/globalAPI";
import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
const AdminBrand = () => {
  const [api, setApi] = useState([]);
  const navigate = useNavigate();
  const _getAllBrand = async () => {
    let response = await getAllBrand();
    // Verileri en son güncelleme tarihine göre sırala
    response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setApi(response);
  };

  useEffect(() => {
    _getAllBrand();
  }, []);

  const handleDelete = async (newsId) => {
    try {
      await deleteBrandById(newsId);
      _getAllBrand();
    } catch (error) {
      console.error("Haber silinirken bir hata oluştu:", error);
    }
  };

  const truncateDate = (dateString, maxLength) => {
    return dateString.length > maxLength
      ? dateString.substring(0, maxLength)
      : dateString;
  };

  const columns = [
    {
      title: "Firma Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Duyuru Resmi"
          style={{
            width: 150,
            height: 60,
            objectFit: "contain",
          }}
        />
      ),
    },
    {
      title: "Firma Adı",
      dataIndex: "name",
      key: "name",
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
          <Popconfirm
            title="Marka Sil"
            description="Markayı Silmek İstediğinize emin misiniz ?"
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
          navigate("createBrand");
        }}
      >
        Yeni Marka Ekle
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

export default AdminBrand;
