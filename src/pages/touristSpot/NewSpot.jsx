import React, { useState } from 'react';
import '../event/NewEventForm.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {LoadingButton} from '@mui/lab';
import { postSpot } from '../../PostData';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CircularProgress, styled } from '@mui/material';
import { message } from 'antd';
const NewSpot = () => {
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
  const [spotData, setSpotData] = useState({
    spotName: '',
    location: location,
    description: ''
  });

  const [spotPicture,setSpotPicture]=useState(null);
  const [privewURL,setPreviewURL]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpotData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLocationChange=(e)=>{
    const {name, value}=e.target;
    setSpotData((prevSpotData) => ({
      ...prevSpotData,
      location: {
        ...prevSpotData.location,
        [name]: value,
      },
    }));
  }
const trimSpotData = () => {
  const trimmedSpotData = {};
  for (const key in spotData) {
    if (typeof spotData[key] === 'string') {
      trimmedSpotData[key] = spotData[key].trim();
    } else {
      trimmedSpotData[key] = spotData[key];
    }
  }
  return trimmedSpotData;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitProcess(true);
    const formData=new FormData();
    if(spotPicture){
      formData.append('spotPicture',spotPicture);
      const trimmedSpotData=trimSpotData();
      if(!Object.values(trimmedSpotData).some(value=>!value)){
        formData.append('newSpot',JSON.stringify(trimmedSpotData));
      }else{
        return alert("enter all spot details");
      }
    }else{
      return alert("provide spot image");
    }
    try {
      
      const response=await postSpot(formData);
      if(response.status===200){
        message.success(response.data);
        window.location.reload();
      }
      else{
        message.error(response.data);
        return null;
      }
    } catch (error) {
      console.error('Error creating spot:', error);
    }finally{
      setSubmitProcess(false);
    }
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
      setSpotPicture(file);
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
  return (
    <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
    <div className="newEventForm">
      <h2>Add New Tourist Spot</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Spot Name:
                    <input
                        type="text"
                        name="spotName"
                        value={spotData.spotName}
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
                        value={spotData.location.street}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        City:
                        <input
                        type="text"
                        name="city"
                        value={spotData.location.city}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        State:
                        <input
                        type="text"
                        name="state"
                        value={spotData.location.state}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        Country:
                        <input
                        type="text"
                        name="country"
                        value={spotData.location.country}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                      <label>
                        PostalCode:
                        <input
                        type="number"
                        name="postalCode"
                        value={spotData.location.postalCode}
                        onChange={handleLocationChange}
                        required
                        />
                      </label>
                    </div>
                    
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={spotData.description}
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

export default NewSpot;