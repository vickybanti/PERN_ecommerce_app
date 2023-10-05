import React from 'react'
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import './datatable.css'



function Datatable({rows, columns, title, rowId}) {
  

  console.log(rows)
  console.log(columns)
  console.log(title)
  
  return (
    <div className="datatable">
    <div className="dataTableTitle">
      {title}
      <Link to={'new'} className="rowLink">
        Add New
      </Link>
    </div>
    <Box sx={{ width: '100%' }}>
    <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
            
          },
          
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        className='dataGridTable'
        getRowId={rowId}
      />
      </Box>
    </div>
  )
}

export default Datatable
