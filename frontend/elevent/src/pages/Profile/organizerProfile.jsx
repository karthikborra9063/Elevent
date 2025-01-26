import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Badge, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../../components/common/loadingSpinner";
import { FaCamera } from "react-icons/fa";
import { FaPlus, FaTrash,FaCheck } from "react-icons/fa";

const OrganizerProfile = () => {
  const [organizerData, setOrganizerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({}); // State for form inputs
  const [addData, setAddData] = useState({
    experience: [...(organizerData?.experience || [])],
    achievements: [...(organizerData?.achievements || [])],
  });

  const apiBaseUrl = "http://localhost:8000";

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Assuming formData is accessible here
        formData.profileImg = reader.result;
        setOrganizerData((prevData) => ({
          ...prevData,
          profileImg: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverImageChange = (e) => {
    console.log("hello")
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        
        // Update formData in an immutable way
        const updatedFormData = {
          ...formData,
          coverImage: base64Image, // Corrected typo
        };
  
        // Assuming formData is stored in state or accessible here
        setFormData(updatedFormData);
  
        // Update organizer data for immediate UI update
        setOrganizerData((prevData) => ({
          ...prevData,
          coverImage: base64Image, // Assuming the key is coverImage
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected.");
    }
  };
  
  const fetchOrganizerProfile = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/organizer/profile`, {
        withCredentials: true,
      });
      setOrganizerData(response.data.user);
      setFormData({
        username: response.data.user?.username || "",
        about: response.data.user?.about || "",
        email: response.data.user?.email || "",
        mobileNumber: response.data.user?.mobileNumber || "",
        address: response.data.user?.address || "",
        profileImg:"",
        coverImage:"",
      });
    } catch (err) {
      setError("Failed to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizerProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${apiBaseUrl}/api/organizer/update`, formData, {
        withCredentials: true,
      });
      console.log("Update Response:", response.data);
      setOrganizerData((prevData) => ({ ...prevData, ...formData }));
      setShowModal(false); // Close modal on success
    } catch (err) {
      console.error("Error updating organizer profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };
  const handleAddExperience = () => {
    setAddData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { organization: "", duration: { years: 0, months: 0 } },
      ],
    }));
  };

  const handleAddAchievement = () => {
    setAddData((prevData) => ({
      ...prevData,
      achievements: [...prevData.achievements, ""],
    }));
  };

  const handleChangeExperience = (index, field, value) => {
    const updatedExperience = [...addData.experience];
    updatedExperience[index][field] = value;
    setAddData((prevData) => ({
      ...prevData,
      experience: updatedExperience,
    }));
  };

  const handleChangeAchievement = (index, value) => {
    const updatedAchievements = [...addData.achievements];
    updatedAchievements[index] = value;
    setAddData((prevData) => ({
      ...prevData,
      achievements: updatedAchievements,
    }));
  };

  const handleRemoveExperience = (index) => {
    setAddData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveAchievement = (index) => {
    setAddData((prevData) => ({
      ...prevData,
      achievements: prevData.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleConfirmChanges = () => {
    // Confirm changes to organizerData
    setOrganizerData(addData);
    // Optionally, handle backend connection here (you can send `addData` to the backend)
    alert("Changes confirmed! Ready to send data to backend.");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-danger">{error}</div>;

  const defaultProfileImg = "/images/sampleProfile.webp";
  const defaultCoverImg = "/images/banner.webp";

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#e0e0e0",
        paddingTop: "20px",
      }}
    >
      {/* Cover Image */}
      <div
  style={{
    backgroundImage: `url('${organizerData.coverImage || defaultCoverImg}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "250px",
    width: "80%",
    margin: "0 auto",
    position: "relative",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
    borderRadius: "10px",
    overflow: "hidden", // Ensures no elements spill out
  }}
>
  {/* Camera Icon for Upload */}
  <div
    style={{
      position: "absolute",
      bottom: "10px", // Adjusted padding for better placement
      right: "15px",
      background: "rgba(0, 0, 0, 0.6)",
      borderRadius: "50%",
      padding: "8px",
      cursor: "pointer",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10, // Ensures it is above the overlay
    }}
  >
    <label
      htmlFor="profileImgInput"
      style={{
        cursor: "pointer",
        margin: 0,
        pointerEvents: "auto", // Allow pointer events for the label
      }}
    >
      <FaCamera color="#fff" size={16} />
    </label>
    <input
      type="file"
      id="profileImgInput"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handleCoverImageChange}
    />
  </div>

  {/* Overlay */}
  <div
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 5, // Below the camera icon
    }}
  ></div>
</div>

      <div style={{position:"relative",top:"5rem",right:"5rem"}}>
            <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              zIndex: 10,
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Update Profile
          </Button>
      </div>
      <Container>
      <Row className="justify-content-center">
  {/* Profile Image */}
  <Col
    md={4}
    className="text-center position-relative"
    style={{ marginTop: "-80px", zIndex: 100 }}
  >
    <div style={{ position: "relative", display: "inline-block" }}>
      <Image
        src={organizerData.profileImg || defaultProfileImg}
        roundedCircle
        style={{
          width: "150px",
          height: "150px",
          border: "5px solid #121212",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
          objectFit: "cover",
        }}
      />
      {/* Camera Icon Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "5px", // Closer to the image
          right: "10px",
          background: "rgba(0, 0, 0, 0.6)", // Transparent black background
          borderRadius: "50%",
          padding: "6px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="profileImgInput" style={{ cursor: "pointer", margin: 0 }}>
          <FaCamera color="#fff" size={16} />
        </label>
        <input
          type="file"
          id="profileImgInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfileImageChange}
        />
      </div>
    </div>
    <h3 className="mt-3" style={{ fontWeight: "bold", color: "#ffffff" }}>
      {organizerData.username || "Unknown Organizer"}
    </h3>
    <Badge bg="info" className="mb-2" style={{ fontSize: "14px" }}>
      Event Organizer
    </Badge>
    <p style={{ color: "#b0b0b0", fontStyle: "italic" }}>
      {organizerData.about || "No description available."}
    </p>
  </Col>
</Row>




        {/* Contact Info */}
        <Row>
          <Col md={8} className="mx-auto">
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#1f1f1f",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Contact Information</h4>
                <p>
                  <strong>Email: </strong> {organizerData.email || "Not provided"}
                </p>
                <p>
                  <strong>Mobile: </strong> {organizerData.mobileNumber || "Not available"}
                </p>
                <p> 
                  <strong>Address: </strong>{" "}
                  {`${organizerData.address.street}, ${organizerData.address.city}, ${organizerData.address.state}, ${organizerData.address.postalCode}, ${organizerData.address.country}`}
                </p>
                <Card
        className="mb-4"
        style={{
          backgroundColor: "#292929",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
          color: "#e0e0e0",
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-info">Experience</h4>
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleAddExperience}
            >
              <FaPlus className="me-1" /> Add Experience
            </Button>
          </div>

          {Array.isArray(addData.experience) &&
          addData.experience.length > 0 ? (
            addData.experience.map((exp, index) => (
              <div
                key={index}
                className="d-flex flex-column justify-content-between align-items-start"
              >
                <Form>
                  <Form.Group>
                    <Form.Label>Organization</Form.Label>
                    <Form.Control
                      type="text"
                      value={exp.organization}
                      onChange={(e) =>
                        handleChangeExperience(index, "organization", e.target.value)
                      }
                      placeholder="Enter organization name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="number"
                        value={exp.duration.years}
                        onChange={(e) =>
                          handleChangeExperience(index, "duration", {
                            ...exp.duration,
                            years: e.target.value,
                          })
                        }
                        placeholder="Years"
                        style={{ width: "80px", marginRight: "8px" }}
                      />
                      <Form.Control
                        type="number"
                        value={exp.duration.months}
                        onChange={(e) =>
                          handleChangeExperience(index, "duration", {
                            ...exp.duration,
                            months: e.target.value,
                          })
                        }
                        placeholder="Months"
                        style={{ width: "80px" }}
                      />
                    </div>
                  </Form.Group>
                  <Button
                    style={{marginTop:"10px"}}
                    variant="outline-info"
                    size="sm"
                    onClick={handleConfirmChanges}
                    >
                save changes
            </Button>
                </Form>
                <FaTrash
                  color="#ff4d4d"
                  style={{ cursor: "pointer", marginTop: "8px" }}
                  onClick={() => handleRemoveExperience(index)}
                />
              </div>
            ))
          ) : (
            <p>No experience listed.</p>
          )}
        </Card.Body>
      </Card>

      {/* Achievements Section */}
      <Card
        className="mb-4"
        style={{
          backgroundColor: "#1f1f1f",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
          color: "#e0e0e0",
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-info">Achievements</h4>
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleAddAchievement}
            >
              <FaPlus className="me-1" /> Add Achievement
            </Button>
          </div>

          {Array.isArray(addData.achievements) &&
          addData.achievements.length > 0 ? (
            <ul>
              {addData.achievements.map((ach, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Form.Control
                    type="text"
                    value={ach}
                    onChange={(e) =>
                      handleChangeAchievement(index, e.target.value)
                    }
                    placeholder="Enter achievement"
                    style={{ flex: 1, width: "calc(100% - 20px)" }}
                />
                   <Button
                    style={{marginLeft:"10px"}}
                    variant="outline-info"
                    size="sm"
                    onClick={handleConfirmChanges}
                    >
                save changes
            </Button>
                  <FaTrash
                    color="#ff4d4d"
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                    onClick={() => handleRemoveAchievement(index)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements listed.</p>
          )}
        </Card.Body>
      </Card>


            {/* Event Statistics */}
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#292929",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Event Statistics</h4>
                <p>
                  <strong>Total Events Organized: </strong>
                  {organizerData.eventCount || 0}
                </p>
                <p>
                  <strong>Rating: </strong> {organizerData.rating || "N/A"} / 5
                </p>
              </Card.Body>
            </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Updating Profile */}
      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  dialogClassName="custom-modal"
  backdrop="static"
  style={{
    maxWidth: "100rem", // Increase width
    margin: "0 auto", // Center horizontally
  }}
>
  <Modal.Header
    closeButton
    closeVariant="white"
    style={{
      backgroundColor: "#343a40",
      color: "#fff",
      padding: "10px 15px",
      position: "sticky",
      top: 0,
      zIndex: 1020,
    }}
  >
    <Modal.Title>Update Profile</Modal.Title>
  </Modal.Header>
  <Modal.Body
    style={{
      backgroundColor: "#1f1f1f",
      color: "#e0e0e0",
      padding: "15px",
      overflowY: "auto",
      maxHeight: "calc(100vh - 150px)", // Adjust height as needed
      // overflowY: "auto", 
    }}
  >
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.address.street}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.address.city}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.address.state}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pincode</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.address.postalCode}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="mobileNumber"
          value={formData.address.country}
          onChange={handleInputChange}
          style={{
            backgroundColor: "#343a40",
            color: "#e0e0e0",
          }}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer
    style={{
      backgroundColor: "#343a40",
      padding: "10px 15px",
      position: "sticky",
      bottom: 0,
      zIndex: 1020,
    }}
  >
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>





    </div>
  );
};

export default OrganizerProfile;
