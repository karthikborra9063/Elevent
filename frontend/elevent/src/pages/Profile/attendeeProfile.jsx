import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedUser((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/attendee/profileupdate`,editedUser,{
        withCredentials: true,
      });
      const updatedUser =response.data.user;
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/attendee/profile", {
        withCredentials: true,
      })
      console.log(response.data.user);
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="profile-card">
        <Card.Body>
          <div className="text-center position-relative">
            <img src={editedUser?.profileImage || "/images/sampleProfile.webp"} alt="Profile" className="profile-img" />
            <label htmlFor="imageUpload" className="camera-icon">
              <FaCamera />
            </label>
            <input type="file" id="imageUpload" accept="image/*" className="d-none" onChange={handleImageChange} />
          </div>
          <h4 className="text-center mt-2">Profile</h4>
          <hr />
          {isEditing ? (
            <>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="userName" value={editedUser?.userName || ""} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={editedUser?.email || ""} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name="mobileNumber" value={editedUser?.mobileNumber || ""} onChange={handleEditChange} />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={saveChanges}>
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user?.userName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Mobile:</strong> {user?.mobileNumber}
              </p>
              <div className="d-flex justify-content-between">
                <Button variant="warning" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => navigate("/")}>
                  Close
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
    <style>{`
      .cursor-pointer { cursor: pointer; }
      .profile-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000;
      }
      .profile-card {
        width: 350px; background: white;
        padding: 20px; border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
      }
      .profile-img {
        width: 100px; height: 100px; border-radius: 50%;
        object-fit: cover;
        position: relative;
      }
      .camera-icon {
        position: absolute; bottom: 0;
        padding: 5px;
        border-radius: 50%; cursor: pointer;
      }
    `}</style>
  </>
  );
}

export default ProfilePage;
