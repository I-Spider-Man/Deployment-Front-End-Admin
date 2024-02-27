import axiosInstance from "../pages/login/axiosinstance";

export const fetchOrganizerDataByUserId=async(id)=>{
  try{
    console.log(id)
    const organizer=await axiosInstance.get(`/User/Organizer/${id}`);
    console.log(organizer)
    return organizer.data;
    }
    catch(error){
      console.log(error);
    }
}
export const fetchOrganizerDataById = async(id)=>{
    try{
      const organizer = await axiosInstance.get(`/Admin/organizers/${id}`)
    .then(async (organizer) => {
      return axiosInstance.get(`/User/${organizer.data.userId}`)
        .then((userData) => {
          return {
            ...organizer.data,
            userData: userData.data
          };
        });
    });
    console.log(organizer);
      return organizer;
      
    }catch(error){
      console.log("error while fetching organizer by Id :" + error);
    }
  }
  export const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
  export const fetchOrganziersData = async () => {
    try {
        const response = await axiosInstance.get(`/Admin/organizers`);
        const organizerWithUserData=await Promise.all(
           response.data.map(async(organizer)=>{
          const response1=await axiosInstance.get(`/Admin/users/${organizer.userId}`)
          return {
            ...organizer,
            userData:response1.data,
          };
        })
        );
        return organizerWithUserData;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
  };
  export const fetchOrganizedGroups=async(userId)=>{
    try{
        const response=await axiosInstance.get(`/organizer/allGroupsOrganizedByOrganizer/${userId}`);
        const groupWithOrganizerData=await Promise.all(
          response.data.map(async(group)=>{
              const res=await fetchOrganizerDataById(group.organizerId);
              return {
                  ...group,
                  organizerData: res,
              }
          })
      )
      return groupWithOrganizerData;
    }catch(error){
        console.log(error);
        return [];
    }
}