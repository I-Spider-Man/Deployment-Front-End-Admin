// GroupDetails.jsx

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './GroupDetails.scss';
import { fetchGrpDataById, getAllParticipantsByGroupId } from '../../DataBase/Group';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [participantData,setParticipantData]=useState([]);
  useEffect(async() => {  
    const data=await fetchGrpDataById(groupId);
    const participants=await getAllParticipantsByGroupId(groupId);
    const rowsWithId = participants.map((participant) => ({
      ...participant,
      id: participant.participantId,
    }));
    setParticipantData(rowsWithId);
    setGroupDetails(data);
  }, []);
  const participantColumns = [
    { field: "participantId", headerName: "ID", width: 100 },
    {
      field: "userId",
      headerName: "User Id",
      width:150,
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
      width:150
    },
  ];


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
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="group-details-content">
          <h2>Group Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          
            <TableRow>
              <TableCell><strong>Group ID:</strong></TableCell>
              <TableCell>{groupDetails.groupId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Group Name:</strong></TableCell>
              <TableCell>{groupDetails.groupName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date From:</strong></TableCell>
              <TableCell>{groupDetails.dateFrom}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date To:</strong></TableCell>
              <TableCell>{groupDetails.dateTo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Organizer ID:</strong></TableCell>
              <TableCell>{groupDetails.organizerId}</TableCell>
            </TableRow>
            <TableRow>
              {console.log(groupDetails)}
              <TableCell><strong>Organizer Name:</strong></TableCell>
              <TableCell>{groupDetails.organizerData?.userData?.userName}</TableCell>
            </TableRow>
            {groupDetails.eventName ? (
            <TableRow>
              <TableCell><strong>Event Name:</strong></TableCell>
              <TableCell>{groupDetails.eventName}</TableCell>
            </TableRow>
            ):(
            <TableRow>
              <TableCell><strong>Spot Name:</strong></TableCell>
              <TableCell>{groupDetails.spotName}</TableCell>
            </TableRow>
            )}
           
            
            <TableRow>
              <TableCell><strong>About:</strong></TableCell>
              <TableCell>{groupDetails.about}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Group Status:</strong></TableCell>
              <TableCell>{groupDetails.groupStatus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Participants Limit:</strong></TableCell>
              <TableCell>{groupDetails.participantsLimit}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Participants Count:</strong></TableCell>
              <TableCell>{groupDetails.participantsCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div>
      
    <div className="datatable" style={{display:'flex',flexDirection:'column',gap:'10px'}}>
      <h2>Participants Participated in this Group</h2>
        <DataGrid
            className="datagrid"
            rows={participantData}
            columns={participantColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
        />
    </div>
    </div>
      </div>
    </div>
  );
};

export default GroupDetails;
