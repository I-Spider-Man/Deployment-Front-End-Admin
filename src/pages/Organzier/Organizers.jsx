import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { organizerDelete, organizersDelete } from '../../components/DeleteStorage';
import { Link } from 'react-router-dom';
import { fetchOrganziersData } from '../../DataBase/Organizer';
function Organizers() {
    const [organizerRows,setOrganizerRows]=useState([]);
    useEffect(()=>{
        const fetchOrganizers=async()=>{
        try{
           const response=await fetchOrganziersData();
           const rowsWithId = response.map((organizer) => ({
            ...organizer,
            id: organizer.organizerId,
          }));
        setOrganizerRows(rowsWithId);
        }
        catch(error){
            console.log(error);
        }
    }
    fetchOrganizers();
    },[])
    console.log(organizerRows)
    const organizerColumns = [
        { field: "organizerId", headerName: "ID", width: 70 },
        {
          field: "userId",
          headerName: "User Id",
        },
        {
          field: "userName",
          headerName: "User Name",
          renderCell: (params) => (
            <span >{params.row.userData.userName}</span>
          ),
          width: 300
        },
        {
          field: "organizedCount",
          headerName: "Organized Count",
          width: 200
        },
        {
          field: "organizerStatus",
          headerName: "Status",
        },
      ];

      const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
          try {
            await organizerDelete(id);
            setOrganizerRows((prevRows) => prevRows.filter((organizer) => organizer.organizerId !== id));
          } catch (error) {
            console.error("Error deleting Organizer:", error);
          }
        }
      };

      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <Link to={`/Organizer/${params.row.organizerId}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton" onClick={() => handleDelete(params.row.organizerId)}>
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
  return (
    <div>
      <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="datatable" style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <DataGrid
            className="datagrid"
            rows={organizerRows}
            columns={organizerColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
        />
    </div>
    <div>

    </div>

      </div>
    </div>
    </div>
  )
}

export default Organizers
