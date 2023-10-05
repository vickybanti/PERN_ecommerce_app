import React,{useState,useEffect} from 'react'
import './productList.css'
import useFetchProducts from '../../hooks/useFetchProducts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import List from '../../components/list/List';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductId, getAllProducts, getProduct } from '../../redux/apiCalls';
import useFetchAProduct from '../../hooks/useFetchAProduct';

function Product({activeClassName}) {
  const navigate = useNavigate()
  const {allProducts} = useFetchProducts('/products')
  const {imageData} = useFetchAProduct()

  const [allProductRows, setProductRows] = useState([])
  const [deletingId, setDeletingId] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Track the confirmation dialog state
  const dispatch = useDispatch()

  const products = useSelector((state) => state.products.items)
  
  console.log("products=",products)

  console.log(deletingId)

  const deleteProduct = (id) => {
    setDeletingId(id)
    // Open the confirmation dialog
    setIsConfirmationOpen(true) 
    // Set the product to be deleted
  };

  const cancelDelete = () => {
    // Reset the deletingId and close the confirmation dialog
    setDeletingId("");
    setIsConfirmationOpen(false);
  }

  async function confirmDelete (id)  {
   
    
      try {
        const del = await fetch(`http://localhost:5000/product/delete/${id}`,{
          method:"DELETE"
        })
        if (del){
        setIsConfirmationOpen(false)
        window.location.reload()

        }
      } catch (err) {
        console.error(err.message)
      }
        
      }
      
        
      
    
  useEffect(()=>{
    const getProducts = getAllProducts(dispatch)
    console.log(getProducts)
    setProductRows(allProducts)
  },[dispatch,allProducts])

  const productRows = allProductRows.map((pro) => { return{
      getRowId:pro.id,
      id: pro.id,
      name: pro.title,
      avatar:imageData && imageData[0],
      stock: pro.stock, 
      status:pro.stock>0?"in stock":"out of stock",
      description:pro.desc,
      oldPrice:pro.oldprice,
      price: pro.price,
      type:pro.type,
      category:pro.cat_title
    }}
    );
     const productColumns = [
    
        { field: "id", headerName: "ID", width: 40 },
        {
          field: "product",
          headerName: "Product",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="userListUser" key={params.key}>
                <img src={params.row.avatar} alt="" />
                {params.row.name}
              </div>
            );
          },
        },
        { field: "stock", headerName: "Stock", width: 50 },
        { field: "description", headerName: "Description", width: 120 },
        {
          field: "status",
          headerName: "Status",
          width: 100,
          renderCell: (params) => {
            return <div className={`cellWithStatus`}>{params.row.status}</div>
          }
        },
        {
          field: "price",
          headerName: "Price",
          width: 70,
        },
        {
          field: "oldPrice",
          headerName: "Old Price",
          width: 70,
        },
        {
          field: "type",
          headerName: "Type",
          width: 100,
        },
        {
          field: "category",
          headerName: "Category",
          width: 70,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>

               

               
                {console.log(params.row.id)}

                
                <button onClick={()=>navigate(`/products/${params.row.id}`)}>View</button>

                {isConfirmationOpen && (
                   
                  <><button onClick={cancelDelete}>Cancel</button><button onClick={()=>confirmDelete(deletingId)} key={params.row.id}>Confirm</button>
                  </>
                  
                )}
                <Delete
                  className="userListDelete"
                  onClick={()=>deleteProduct(params.row.id)}
                  key={params.row.id}
                  
                />
                <Link to={"edit/" + params.row.id}>
                <button className="userListEdit">Edit</button>
              </Link>
              </>
            );
          },
        },
      ];



  //   const [imageData, setImageData] = useState(null);
  //   console.log(imageData)

  // useEffect(() => {
  //   const item = allProducts.map((item) => (
  //     item
  //   ))
  //   console.log(item)
  //   if (item.images) {
  //     const newImageDataArray = [];
  
  //     item.images.forEach((image) => {
  //       const byteArray = new Uint8Array(image.data);
  //       const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const base64Image = reader.result;
  //         newImageDataArray.push(base64Image);
  
  //         // Check if all images have been processed
  //         if (newImageDataArray.length === item.images.length) {
  //           setImageData(newImageDataArray);
  //         }
  //       };
  
  //       reader.readAsDataURL(blob);
  //     });
  //   } else {
  //     setImageData([]);
  //   }
  // }, [allProducts]);
  
  
  
     

    return (
        <div style={{activeClassName}}>
        
            <List rows={productRows} columns={productColumns} rowId={productRows.id}/>
            
        </div>
    )
  
}

export default Product
