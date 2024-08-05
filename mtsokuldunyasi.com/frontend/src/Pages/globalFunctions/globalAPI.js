import { axiosInstance } from "";

// Tüm Duyuruları Listele
const getAllNews = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Duyuru Sil
const deleteNewsById = async (newsId) => {
  try {
    const response = await axiosInstance.delete();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Duyuru Duzenle
const putById = async (newsId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/api/allnews/${newsId}`,
      updatedData
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Duyuru getir
const getById = async (newsId) => {
  try {
    const response = await axiosInstance.get(``);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Tüm Duyuruları ekle
const postAllNews = async (formData) => {
  try {
    const response = await axiosInstance.post( formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Ana sayfa get
const getHomePage = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const putHomePage = async (data) => {
  try {
    const response = await axiosInstance.put();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// Ana sayfa star start
const getStars = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const putStars = async (data) => {
  try {
    const response = await axiosInstance.put();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// all brand start
const getAllBrand = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// Marka Sil
const deleteBrandById = async (newsId) => {
  try {
    const response = await axiosInstance.delete(``);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const postAllBrand = async (formData) => {
  try {
    const response = await axiosInstance.post(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const getByIdBrand = async (newsId) => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// about start
const getAbout = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const putAbout = async (data) => {
  try {
    const response = await axiosInstance.put();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// all About List start
const getAllAboutList = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteAllAboutList = async (newsId) => {
  try {
    const response = await axiosInstance.delete();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addAboutList = async (data) => {
  try {
    const response = await axiosInstance.post();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateAboutList = async (aboutListId, data) => {
  try {
    const response = await axiosInstance.put(
      ,
      data
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// contact start
const getContact = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const putContact = async (data) => {
  try {
    const response = await axiosInstance.put();
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export {
  getAllNews,
  deleteNewsById,
  putById,
  getById,
  postAllNews,
  getHomePage,
  putHomePage,
  getAllBrand,
  deleteBrandById,
  postAllBrand,
  getByIdBrand,
  getStars,
  putStars,
  getAbout,
  putAbout,
  getAllAboutList,
  deleteAllAboutList,
  addAboutList,
  updateAboutList,
  getContact,
  putContact,
};
