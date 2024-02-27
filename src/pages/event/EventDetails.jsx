import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { Modal, Upload, Button, Space, message } from "antd";
import { UploadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { fetchEventDataByEventId } from "../../DataBase/Event";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { eventId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetchEventDataByEventId(eventId);
        setEventDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("eventId", eventId);
      fileList.forEach((file) => {
        formData.append("picture", file.originFileObj);
      });

      // Your API endpoint for uploading event images
      await axios.post("${BaseUrl}/updateEventPicture", formData);

      setIsModalVisible(false);
      setFileList([]);
      message.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Failed to upload images. Please try again.");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % eventDetails.eventPictureList.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + eventDetails.eventPictureList.length) % eventDetails.eventPictureList.length);
  };

  return eventDetails ? (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <Button className="prevButton" onClick={handlePrevImage} icon={<LeftOutlined />}></Button> 
          <div className="left">
            {eventDetails.eventPictureList &&
              <img
                src={eventDetails.eventPictureList[currentImageIndex]} 
                alt="eventPicture"
                className="itemImg"
                style={{
                  width: "100%",
                  minHeight: "300px",
                  maxHeight: "300px",
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
            }
          </div>
          <Button className="nextButton" onClick={handleNextImage} icon={<RightOutlined />}></Button> 
          <div className="right">
            <h1 className="title">Event Information</h1>
            <div className="item">
              <div className="details" style={{display:'flex',flexDirection:'column'}}>
                <h1 className="itemTitle">{eventDetails.eventName}</h1>
                <label>People count: {eventDetails.peopleCount}</label>
                <label>Event Status: {eventDetails.eventStatus}</label>
                <label>Description: {eventDetails.description}</label>
                <label style={{display:'flex',flexDirection:'column'}}>Happening on 
                <label>Location: {eventDetails.location?.street},{eventDetails.location?.city},{eventDetails.location?.state},{eventDetails.location?.country},{eventDetails.location?.postalCode}</label>
                <label>Starts on: {eventDetails.startDate}</label> <label>Ends on: {eventDetails.endDate}</label> </label>
              </div>
            </div>
            <Button type="primary" onClick={showModal}>
              Add Images
            </Button>
            <Modal
              title="Upload Images"
              visible={isModalVisible}
              onOk={handleUpload}
              onCancel={handleCancel}
            >
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
              <Space direction="vertical" style={{ width: "100%" }}>
                {fileList.map((file) => (
                  <span key={file.uid}>{file.name}</span>
                ))}
              </Space>
            </Modal>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List eventName={eventDetails.eventName} />
        </div>
      </div>
    </div>
  ) : (
    <>loading....</>
  );
};

export default EventDetails;
