import axiosInstance from "../pages/login/axiosinstance";
import { fetchUserDataById } from "./User";
import { message } from "antd";

export const fetchFeedBacks=async()=>{
    try{
        const response=await axiosInstance.get(`/Admin/AdminFeedBack`);
        const responseWithUserData=await Promise.all(
            response.data.map(async(feedback)=>{
                const userData=await fetchUserDataById(feedback.userId);
                return {
                    ...feedback,
                    userData:userData,
                }
            })
        )
        return responseWithUserData;
    }catch(error){
        console.log(error);
    }
}

export const postFeedBackReply=async(feedBack,reply)=>{
    try{
        const response=await axiosInstance.post(`/Admin/postReplyAdminFeedBack`,{...feedBack,adminReply:reply});
        message.success(response.data);
    }catch(error){
        console.log(error);
    }
}

export const deleteFeedBack=async(id)=>{
    try{
        const response=await axiosInstance.delete(`/Admin/AdminFeedBack/${id}`);
        message.success(response.data);
    }catch(error){
        console.log(error);
    }
}