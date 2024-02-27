import React, { useState } from 'react';
import './NewEventForm.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {LoadingButton} from '@mui/lab';
import { postEvent } from '../../PostData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CircularProgress, styled } from '@mui/material';
import { message } from 'antd';
const NewEventForm = () => {
  const [submitProcess,setSubmitProcess]=useState(false);
  const [location,setLocation] = useState(
    {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    }
  )
  const [eventData, setEventData] = useState({
    eventName: '',
    location: location,
    startDate: '',
    endDate: '',
    description: ''
  });

  const [eventPicture,setEventPicture]=useState(null);
  const [privewURL,setPreviewURL]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLocationChange=(e)=>{
    const {name, value}=e.target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      location: {
        ...prevEventData.location,
        [name]: value,
      },
    }));
  }
const trimEventData = () => {
  const trimmedEventData = {};
  for (const key in eventData) {
    if (typeof eventData[key] === 'string') {
      trimmedEventData[key] = eventData[key].trim();
    } else {
      trimmedEventData[key] = eventData[key];
    }
  }
  return trimmedEventData;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitProcess(true);
    const formData=new FormData();
    if(eventPicture){
      formData.append('eventPicture',eventPicture);
      const trimedEventData=trimEventData();
      if(!Object.values(trimedEventData).some(value=>!value)){
        formData.append('newEvent',JSON.stringify(trimedEventData));
      }else{
        return alert("enter all event details");
      }
    }else{
      return alert("provide event image");
    }
    try {
      
      const response=await postEvent(formData);
      if(response.status===200){
        message.success(response.data);
        window.location.reload();
      }
      else{
        message.error(response.data);
        return null;
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }finally{
      setSubmitProcess(false);
    }
  };
  const handleStartDateChange = (newStartDate) => {
    setEventData((prevData) => ({
      ...prevData,
      startDate: dayjs(newStartDate).format('YYYY-MM-DD'), // Assuming you want to store the date as a string in ISO format
    }));
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const handlePicture=(e)=>{
    const file=e.target.files[0]
    if((Math.floor(file.size/1024))<500){
      setEventPicture(file);
      if(file){
        const fileRead=new FileReader();
        fileRead.onloadend=()=>{
          setPreviewURL(fileRead.result)
        }
        fileRead.readAsDataURL(file);
      }
      else{
        setPreviewURL(null);
      }
    }else{
      alert("picture size needs to be less then 500kb");
    }
  }
  const handleEndDateChange = (newEndDate) => {
    if (dayjs(newEndDate).isBefore(eventData.startDate)) {
      alert("End date should not be before start date.");
      setEventData((prevData)=>(
        {
        ...prevData,
        endDate: null
      }))
    } else {
      setEventData((prevData) => ({
        ...prevData,
        endDate: dayjs(newEndDate).format('YYYY-MM-DD'),
      }));
    }
  };
  return (
    <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
    <div className="newEventForm">
      <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Event Name:
                    <input
                        type="text"
                        name="eventName"
                        value={eventData.eventName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Location:
                    <div style={{padding:'10px', borderStyle: 'ridge'}}>
                      <label>
                        Street:
                        <input
                        type="text"
                        name="street"
                        value={eventData.location.street}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        City:
                        <input
                        type="text"
                        name="city"
                        value={eventData.location.city}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        State:
                        <input
                        type="text"
                        name="state"
                        value={eventData.location.state}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        Country:
                        <input
                        type="text"
                        name="country"
                        value={eventData.location.country}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        PostalCode:
                        <input
                        type="number"
                        name="postalCode"
                        value={eventData.location.postalCode}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                    </div>
                    
                </label>
                <label>
                  Start Date:
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={eventData.startDate}
                      onChange={handleStartDateChange}
                      disablePast
                      format="YYYY-MM-DD"
                    />
                  </LocalizationProvider>
                </label>
                <label>
                  End Date:
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={eventData.endDate}
                      onChange={handleEndDateChange}
                      format="YYYY-MM-DD"
                      disablePast
                    />
                  </LocalizationProvider>
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload file
                  <VisuallyHiddenInput type="file" onChange={handlePicture}/>
                </Button>
                {privewURL && (<><img src={privewURL} alt='preview' style={{width:"100%",height:"300px"}}/></>)}
                <LoadingButton type="submit" variant='contained' sx={{width:'100%',height:'80px'}} loading={submitProcess} loadingIndicator={<CircularProgress sx={{color:'white',height:15,width:15 }}/>}>Submit</LoadingButton>
            </form>
    </div>
    </div>
    </div>
  );
};

export default NewEventForm;