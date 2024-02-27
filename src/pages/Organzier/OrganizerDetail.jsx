import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './OrganizerDetail.scss';
import { fetchOrganizedGroups, fetchOrganizerDataById, fetchOrganizerDetailsById } from '../../DataBase/Organizer';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const OrganizerDetail = () => {
  const { organizerId } = useParams();
  const [organizerDetails, setOrganizerDetails] = useState({});
  const [groupData, setGroupData] = useState([]);
  useEffect(async() => {
    const data=await fetchOrganizerDataById(organizerId);
    setOrganizerDetails(data);
    try {
      const response = await fetchOrganizedGroups(data.userId);
      const grpWithId = response.map((grp) => ({
        ...grp,
        id: grp.groupId,
      }));
      setGroupData(grpWithId);
    } catch (error) {
      console.error(error);
    }
  }
  , [organizerId]);
  console.log(groupData);
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
<div>
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={2} align="center">
          <h2>Organizer Details</h2>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell><strong>Organizer ID:</strong></TableCell>
        <TableCell>{organizerDetails.organizerId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>User ID:</strong></TableCell>
        <TableCell>{organizerDetails.userId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>User Name:</strong></TableCell>
        <TableCell>{organizerDetails.userData?.userName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>Organized Count:</strong></TableCell>
        <TableCell>{organizerDetails.organizedCount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>Status:</strong></TableCell>
        <TableCell>{organizerDetails.organizerStatus}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</div>
<div className="datatable">
          
          <DataGrid
            className="datagrid"
            rows={groupData} 
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

export default OrganizerDetail;
