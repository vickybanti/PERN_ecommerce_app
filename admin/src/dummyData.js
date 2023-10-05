import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import useCat from "./hooks/useCat";




export const userData = [
    {
      name: "Jan",
      "Active User": 4000,
    },
    {
      name: "Feb",
      "Active User": 3000,
    },
    {
      name: "Mar",
      "Active User": 5000,
    },
    {
      name: "Apr",
      "Active User": 4000,
    },
    {
      name: "May",
      "Active User": 3000,
    },
    {
      name: "Jun",
      "Active User": 2000,
    },
    {
      name: "Jul",
      "Active User": 4000,
    },
    {
      name: "Agu",
      "Active User": 3000,
    },
    {
      name: "Sep",
      "Active User": 4000,
    },
    {
      name: "Oct",
      "Active User": 1000,
    },
    {
      name: "Nov",
      "Active User": 4000,
    },
    {
      name: "Dec",
      "Active User": 3000,
    },
  ];

  export const productData = [
    {
      name: "Jan",
      "Sales": 4000,
    },
    {
      name: "Feb",
      "Sales": 3000,
    },
    {
      name: "Mar",
      "Sales": 5000,
    },
  ];

  export const userRows = [
    {
      id: 1,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 2,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "pending",
      transaction: "$120.00",
    },
    {
      id: 3,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "pending",
      transaction: "$120.00",
    },
    {
      id: 4,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "passive",
      transaction: "$120.00",
    },
    {
      id: 5,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "pending",
      transaction: "$120.00",
    },
    {
      id: 6,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 7,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 8,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
    {
      id: 9,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "passive",
      transaction: "$120.00",
    },
    {
      id: 10,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      transaction: "$120.00",
    },
  ];

  // export const productRows = allProducts.map((pro) => ({
  //   id: pro.id,
  //   name: pro.title,
  //   img: pro.image,
  //   stock: 123, // You may need to provide the actual stock value here
  //   status: pro.desc,
  //   price: pro.price,
  // }));
  
 
export const userInputs= [
  {
    id:1,
    label:"Username",
    type:"text",
    placeholder:"John"
  },

  

  {
    id:3,
    label:"Name and surname",
    type:"text",
    placeholder:"John"
  },

  {
    id:4,
    label:"Email",
    type:"mail",
    placeholder:"John@gmail.com"
  },

  {
    id:5,
    label:"Phone",
    type:"text",
    placeholder:"233421133"
  },

  {
    id:6,
    label:"Password",
    type:"password",
  },

  {
    id:7,
    label:"Confirm password",
    type:"password",
  },


]

export const productInputs=[
  {
    id:1,
    label:"Title",
    type:"text",
    placeholder:"Apple Macbook Pro",
    value:"title",
    
  },
  {
    id:2,
    label:"Description",
    type:"text",
    placeholder:"Descrition",
    value:"description"
  },
  
  {
    id:3,
    label:"Old price",
    type:"text",
    placeholder:"100",
    value:"oldPrice"
  },

  {
    id:4,
    label:"price",
    type:"text",
    placeholder:"400",
    value:"price"
  },
  {
    id:5,
    label:"Stock",
    type:"text",
    placeholder:"in stock",
    value:"stock"
  }
]

 



export const userColumns = [
    
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          <img className="userListImg" src={params.row.avatar} alt="" />
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
    }
  },
  {
    field: "transaction",
    headerName: "Transaction Volume",
    width: 160,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <Delete
            className="userListDelete"
            
          />
        </>
      );
    },
  },
];

export const productColumns = [
    
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "product",
    headerName: "Product",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          <img className="userListImg" src={params.row.avatar} alt="" />
          {params.row.name}
        </div>
      );
    },
  },
  { field: "stock", headerName: "Stock", width: 200 },
  {
    field: "description",
    headerName: "Description",
    width: 180,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
    }
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "oldprice",
    headerName: "Old Price",
    width: 100,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <Delete
            className="userListDelete"
            
          />
        </>
      );
    },
  },
];