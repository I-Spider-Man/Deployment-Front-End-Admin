import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { organizerDelete, organizersDelete, participantDelete } from '../../components/DeleteStorage';
import { Link } from 'react-router-dom';
import { fetchParticipantsData } from '../../DataBase/Participant';
function Participants() {
    const [participantRows,setParticipantRows]=useState([]);
    useEffect(()=>{
        const fetchParticipants=async()=>{
        try{
           const response=await fetchParticipantsData();
           const rowsWithId = response.map((participant) => ({
            ...participant,
            id: participant.participantId,
          }));
        setParticipantRows(rowsWithId);
        }
        catch(error){
            console.log(error);
        }
    }
    fetchParticipants();
    },[])
    console.log(participantRows)
    const participantColumns = [
        { field: "participantId", headerName: "ID", width: 70 },
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
          field: "participationCount",
          headerName: "Participated Count",
          width: 200
        },
        {
          field: "participantStatus",
          headerName: "Status",
        },
      ];

      const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
          try {
            await participantDelete(id);
            setParticipantRows((prevRows) => prevRows.filter((participant) => participant.participantId !== id));
          } catch (error) {
            console.error("Error deleting Participant:", error);
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
                <Link to={`/participants/${params.row.participantId}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton" onClick={() => handleDelete(params.row.participantId)}>
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
            rows={participantRows}
            columns={participantColumns.concat(actionColumn)}
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

export default Participants
