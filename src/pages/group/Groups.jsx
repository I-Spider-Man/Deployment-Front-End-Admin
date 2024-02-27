import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import { groupDelete } from '../../components/DeleteStorage';
import { fetchGroupsData } from '../../DataBase/Group';

function Groups() {
  const [groupData, setGroupData] = useState([]);
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetchGroupsData();
        const grpWithId = response.map((grp) => ({
          ...grp,
          id: grp.groupId,
        }));
        setGroupData(grpWithId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroup();
  }, []);
  const handleDelete=async(id)=>{
    const confirmed = window.confirm("Are you sure you want to delete this Group?");
    if(confirmed){
      try{
        await groupDelete(id);
        setGroupData((prevGrp) => prevGrp.filter((group)=> group.groupId !== id));
        return alert("group deleted");
      }catch(error){
        console.log(error)
      }
    }
      
  }
  console.log(groupData);
  const columnData = [
    { field: 'groupId', headerName: 'Group Id', width: 100 },
    { field: 'groupName', headerName: 'Group Name', width: 200 },
    { field: 'organizerName', headerName: 'Organizer Name', width: 180 ,renderCell:(params)=>(params.row.organizerData.userData.userName)},
    {
      field: 'event/spot',
      headerName: 'eventName/spotName',
      width:200,
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

    { field: 'groupStatus', headerName: 'Group Status',width:150, renderCell: (params) => (
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
          <div className='deleteButton' onClick={()=>handleDelete(params.row.groupId)}>Delete</div>
        </div>
      )
    }}]
    
  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
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
    </div>
  );
}

export default Groups;