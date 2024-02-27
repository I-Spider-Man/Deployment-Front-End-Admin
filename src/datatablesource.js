import { Avatar } from "@mui/material";

export const userColumns = [
  { field: "userId", headerName: "ID", width: 70 },
  {
    field: "userName",
    headerName: "User",
    width: 230,
    renderCell:(params)=>{
      return(<div className="cellWithImg">
      <Avatar className="cellImg" src={params.row.userProfile} alt={params.row.userName} />
      {params.row.userName}
      </div>);
    }
  },
  {
    field: "userEmail",
    headerName: "Email",
    width: 230,
  },
  
];
