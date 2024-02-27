import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import UserDatatable from "./UserDatatable"


const UserList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <UserDatatable/>
      </div>
    </div>
  )
}

export default UserList;