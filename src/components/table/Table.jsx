import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { fetchCorrespondingGroupData } from "../../DataBase/Group";
const List = ({eventName,spotName}) => {
  const [activeGrp,setActiveGrp]=useState([]);
  useEffect(()=>{
    async function fetchActiveGrp(){
          const response=await fetchCorrespondingGroupData(eventName,spotName);
    setActiveGrp(response);
    }
    fetchActiveGrp();
  },[eventName,spotName])
  console.log(activeGrp);
   return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Group ID</TableCell>
            <TableCell className="tableCell">Active Events</TableCell>
            <TableCell className="tableCell">Organizer</TableCell>
            <TableCell className="tableCell">Till Date</TableCell>
            <TableCell className="tableCell">No. Of Participants</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeGrp.length > 0 ? <>{activeGrp.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.groupId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.groupName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.organizerData.userData.userName}</TableCell>
              <TableCell className="tableCell">{row.dateTo}</TableCell>
              <TableCell className="tableCell">{row.participantsLimit}</TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell> */}
              <TableCell className="tableCell">
                <span className={`status ${row.groupStatus}`}>{row.groupStatus}</span>
              </TableCell>
            </TableRow>
          ))}</> :(
            <TableRow><TableCell>NO ACTIVE GROUPS</TableCell></TableRow>
          )
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
