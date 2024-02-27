import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { EventChart, SpotChart } from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="groups" />
          <Widget type="events" />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <EventChart title="People Count in Events" aspect={2 / 1} />
          <SpotChart title="People Count in TouristSpots" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Active Groups</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
