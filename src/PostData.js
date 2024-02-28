import axiosInstance from "./pages/login/axiosinstance";

export const postEvent=async (formData)=>{
    try{
        await axiosInstance.post(`/Admin/events`, formData, {headers:{'Content-Type':'multipart/form-data',},}).then((response)=>{
        console.log(response); 
        if(response.status===201){
            alert(response.data);
            window.location.reload();
        }   
        return response});
    }catch(error){
        console.error("error on event posting :",error);
        return error.response;
    }
}
export const eventPicUpdate=async (formData)=>{
    try{
        await axiosInstance.post(`/updateEventPicture`,formData);
    }catch(error){
        console.log(error);
    }
}
export const spotPicUpdate=async (formData)=>{
    try{
        await axiosInstance.post(`/updateSpotPicture`,formData);
    }catch(error){
        console.log(error);
    }
}
export const postSpot=async (formData)=>{
    try{
        await axiosInstance.post(`/Admin/touristSpot`,formData,{headers:{'Content-Type':'multipart/form-data',},}).then((response)=>{
        console.log(response);
        if(response.status===201){
            alert(response.data);
            window.location.reload();
        }    
        return (response)});
    }catch(error){
        console.error("error on posting spot :", error);
        return error.response;
    }
}