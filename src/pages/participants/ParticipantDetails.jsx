import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './ParticipantDetail.scss';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchParticipantDetailsById, fetchParticipatedGroups } from '../../DataBase/Participant';
import { DataGrid } from '@mui/x-data-grid';

const ParticipantDetail = () => {
  const { participantId } = useParams();
  const [participantDetails, setParticipantDetails] = useState({});
  const [participantHistory, setParticipantHistory] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchParticipantDetailsById(participantId);
      setParticipantDetails(data);
      const history = await fetchParticipatedGroups(data.userId);
      const grpWithId = history.map((grp) => ({
        ...grp,
        id: grp.groupId,
      }));
      setParticipantHistory(grpWithId);
    };

    fetchData();
  }, [participantId]);
  const columnData = [
    { field: 'groupId', headerName: 'Group Id', width: 100 },
    { field: 'groupName', headerName: 'Group Name', width: 150 },
    { field: 'organizerName', headerName: 'Organizer Name', width: 150 ,renderCell:(params)=>(params.row.organizerData.userData.userName)},
    {
      field: 'event/spot',
      headerName: 'eventName/spotName',
      width:210,
      renderCell: (params) => (
        <div>
          {params.row.eventName ? (
            <>{params.row.eventName}</>
          ) : (
            <>{params.row.spotName}</>
          )}
        </div>
      ),
    },

    { field: 'groupStatus',width:300, headerName: 'Group Status', renderCell: (params) => (
      <span className={`status ${params.value}`}>{params.value}</span>
    )},
  ];
  const actionColumn=[
    {field:"Action",
    headerName:"Action",
    width:150,
    renderCell:(params)=>{
      return(
        <div className="cellAction">
          <Link to={`/group/${params.row.groupId}`} style={{ textDecoration: "none" }}>
          <div className="viewButton">View</div>
          </Link>
        </div>
      )
    }}]
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className="participant-details-content">
          <h2>Participant Details</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Participant ID:</strong></TableCell>
                  <TableCell>{participantDetails.participantId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>User ID:</strong></TableCell>
                  <TableCell>{participantDetails.userId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>User Name:</strong></TableCell>
                  <TableCell>{participantDetails.userData?.userName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Participated Count:</strong></TableCell>
                  <TableCell>{participantDetails.participationCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Status:</strong></TableCell>
                  <TableCell>{participantDetails.participantStatus}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="datatable">
          <DataGrid
            className="datagrid"
            rows={participantHistory} 
            columns={columnData.concat(actionColumn)}  
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetail;
