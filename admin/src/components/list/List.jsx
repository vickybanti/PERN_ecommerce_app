import React from 'react'
import './list.css'
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from '../datatable/Datatable';

function List({rows, columns, rowId}) {

  return (
    <div className='list'>
    <Sidebar />

    <div className='listContainer'>
    <Topbar />
      <Datatable rows={rows} columns={columns} rowId={rowId}/>
    
    </div>
      
    </div>
  )
}

export default List
