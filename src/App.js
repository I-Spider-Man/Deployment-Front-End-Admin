import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, spotInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";


import Groups from "./pages/group/Groups";
import GroupDetails from "./pages/group/GroupDetails";


import Organizers from "./pages/Organzier/Organizers";
import OrganizerDetail from "./pages/Organzier/OrganizerDetail";


import EventDetails from "./pages/event/EventDetails";
import Eventdatatable from "./pages/event/Event";
import NewEventForm from "./pages/event/NewEventForm";


import Participants from "./pages/participants/Participants";
import ParticipantDetail from "./pages/participants/ParticipantDetails";



import UserList from "./components/User/UserList";
import SingleUser from "./components/User/SingleUser";

import TouristSpot from "./pages/touristSpot/TouristSpot";
import NewSpot from "./pages/touristSpot/NewSpot";
import SpotDetails from "./pages/touristSpot/SpotDetails";
import FeedBack from "./pages/feedBack/FeedBack";
import SignInSide from "./pages/login/Login";
import AdminRegistration from "./pages/login/Rigistration"
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="/dashboard" element={<Home />} />
            <Route path="api/login/reg" element={<AdminRegistration />}/>
            <Route index element={<SignInSide />} />
            <Route path="logout" element={<Logout />} />

            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<SingleUser />} />
            </Route>
            <Route path="Event">
              <Route index element={<Eventdatatable />} />
              <Route path=":eventId" element={<EventDetails />} />
              <Route
                path="newEventForm"
                element={<NewEventForm inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="participants">
              <Route index element={<Participants/>}/>
              <Route path=":participantId" element={<ParticipantDetail />}/> 
            </Route>
            <Route path="touristspots">
              <Route index element={<TouristSpot/>}/>
              <Route
                path="newSpot"
                element={<NewSpot inputs={spotInputs} title="Add New Tourist spots" />}
              />
              <Route path=":spotId" element={<SpotDetails />} />
            </Route>
            <Route path="feedBack">
              <Route index element={<FeedBack/>}/>
            </Route>
            <Route path="organizer">
              <Route index element={<Organizers/>}/>
              <Route path=":organizerId" element={<OrganizerDetail />} />
            </Route>
            <Route path="group">
              <Route index element={<Groups/>}/>
              <Route path=":groupId" element={<GroupDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
