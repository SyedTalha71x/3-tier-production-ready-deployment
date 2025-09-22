/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Modal, Form, Input, Upload, Button, Row, Col, Spin, message } from "antd";
import axios from "axios";
import { useStateManage } from "../../Context/StateContext";
import moment from "moment";

const Page = () => {
  const { API_URL } = useStateManage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/show-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.formattedResponse);
      } catch (error) {
        message.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [API_URL]);

  useEffect(() => {
    if (data) {
      setFullName(data.full_name);
      setDob(moment(data.date_of_birth).format("YYYY-MM-DD"));
      setPosition(data.position);
      setBio(data.summary);
      setCity(data.city);
      setCountry(data.country);
      setLanguage(data.language);
      setProfilePicture(data.profile_picture);
    }
  }, [data]);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("date_of_birth", dob);
      formData.append("position", position);
      formData.append("summary", bio);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("language", language);

      if (profilePicture) {
        formData.append("file", profilePicture);
      }

      await axios.post(`${API_URL}/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Your Profile has been updated successfully");
      setIsModalVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      message.error("Failed to update your profile. Please try again!");
    }
  };

  const handleProfilePictureChange = (info) => {
    if (info.file.status === "done") {
      setProfilePicture(info.file.originFileObj);
    }
  };

  return (
    <div className="cursor-pointer overflow-hidden w-full lg:p-3 md:p-3 sm:p-0 p-0">
      <div className="flex gap-1 items-center">
        <span className="text-2xl text-green-600">
          <UserOutlined />
        </span>
        <h1 className="text-xl font-extrabold text-gray-100">User Profile</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <div className="user_profile mt-5">
          <div className="bg-[#1f1f28] p-5 text-white h-full w-full rounded-xl">
            <div className="flex lg:flex-row md:flex-row flex-col sm:flex-col lg:items-center md:items-center sm:items-start items-start gap-4 w-full">
              <div>
                <img
                  className="h-24 w-24 rounded-lg object-cover"
                  src={profilePicture || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"}
                  alt="User Avatar"
                />
              </div>
              <div className="flex-1 w-full">
                <h1 className="text-xl text-white font-bold">{fullName}</h1>
                <div className="flex flex-wrap gap-2 items-center text-blue-500 text-sm mt-1">
                  <span>{data?.email}</span>
                  <span>{data?.phone}</span>
                  <span>{data?.website}</span>
                </div>
                <div className="mt-1 text-gray-400 text-sm lg:w-3/5 w-full">
                  <p>{bio}</p>
                </div>
              </div>
            </div>

            <div className="description_detail mt-10 w-full">
              <h1 className="text-xl font-bold text-gray-100">Description</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-full">
                <div className="w-full">
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">Full Name :</span> {fullName}
                  </p>
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">Date of Birth :</span> {new Date(dob).toLocaleDateString()}
                  </p>
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">Position :</span> {position}
                  </p>
                </div>
                <div className="w-full">
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">Languages :</span> {language}
                  </p>
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">Country :</span> {country}
                  </p>
                  <p className="border-b border-blue-500 pb-2 p-1 text-gray-400 text-sm mb-2">
                    <span className="text-white text-sm">City :</span> {city}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end items-center gap-2 mt-10 w-full">
              <button
                className="flex items-center justify-center py-2 px-8 text-sm text-white bg-slate-500 rounded-lg"
                onClick={handleEditClick}
              >
                <EditOutlined className="mr-2" /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Edit User Profile"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-purple-600 text-white",
        }}
      >
        <Form layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="Full Name">
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Date of Birth">
                <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Position">
            <Input value={position} onChange={(e) => setPosition(e.target.value)} />
          </Form.Item>
          <Form.Item label="Bio">
            <Input.TextArea value={bio} onChange={(e) => setBio(e.target.value)} />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item label="City">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Country">
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Language">
            <Input value={language} onChange={(e) => setLanguage(e.target.value)} />
          </Form.Item>

          <Form.Item label="Profile Picture">
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setProfilePicture(file);
                onSuccess(null, file);
              }}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Page;
