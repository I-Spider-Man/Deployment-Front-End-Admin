import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { spotDelete } from '../../components/DeleteStorage';
import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import { Modal, Upload, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { fetchTouristSpotsData } from '../../DataBase/Spot';
import { spotPicUpdate } from '../../PostData';

function TouristSpot() {
    const [spotRows, setSpotRows] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [selectedSpotId, setSelectedSpotId] = useState(null);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const response = await fetchTouristSpotsData();
                const rowsWithId = response.map((spot) => ({
                    ...spot,
                    id: spot.spotId,
                }));
                setSpotRows(rowsWithId);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSpots();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this spot?");
        if (confirmed) {
            try {
                const response = await spotDelete(id);
                alert(response.data);
                setSpotRows((prevRows) => prevRows.filter((spot) => spot.spotId !== id));
            } catch (error) {
                console.error("Error deleting spot:", error);
            }
        }
    };

    const showModal = (spotId) => {
        setSelectedSpotId(spotId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedSpotId(null);
        setFileList([]);
    };

    const handleFileChange = (info) => {
        setFileList(info.fileList);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("spotId", selectedSpotId);
            fileList.forEach(file => {
                formData.append("picture", file.originFileObj);
            });
            await spotPicUpdate(formData);
            setIsModalVisible(false);
            setFileList([]);
            setSelectedSpotId(null);
            message.success('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            message.error('Failed to upload images. Please try again.');
        }
    };

    const eventColumns = [
        { field: "spotId", headerName: "ID", width: 70 },
        { field: "spotName", headerName: "Tourist Spot", width: 700 },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/touristspots/${params.row.spotId}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row.spotId)}>
                            Delete
                        </div>
                        <div className="aadpotho" onClick={() => showModal(params.row.spotId)}>
                            Add Images
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div className="datatable" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 1 }}>
                            <Link to="/touristspots/newSpot"><Button variant="contained" >Add Spot</Button></Link>
                        </Stack>
                        <DataGrid
                            className="datagrid"
                            rows={spotRows}
                            columns={eventColumns.concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                        />
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
        </div>
    )
}

export default TouristSpot;
