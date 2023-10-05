import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Edit.css";
import { useEffect, useState } from "react";
import useCat from "../../hooks/useCat";
import useFetchAProduct from "../../hooks/useFetchAProduct";
import { useParams } from "react-router";

export default function Edit() {
  const { catData } = useCat();
  const { proData, imageData } = useFetchAProduct();
  const { id } = useParams();

  const proDatas = proData.map((pro) => {
    return {
      id: pro.id,
      title: pro.title,
      description: pro.desc,
      stock: pro.stock,
      sizes: pro.sizes,
      price: pro.price,
      oldPrice: pro.oldPrice,
      type:pro.type
    };
  });

  const [formData, setFormData] = useState(proDatas[0] || {});
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSizes, setSizes] = useState([]);

  const handleSizes = (e) => {
    const sizes = e.target.value;
    setSizes([sizes]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...files]);
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    const editedFields = {
      title: formData.title,
      description: formData.description,
      oldPrice: formData.oldPrice,
      price: formData.price,
      stock: formData.stock,
      sizes: selectedSizes,
      cat: formData.cat,
    };

    const formDataToBackend = new FormData();
    formDataToBackend.append("data", JSON.stringify(editedFields));

    for (const file of selectedImages) {
      formDataToBackend.append("images", file);
    }

    try {
      const enterProducts = await fetch(
        `http://localhost:5000/product/edit/${id}`,
        {
          method: "PUT",
          body: formDataToBackend,
        }
      );

      const response = await enterProducts.json();
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="newUser">
      <Sidebar />

      <div className="newContainer">
        <Topbar />
        <div className="top">
          <h1 className="newUserTitle">Enter new products</h1>
        </div>
        <form className="newUserForm" onSubmit={submitProduct}>
          <div className="newUserBottom">
            <div className="newUserLeft">
              <img
                value={formData.images}
                src={
                  selectedImages.length > 0
                    ? URL.createObjectURL(selectedImages[0])
                    : imageData && imageData[0]
                }
                alt=""
              />
            </div>
            <div className="newUserRight">
              <div className="newUserItem">
                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="newUserItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder={proDatas[0].title}
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                />
                <label>Description</label>
                <input
                  type="text"
                  placeholder={proDatas[0].description}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
                <label>Old price</label>
                <input
                  type="text"
                  placeholder={proDatas[0].oldPrice}
                  name="oldPrice"
                  value={formData.oldPrice || ""}
                  onChange={handleInputChange}
                />
                <label>Price</label>
                <input
                  type="text"
                  placeholder={proDatas[0].price}
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                />
                <label>Type</label>
                <select value={formData.type || ""}
                placeholder={proDatas[0].type}
                onChange={handleInputChange}>
                  <option value="">Regular</option>
                  <option value="trending">Trending</option>
                  <option value="newArrival">New Arrival</option>
                </select>
                <label>Stock</label>
                <input
                  type="text"
                  placeholder="in stock"
                  name="stock"
                  value={formData.stock || ""}
                  onChange={handleInputChange}
                />
                <label>Sizes</label>
                <input
                  type="text"
                  placeholder={proDatas[0].sizes}
                  name="sizes"
                  value={selectedSizes || ""}
                  onChange={handleSizes}
                />
              </div>

              <div className="newUserItem">
                <label>Categories</label>
                <select
                  className="newUserSelect"
                  value={formData.cat || ""}
                  name="cat"
                  onChange={handleInputChange}
                  id="active"
                >
                  <option disabled>select category</option>
                  {catData.map((cats) => (
                    <option value={cats.cat_id} key={cats.cat_id}>
                      {cats.cat_title}
                    </option>
                  ))}
                </select>
              </div>

              <button className="newUserButton" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
