import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Navbar,
  Nav,
  Form,
  OverlayTrigger,
  Tooltip,
  Modal,
  InputGroup,
  ProgressBar,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  Bell,
  Briefcase,
  GraphUp,
  GeoAlt,
  PencilSquare,
  CheckCircle,
  Plus,
  X,
   Trash,
  BoxArrowRight,
  LightbulbFill,
  GraphUpArrow,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "../../styles/UserDashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
 
/* ================= LEAFLET ICON FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* ================= DATA ================= */
const stats = [
  { label: "Job Matches", value: "156", change: "+8%", icon: <Briefcase /> },
  { label: "Skills Matched", value: "24", change: "+3", icon: <GraphUp /> },
];

const recommendedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    lat: 37.7749,
    lng: -122.4194,
    match: "95%",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "Frontend Lead",
    company: "DesignHub",
    location: "New York, NY",
    lat: 40.7128,
    lng: -74.006,
    match: "82%",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    lat: 30.2672,
    lng: -97.7431,
    match: "78%",
    logo: "https://via.placeholder.com/50",
  },
];

const topCompanies = [
  { id: 1, name: "Google", openings: 42, logo: "https://via.placeholder.com/45" },
  { id: 2, name: "Amazon", openings: 31, logo: "https://via.placeholder.com/45" },
  { id: 3, name: "Microsoft", openings: 27, logo: "https://via.placeholder.com/45" },
  { id: 4, name: "Meta", openings: 19, logo: "https://via.placeholder.com/45" },
  { id: 5, name: "Apple", openings: 15, logo: "https://via.placeholder.com/45" },
  { id: 6, name: "Netflix", openings: 12, logo: "https://via.placeholder.com/45" },
];
const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  const [currentSkillInput, setCurrentSkillInput] = useState("");
  const [tempSkills, setTempSkills] = useState([]);
  const [experienceInput, setExperienceInput] = useState("");
  const [locationInput, setLocationInput] = useState({ city: "", country: "India" });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);



  const [successMsg, setSuccessMsg] = useState("");

