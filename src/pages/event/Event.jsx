import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import './EventData.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { eventDelete } from "../../components/DeleteStorage";
import { Button, Modal, Upload, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchEventsData } from "../../DataBase/Event";
import { eventPicUpdate } from "../../PostData";

const Eventdatatable = () => {
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await fetchEventsData();
            setData(response);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this event?");
        if (confirmed) {
            try {
                const response = await eventDelete(id);
                alert(response.data);
                setData((prevData) => prevData.filter((event) => event.eventId !== id));
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    const showModal = (eventId) => {
        setSelectedEventId(eventId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedEventId(null);
        setFileList([]);
    };

    const handleFileChange = (info) => {
        setFileList(info.fileList);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("eventId", selectedEventId);
            fileList.forEach(file => {
                formData.append("picture", file.originFileObj);
            });
    console.log(formData);
            await eventPicUpdate(formData);
            setIsModalVisible(false);
            setFileList([]);
            setSelectedEventId(null);
            message.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            message.error('Failed to upload images. Please try again.');
        }
    };

    const columns = [
        { field: "eventId", headerName: "Event ID", width: 100 },
        { field: "eventName", headerName: "Event Name", width: 200 },
        { field: "location", headerName: "Location", width: 150 ,renderCell:(params)=>{
            return(
                <>
                {params.row.location?.state}
                </>
            )
        }},
        { field: "startDate", headerName: "Start Date", width: 150 },
        { field: "endDate", headerName: "End Date", width: 150 },
        { field: "eventStatus", headerName: "Event Status", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/event/${params.row.eventId}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.eventId)}
                        >
                            Delete
                        </div>
                        <div className="aadpotho" onClick={() => showModal(params.row.eventId)}>
                            Add Images
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="eventdatatable" style={{ height: "500px" }}>
                    <div className="eventdatatableTitle" style={{ display: 'flex', flexDirection: 'row' }}>
                        <Link to="/Event/newEventForm">
                            <Button variant="contained">Add New Event</Button>
                        </Link>
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        getRowId={(row) => row.eventId}
                    />
                    {/* Image Upload Modal */}
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
        </div>
    );
};

export default Eventdatatable;
