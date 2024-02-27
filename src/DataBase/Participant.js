
import { fetchUserDataById } from "./User";
import { fetchGrpDataById } from "./Group";
import { fetchOrganizerDataById } from "./Organizer";
import axiosInstance from "../pages/login/axiosinstance";
export const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
  export const fetchParticipantDetailsById = async (participantId) => {
    try {
      const response = await axiosInstance.get(`/Admin/participants/${participantId}`);
      const userData=await fetchUserDataById(response.data.userId);
      return {
        ...response.data,
        userData:userData,
      }
    } catch (error) {
      console.error('Error fetching participant details:', error);
    }
  };
export const fetchParticipantsData=async ()=>{
    try{
      const response = await axiosInstance.get(`/Admin/participants`);
      const participantWithUserData=await Promise.all(
        response.data.map(async(participant)=>{
          const userdata=await fetchUserDataById(participant.userId);
          return {
            ...participant,
            userData:userdata
          }
        })
      )
      console.log(participantWithUserData);
      const participantWithGroupData=await Promise.all(
        participantWithUserData.map(async(participant)=>{
          const group=await fetchGrpDataById(participant.groupId);
          return {
            ...participant,
            groupData:group
          };
        })
      );
      console.log(participantWithGroupData);
      return participantWithGroupData;
    }catch(error){
      console.log(error);
      return []
    }
  }
  export const fetchParticipantDetailsByUserId=async(id)=>{
    try{
      const participant=await axiosInstance.get(`/User/Participant/${id}`);
        return participant.data;
      }
      catch(error){
        console.log(error);
      }
  }
  export const fetchParticipatedGroups=async(userId)=>{
    try{
        const response=await axiosInstance.get(`/Participant/allGroupsParticipated/${userId}`);
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