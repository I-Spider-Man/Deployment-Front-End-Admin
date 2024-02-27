

import axiosInstance from "../pages/login/axiosinstance";

export const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/Admin/users");
      const responseWithPicture=await Promise.all(
        response.data.map(async(user)=>{
          const picture=await axiosInstance.get(`/User/userProfile/${user.userId}`);
          return {
            ...user,
            userProfile:pictureUrl(picture.data),
          };
        })
      )
      return responseWithPicture;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  
  export const fetchUserDataById = async (Id) => {
    try {
      const response = await axiosInstance.get(`/Admin/users/${Id}`);
      const picture=await axiosInstance.get(`/User/userProfile/${response.data.userId}`);
      return {
        ...response.data,
        userProfile:pictureUrl(picture.data)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  export const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
  