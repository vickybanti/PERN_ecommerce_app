import "./userList.css";

import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import List from "../../components/list/List";
import {useSelector, useDispatch} from "react-redux"
import { setAdmin, setNotAdmin } from "../../redux/apiCalls";
import { SET_USERS } from "../../redux/slice/authSlice";

export default function UserList() {
  const [trans, setTrans] = useState("")

  
  const {data } = useFetchUsers();

  console.log(data)

  const userRows = data.map((user) => {return {
    id:user.user_id,
    firstname:user.firstname,
    lastname:user.lastname,
    email:user.email,
    status:user.isadmin, 
  

  }})
  console.log("UserRowId=",userRows.id)

  const setAdmin = async(id) => {
    console.log(id)
    const body = {
      id:id
    }
    
      try {
        const change = await fetch(`http://localhost:5000/users/admin/${id}`,{
          method:"PUT",
          body:JSON.stringify(body),
          headers:{"Content-Type":"application/json"}
        })
        const update = await change.json()
  
        if(update){
          window.location.reload()
        }
      } catch (err) {
        console.error(err.message)
      }
  
    }
  
  
  
  
  
  const setNotAdmin = async (id)=>{
      console.log(id)
    const body = {
      id:id
    }
      try {
        const change = await fetch(`http://localhost:5000/users/notadmin/${id}`,{
          method:"PUT",
          body:JSON.stringify(body),
          headers:{"Content-Type":"application/json"}
        })
        const update = await change.json()
  
        if(update){
          window.location.reload()
        }
      } catch (err) {
        console.error(err.message)
      }
  
    }
    
    
    
    const deleteUser = async (userId)=>{
      
      try {
        const del = await fetch(`http://localhost:5000/users/delete/${userId}`,{
          method:"DELETE",
          
        })
        const deleteInfo = await del.json()

        if(deleteInfo){
          console.log("Good")
        }
      } catch (err) {
        console.error(err.message)
      }

    }

    useEffect(()=>{
      const trans = async() => {
        const getTrans = await fetch(`http://localhost:5000/order/order/${userRows.id}`,{
          method:"GET",
          headers:{"Content-Type":"application/json"}
        })
        const allTrans = await getTrans.json()
        setTrans(allTrans)
      }
      trans()
    },[userRows.id])

    console.log(trans)
    
  
  const columns = [
    { field: "id", headerName: "ID", width: 110 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" key={params.row.id}/>
            {params.row.firstname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Admin",
      width: 90,
      

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
          <div>
           
            <DeleteIcon
              className="userListDelete"
              onClick={()=>deleteUser(params.row.id)}
            />
            {params.row.status === false ?
            <button onClick={()=>setAdmin(params.row.id)}>set as admin</button>
            :
            <button onClick={()=>setNotAdmin(params.row.id)}>Remove as admin</button>


        }
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
    <List rows={userRows} columns={columns} key={userRows.id}/>
</div>
  );
}
