import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import axios from 'axios';
import './singleuser.scss';
import { Avatar } from 'antd';
import { fetchUserDataById } from '../../DataBase/User';
import { fetchOrganizerDataById, fetchOrganizerDataByUserId } from '../../DataBase/Organizer';
import { fetchParticipantDetailsByUserId, fetchParticipatedGroups } from '../../DataBase/Participant';

const SingleUser = () => {
  const [userData, setUserData] = useState({});
  const { userId } = useParams(); 
  const [ParticipantData,setParticipantData]=useState();
  const [organizerData,setOrganizerData]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserDataById(userId);
        const participant=await fetchParticipantDetailsByUserId(userId);
        const organizer=await fetchOrganizerDataByUserId(userId)
        setUserData(response);
        setParticipantData(participant);
        setOrganizerData(organizer);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]); 

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Information</h1>
            <div className="item">
              <Avatar
                src={userData.userProfile}
                alt={userData.userName}
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.userName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData.userEmail}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Birth:</span>
                  <span className="itemValue">{userData.dateOfBirth}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{userData.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">About User:</span>
                  <span className="itemValue">{userData.aboutUser? userData.aboutUser : 'none'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Role:</span>
                  <span className="itemValue">{userData.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div style={{display:'flex',flexDirection:'row',padding:'10px',gap:'5px'}}>
            <div style={{height:'100px',width:'50%',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',backgroundColor:'whitesmoke'}}>
            <h2>Organizer Details</h2>
            {organizerData ? organizerData.organizedCount : 0}
            </div>
            <div style={{height:'100px',width:'50%',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',backgroundColor:'whitesmoke'}}>
            <h2>ParticipantDetails</h2>
            {ParticipantData ? ParticipantData.participationCount : 0}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SingleUser;