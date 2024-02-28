import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { Modal, Upload, Button, Space, message } from "antd";
import { UploadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from 'axios';
import { fetchSpotDataById } from "../../DataBase/Spot";
import { spotPicUpdate } from "../../PostData";

const SpotDetails = () => {
  const [spotDetails, setSpotDetails] = useState({});
  const { spotId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const response = await fetchSpotDataById(spotId);
        setSpotDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpotDetails();
  }, [spotId]);

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
      formData.append("spotId", spotId);
      fileList.forEach((file) => {
        formData.append("picture", file.originFileObj);
      });

      // Your API endpoint for uploading spot images
      await spotPicUpdate(formData);

      setIsModalVisible(false);
      setFileList([]);
      message.success("Images uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Failed to upload images. Please try again.");
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % spotDetails.spotPictureList.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + spotDetails.spotPictureList.length) % spotDetails.spotPictureList.length);
  };

  return spotDetails ? (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <Button className="prevButton" onClick={handlePrevImage} icon={<LeftOutlined />}></Button>
          <div className="left">
            {spotDetails.spotPictureList && (
              <img
                src={spotDetails.spotPictureList[currentImageIndex]}
                alt="spotPicture"
                className="itemImg"
                style={{
                  width: "100%",
                  minHeight: "300px",
                  maxHeight: "300px",
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />
            )}
          </div>
          <Button className="nextButton" onClick={handleNextImage} icon={<RightOutlined />}></Button>
          <div className="right">
            <h1 className="title">Tourist Spot Information</h1>
            <div className="item">
              <div className="details" style={{display:'flex',flexDirection:'column'}}>
                <h1 className="itemTitle">{spotDetails.spotName}</h1>
                <label>People count: {spotDetails.peopleCount}</label>
                <label>Description: {spotDetails.description}</label>
                <label>Location: {spotDetails.location?.street},{spotDetails.location?.city},{spotDetails.location?.state},{spotDetails.location?.country},{spotDetails.location?.postalCode}</label>
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
          <List spotName={spotDetails.spotName} />
        </div>
      </div>
    </div>
  ) : (
    <>loading....</>
  );
};

export default SpotDetails;
