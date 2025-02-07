import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import axios from "axios";

const AttendeeProfile = ({ attendee, show, handleClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(attendee || {});
  const [profileImg, setProfileImg] = useState(attendee?.profileImg || "/images/sampleProfile.webp");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (show) {
      fetchProfileData();
    }
  }, [show]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/api/attendee/profile");
      const { user } = response.data;
      setProfileData(user);
      setProfileImg(user.profileImg || "/images/sampleProfile.webp");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileData({ ...profileData, profileImg: file }); // Ensure profileImg in state is updated
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", profileData.userName || "");
      formData.append("email", profileData.email || "");
      formData.append("mobileNumber", profileData.mobileNumber || "");
      if (profileData.profileImg instanceof File) {
        formData.append("profileImg", profileData.profileImg); // Include profile image if updated
      }

      const response = await axios.put("/api/attendee/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedProfile = response.data.user; // Expecting user in the response
      setProfileData(updatedProfile);
      setProfileImg(updatedProfile.profileImg || "/images/sampleProfile.webp");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="attendee-profile-modal"
      style={{
        backdropFilter: "blur(5px)",
        zIndex: 1050,
      }}
    >
      <Modal.Body className="bg-dark text-light rounded-lg p-4">
        <div className="text-center">
          <div
            className="profile-img-container position-relative"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              border: "4px solid #6c757d",
              position: "relative",
            }}
          >
            <img
              src={profileImg}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {isEditing && (
              <>
                <FaCamera
                  className="text-light position-absolute"
                  style={{
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                    background: "#6c757d",
                    borderRadius: "50%",
                    padding: "5px",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <h3 className="mt-3">{profileData?.userName || "User Name"}</h3>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center mb-3">
            <FaEnvelope className="me-3 text-primary" />
            {isEditing ? (
              <Form.Control
                type="email"
                name="email"
                value={profileData.email || ""}
                onChange={handleInputChange}
              />
            ) : (
              <div>
                <strong>Email: </strong>
                {profileData?.email || "user@example.com"}
              </div>
            )}
          </div>
          <div className="d-flex align-items-center mb-3">
            <FaPhone className="me-3 text-success" />
            {isEditing ? (
              <Form.Control
                type="text"
                name="mobileNumber"
                value={profileData.mobileNumber || ""}
                onChange={handleInputChange}
              />
            ) : (
              <div>
                <strong>Mobile: </strong>
                {profileData?.mobileNumber || "Not Provided"}
              </div>
            )}
          </div>
          {!isEditing && (
            <div className="d-flex align-items-center mb-3">
              <strong>Registered Events: </strong>
              {profileData?.registeredEvents?.length || 0}
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          {isEditing ? (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AttendeeProfile;