const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userProfile, setUserProfile] = useState({
    name: storedUser?.name || "User",
    email: storedUser?.email || "",
     userId: storedUser?.id,
    photo: "https://via.placeholder.com/120",
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "PostgreSQL"],
    experience: [],
    location: [],
  });

  const [editedProfile, setEditedProfile] = useState({ ...userProfile });

  if (!storedUser) {
    return <h3 style={{ padding: "2rem" }}>Please login again</h3>;
  }

  // Skill Gap Analysis
  const currentSkills = [
    { name: "React", level: 1 },
    { name: "TypeScript", level: 1 },
    { name: "Node.js", level: 1 },
  ];
  const skillsToLearn = [
    { name: "Tailwind CSS", priority: 1 },
    { name: "PostgreSQL", priority: 1 },
    { name: "Figma", priority: 1 },
    { name: "UI Design", priority: 1 },
    { name: "User Research", priority: 1 },
  ];
  const totalMarketSkills = currentSkills.length + skillsToLearn.length;
  const coveragePercentage = Math.round((currentSkills.length / totalMarketSkills) * 100);

  /* ================= HANDLERS ================= */
  const handleEditClick = () => setIsEditing(true);
  //when user will click the button of save changes then this will have to be called
 
 const handleSaveClick = async () => {
  try {
    const userId = storedUser?.id; // <- define it here
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append("name", editedProfile.name);
    formData.append("email", editedProfile.email);

    if (profileImageFile) {
      formData.append("photo", profileImageFile);
    }

    const res = await axios.put(
      `http://localhost:5000/api/users/edit/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ Update UI with fresh data
   setUserProfile({
  ...res.data.user,
  skills: res.data.user.skills || ["React", "Node.js", "JavaScript", "MongoDB", "PostgreSQL"],
  experience: res.data.user.experience || [],
  location: res.data.user.location || [],
});
    setIsEditing(false);
    setProfileImageFile(null);
    setProfileImagePreview(null);
    // ✅ Show success message
      setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);  // <- simple alert
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
  }
};
console.log(storedUser);


  const handleRemoveSkillFromPreview = (skillToRemove) => {
    setTempSkills(tempSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddAllSkills = () => {
    const updates = {};
    if (tempSkills.length) updates.skills = [...userProfile.skills, ...tempSkills];
    if (experienceInput.trim()) updates.experience = [...userProfile.experience, experienceInput.trim()];
    if (locationInput.city.trim() || locationInput.country.trim())
      updates.location = [...userProfile.location, locationInput];

    const updatedProfile = { ...userProfile, ...updates };
    setUserProfile(updatedProfile);
    setEditedProfile(updatedProfile);

    setCurrentSkillInput("");
    setTempSkills([]);
    setExperienceInput("");
    setLocationInput({ city: "", country: "India" });
    setShowAddSkillModal(false);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user info
    navigate("/login"); // Redirect to login page
  };

  const handleCloseModal = () => {
    setShowAddSkillModal(false);
    setCurrentSkillInput("");
    setTempSkills([]);
    setExperienceInput("");
    setLocationInput({ city: "", country: "India" });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setEditedProfile({ ...editedProfile, photo: URL.createObjectURL(file) });
    }
  };


  //
  const handleAddSingleSkill = () => {
  if (!currentSkillInput.trim()) return;

  if (!tempSkills.includes(currentSkillInput.trim())) {
    setTempSkills([...tempSkills, currentSkillInput.trim()]);
  }

  setCurrentSkillInput("");
};

  const handleDeleteProfileImage = () => {
  setProfileImageFile(null);
  setProfileImagePreview(null);
  setUserProfile({ ...userProfile, photo: "" });
  // Also send a request to backend to delete the image
  // axios.delete('/api/user/profile-photo') or whatever your endpoint is
};
  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setIsEditing(false);
  };



  //deleting account handler 
  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );
  if (!confirmDelete) return;

  try {
    const userId = storedUser?.id;
    if (!userId) return;

    await axios.delete(`http://localhost:5000/api/users/${userId}`);

    // Clear local storage and redirect to login
    localStorage.removeItem("user");
    window.location.href = "/Login"; // Or your login route
  } catch (err) {
    console.error("Error deleting account:", err.response?.data || err.message);
  }
};

  return (
    <div className="dashboard-root">
      {/* NAVBAR */}
      <Navbar bg="white" fixed="top" className="shadow-sm px-4 navbar-custom">
        <Button
  variant="light"
  className="me-2"
  onClick={() => setSidebarOpen(!sidebarOpen)}
>
  ☰
</Button>
        <Navbar.Brand className="brand-spacing fw-bold text-primary">
          <Briefcase className="me-2" size={28} /> SkillHire
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-3">
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Add Skills</Tooltip>}>
            <Button className="add-skill-btn" onClick={() => setShowAddSkillModal(true)}>
              <Plus size={20} weight="bold" />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" overlay={<Tooltip>Notifications</Tooltip>}>
            <Button variant="light" className="position-relative rounded-circle p-2">
              <Bell size={20} />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                3
              </Badge>
            </Button>
          </OverlayTrigger>

          <div className="d-flex align-items-center">
         
          <Button
  variant="danger"
  size="sm"
  className="w-100 mt-3"
  onClick={handleDeleteAccount}
>
  <Trash className="me-2" /> Delete Account
</Button>
          </div>
        </Nav>
      </Navbar>

      {/* ADD SKILLS MODAL */}
      <Modal show={showAddSkillModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            <Plus className="me-2 text-primary" size={24} /> Add Skills & Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          {/* Skill Input */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold mb-3">Skills</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="e.g., Flutter, Python..."
                value={currentSkillInput}
                onChange={(e) => setCurrentSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSingleSkill())}
                className="py-2"
              />
              <Button variant="primary" onClick={handleAddSingleSkill}>
                <Plus size={20} />
              </Button>
            </InputGroup>

            {tempSkills.length > 0 && (
              <div className="added-skills-preview mb-3 p-3 bg-light rounded">
                <small className="text-muted fw-semibold d-block mb-2">Skills to Add:</small>
                <div className="d-flex flex-wrap gap-2">
                  {tempSkills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      bg="primary"
                      pill
                      className="px-3 py-2 d-flex align-items-center gap-2"
                    >
                      {skill}
                      <X size={14} onClick={() => handleRemoveSkillFromPreview(skill)} style={{ cursor: "pointer" }} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <small className="text-muted">
              Type a skill and press Enter or click <Plus size={12} /> to add
            </small>
          </Form.Group>

          {/* Experience */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold mb-2">Experience <small className="text-muted">(Optional)</small></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 3 years at Google..."
              value={experienceInput}
              onChange={(e) => setExperienceInput(e.target.value)}
              className="py-2"
            />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold mb-2">Location <small className="text-muted">(Optional)</small></Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="City"
                value={locationInput.city}
                onChange={(e) => setLocationInput({ ...locationInput, city: e.target.value })}
                className="py-2"
              />
              <Form.Select
                value={locationInput.country}
                onChange={(e) => setLocationInput({ ...locationInput, country: e.target.value })}
                className="py-2"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </Form.Select>
            </div>
          </Form.Group>

          {/* Current Skills */}
          {userProfile.skills.length > 0 && (
            <div className="mt-4 p-3 bg-light rounded">
              <small className="text-muted fw-semibold">Your Current Skills:</small>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {userProfile.skills.map((skill, idx) => (
                  <Badge key={idx} bg="secondary" pill className="px-3 py-2">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddAllSkills}>
            <CheckCircle className="me-2" size={18} /> Add All
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="user-profile-section text-center">
         <div className="profile-image-container position-relative d-inline-block">
  <Image
  src={
    profileImagePreview ||
    editedProfile.photo ||
    userProfile.photo ||
    "https://via.placeholder.com/120"
  }
  roundedCircle
  width={120}
  height={120}
  className="border border-3 border-primary shadow"
/>

  {/* Edit Icon - Bottom Right */}
  {isEditing && (
    <label className="btn btn-light btn-sm p-2 rounded-circle shadow-sm position-absolute bottom-0 end-0">
      <PencilSquare size={16} />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfileImageChange}
      />
    </label>
  )}

  {/* Trash/Delete Icon - Top Right */}
 <Button
  variant="light"
  size="sm"
  className="position-absolute top-0 end-0 p-2 rounded-circle shadow-sm"
  onClick={(e) => {
    e.stopPropagation();
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setEditedProfile(prev => ({ ...prev, photo: "" }));
  }}
>
  <Trash size={16} />
</Button>
</div>

{/* Name Section - Slightly below the profile image */}
{/* Name Section - Slightly below the profile image */}
{/* Name Section - Slightly below the profile image, aligned left */}
<div className="mt-5 text-start">
  {isEditing ? (
    <>
      <Form.Label className="small fw-semibold d-block mb-1">Name</Form.Label>
      <Form.Control
        type="text"
        value={editedProfile.name}
        onChange={(e) =>
          setEditedProfile({ ...editedProfile, name: e.target.value })
        }
        size="sm"
        className="mb-1"
      />
    </>
  ) : (
    <h5 className="fw-bold mb-1">{userProfile.name}</h5>
  )}
</div>

         {/* Email */} 
       {/* Email */}
  {isEditing ? (
    <Form.Group className="mb-3 text-start">
      <Form.Label className="small fw-semibold d-block mb-1">Email</Form.Label>
      <Form.Control
        type="email"
        value={editedProfile.email}
        onChange={(e) =>
          setEditedProfile({ ...editedProfile, email: e.target.value })
        }
        size="sm"
         className="mb-1"
      />
    </Form.Group>
  ) : (
    <p className="fw-bold mb-1">{userProfile.email}</p>
  )}

            <div className="d-grid gap-2 mb-3">
              {!isEditing ? (
                <Button variant="outline-primary" size="sm" onClick={handleEditClick}>
                  <PencilSquare className="me-2" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="success" size="sm" onClick={handleSaveClick}>
                    <CheckCircle className="me-2" /> Save Changes
                  </Button>
                  <Button variant="outline-secondary" size="sm" onClick={handleCancelEdit}>Cancel</Button>
                </>
              )}
            </div>

            <div className="skills-section mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-bold">My Skills</h6>
                <Badge bg="primary" pill>{userProfile.skills.length}</Badge>
              </div>
              <div className="skills-container">
                {(isEditing ? editedProfile.skills : userProfile.skills).map((skill, idx) => (
                  <Badge key={idx} bg="primary" pill className="skill-badge">
                    {skill}
                    {isEditing && <X size={14} className="ms-1 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />}
                  </Badge>
                ))}
              </div>
            </div>
 <Button variant="secondary" size="sm" onClick={handleLogout} className="w-100">
      <BoxArrowRight className="me-2" /> Logout
    </Button>
          </div>
        </div>
      </aside>

      {/* MAIN BODY */}
      <div className="dashboard-body">
        <div className={`sidebar-spacer ${sidebarOpen ? "open" : ""}`} />
        <main className="main-content">
          <Container fluid>
            {/* Header */}
            <div className="mb-4">
              <h2 className="fw-bold mb-1">Welcome back, {userProfile.name}! 👋</h2>
              <p className="text-muted">Here's what's happening with your job search today</p>
            </div>

            {/* Stats */}
            <Row className="mb-4">
              {stats.map((s) => (
                <Col lg={6} md={6} key={s.label} className="mb-3">
                  <Card className="shadow-sm h-100 stat-card border-0">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-muted text-uppercase small mb-2">{s.label}</h6>
                        <h2 className="mb-1 fw-bold">{s.value}</h2>
                        <small className="text-success fw-semibold"><GraphUp size={12} /> {s.change} from last week</small>
                      </div>
                      <div className="icon-circle bg-primary bg-opacity-10 text-primary">{s.icon}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>



            {/* JOB RECOMMENDATIONS */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white fw-bold fs-5 border-bottom py-3">
                    <Briefcase className="me-2" />
                    Top Recommended Jobs
                    <Badge bg="primary" pill className="ms-2">{recommendedJobs.length}</Badge>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {recommendedJobs.map((job, index) => (
                      <div
                        key={job.id}
                        className={`d-flex justify-content-between align-items-center py-3 px-4 job-item ${
                          index !== recommendedJobs.length - 1 ? "border-bottom" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center flex-grow-1">
                          <Image
                            src={job.logo}
                            rounded
                            width={55}
                            height={55}
                            className="me-3 shadow-sm"
                          />
                          <div>
                            <h6 className="mb-1 fw-bold">{job.title}</h6>
                            <small className="text-muted">
                              <strong>{job.company}</strong> · <GeoAlt size={12} /> {job.location}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end gap-2">
                          <Badge bg="success" className="px-3 py-2">
                            {job.match} Match
                          </Badge>
                          <Button size="sm" variant="outline-primary" className="px-3">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>



            {/* TOP COMPANIES */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white fw-bold fs-5 border-bottom py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-building me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                      <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                    </svg>
                    Top Companies Hiring
                    <Badge bg="secondary" pill className="ms-2">{topCompanies.length}</Badge>
                  </Card.Header>
                  <Card.Body className="company-body-bg p-4">
                    <Row>
                      {topCompanies.map((company) => (
                        <Col lg={4} md={6} key={company.id} className="mb-3">
                          <Card className="company-card h-100 border-0 shadow-sm bg-white">
                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center">
                                <div className="company-logo-wrapper me-3">
                                  <Image
                                    src={company.logo}
                                    rounded
                                    width={50}
                                    height={50}
                                  />
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bold">{company.name}</h6>
                                  <Badge bg="primary" className="px-2 py-1">
                                    {company.openings} openings
                                  </Badge>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>



            {/* SKILL GAP ANALYSIS - FULL WIDTH AFTER TOP COMPANIES */}
            <Row className="mb-4">
              <Col xs={12}>
                <Card className="skill-gap-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    {/* Header */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <GraphUpArrow className="text-primary me-2" size={24} />
                        <h5 className="mb-0 fw-bold">Skill Gap Analysis</h5>
                      </div>
                      <Badge bg="info" pill className="px-3 py-2">
                        {coveragePercentage}% Coverage
                      </Badge>
                    </div>

                    {/* Subtitle */}
                    <p className="text-muted small mb-4">Your skills vs. market demand</p>

                    {/* Skill Coverage Section */}
                    <div className="skill-coverage-section mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted fw-semibold small">Skill Coverage</span>
                        <span className="fw-bold text-primary fs-5">{coveragePercentage}%</span>
                      </div>
                      <ProgressBar
                        now={coveragePercentage}
                        className="skill-progress-bar"
                        variant="primary"
                      />
                    </div>

                    {/* Skills Grid - You Have and Skills to Learn Side by Side */}
                    <Row>
                      <Col lg={6} md={12} className="mb-3 mb-lg-0">
                        <div className="skills-section-gap">
                          <div className="d-flex align-items-center mb-3">
                            <CheckCircle className="text-success me-2" size={18} />
                            <h6 className="mb-0 fw-semibold text-success">You Have</h6>
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            {currentSkills.map((skill, idx) => (
                              <Badge
                                key={idx}
                                bg="primary"
                                pill
                                className="skill-badge-gap px-3 py-2"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Col>

                      <Col lg={6} md={12}>
                        <div className="skills-section-gap">
                          <div className="d-flex align-items-center mb-3">
                            <LightbulbFill className="text-warning me-2" size={18} />
                            <h6 className="mb-0 fw-semibold text-warning">Skills to Learn</h6>
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            {skillsToLearn.map((skill, idx) => (
                              <Badge
                                key={idx}
                                bg="light"
                                text="dark"
                                pill
                                className="skill-badge-learn px-3 py-2"
                              >
                                {skill.name}
                                {skill.priority && (
                                  <span className="ms-1 text-muted">({skill.priority})</span>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>



            {/* MAP - ENHANCED UI */}
            <Row>
              <Col>
                <Card className="shadow-sm border-0 map-card">
                  <Card.Header className="bg-gradient-primary text-white fw-bold fs-5 border-0 py-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <GeoAlt className="me-2" size={24} />
                        <span>Job Locations Map</span>
                      </div>
                      <Badge bg="light" text="dark" pill className="px-3 py-2">
                        {recommendedJobs.length} Locations
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0 position-relative">
                    <MapContainer
                      center={[37.7749, -122.4194]}
                      zoom={3}
                      className="map-container"
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {recommendedJobs.map((job) => (
                        <Marker key={job.id} position={[job.lat, job.lng]}>
                          <Popup>
                            <div className="map-popup-content">
                              <strong className="d-block mb-1">{job.title}</strong>
                              <small className="text-muted d-block mb-2">{job.company}</small>
                              <Badge bg="success" className="mt-1">{job.match} Match</Badge>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </div>
  );
};



export default UserDashboard;