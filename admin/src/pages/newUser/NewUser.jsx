import { DriveFolderUploadOutlined } from "@mui/icons-material";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newUser.css";
import { useEffect, useState } from "react";
import useCat from "../../hooks/useCat";
import useBrand from "../../hooks/useBrands";
import { productInputs, userInputs } from "../../dummyData";
import { useNavigate } from "react-router";

export default function NewUser() {

  const navigate = useNavigate()
  const {brandData} = useBrand()

  const {catData} = useCat()

    const [formData, setFormData] = useState({
      title: '',
      description: '',
      type:'',
      cat: '',
      brand:'',
      price: '',
      oldPrice: '',
      stock: '',
      size:''
      
      
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedSizes, setSizes] = useState([])
    const [message, setMessage] = useState("")

  console.log(selectedImages)
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleImageChange = (e) => {
      const files = e.target.files;
      setSelectedImages([...files]);
    };

    const handleSizes = (e) => {
      const sizes = e.target.value;
      setSizes([sizes]);

    };
  
    const submitProduct = async (e) => {
      e.preventDefault();
  
      const allBodies = {
        ...formData,
        sizes:selectedSizes,
        images:[]
      };
  
      for (const file of selectedImages) {
      
        
        allBodies.images.push(file.name)
      
    
  }

 
        
  


  console.log(allBodies.images)
  console.log(allBodies.sizes)
      
        
        
      
      console.log(allBodies)

      
  
      try {
        const enterProducts = await fetch(`http://localhost:5000/product/add`, {
          method: 'POST',
          body: JSON.stringify(allBodies),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const response = await enterProducts.json();
        console.log(response);
        if (response){
          setMessage("Successfully created a product.")
         window.location.reload()
          
        }
        
      } catch (err) {
        setMessage(err.message)
        console.error(err.message);
      }
    }
  

   
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
        <img src={selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : ''} alt="" />

        </div>
        <div className="newUserRight">

        <div className="newUserItem">
        
        <label htmlFor="file">Image:<DriveFolderUploadOutlined  className="icon"/></label>
      <input
        type="file"
        id="file"
        onChange={handleImageChange}
        accept="image/*"
        multiple
      />
        

     
       
        <div className="newUserItem">


              <label>Title</label>
              <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          <label>Description</label>
          <input
          type="text"
          placeholder="black shoes for men..."
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
          <label>Old price</label>
          <input
          type="text"
          placeholder="$2.79"
          name="oldPrice"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />
          <label>Price</label>
          <input
          type="text"
          placeholder="$2.00"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
          <label>Stock</label>
          <input
          type="text"
          placeholder="in stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
        />          
          <label>Sizes</label>
          <input
          type="text"
          placeholder="38,40,XL,XXL"
          name="sizes"
          value={formData.sizes}
          onChange={handleSizes}
        />
          
        </div>
        <label>Type</label>
        <select className="newUserSelect" name="type" value={formData.type}  onChange={handleInputChange} id="active" >
        <option disabled>select category</option>
        
          <option value="">Regular</option>
          <option value="newArrivals">New Arrivals</option>
          <option value="trending">Trending</option>

      
      </select>
      

            <>
            <div className="newUserItem">
            <label>Categories</label>
            <select className="newUserSelect" name="cat" value={formData.cat}  onChange={handleInputChange} id="active" >
            <option disabled>select category</option>
            {catData.map((cats) => (
              <option value={cats.cat_id} key={cats.cat_id}>{cats.cat_title}</option>

            ))}
          </select>
          </div>


          <div className="newUserItem">
            <label>Brands</label>
            <select className="newUserSelect" name="brand" value={formData.brand}  onChange={handleInputChange} id="active" >
            <option disabled>select brand</option>
            {brandData.map((brand) => (
              <option value={brand.id} key={brand.id}>{brand.brand_title}</option>

            ))}
          </select>
          </div>
          </>

          
          
          
        
        
         
        
      
        <button className="newUserButton" type="submit" disabled={message}>Create</button>
        {message}
      </div>
      </div>
      </div>
      </form>

      </div>
      
    </div>
  );
}
