import { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchEventsData } from "../../DataBase/Event";
import { fetchTouristSpotsData } from "../../DataBase/Spot";

export const EventChart = ({ aspect, title }) => {
  const [eventdata,setEventdata]=useState([]);
  useEffect(()=>{
    const fetch=async()=>{
      const response=await fetchEventsData();
      setEventdata(response);
    }
    fetch();
  },[])
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={eventdata}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="eventName" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="peopleCount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#peopleCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


export const SpotChart = ({ aspect, title }) => {
  const [spotData,setSpotData]=useState([]);
  useEffect(()=>{
    const fetch=async()=>{
      const response=await fetchTouristSpotsData();
      setSpotData(response);
    }
    fetch();
  },[])
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={spotData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="spotName" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="peopleCount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#peopleCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
