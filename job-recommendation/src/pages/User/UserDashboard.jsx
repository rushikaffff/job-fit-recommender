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
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  Bell,
  People,
  Briefcase,
  GraphUp,
  GeoAlt,
} from "react-bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "../../styles/UserDashboard.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

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
  { label: "Profile Views", value: "2,847", change: "+12%", icon: <People /> },
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
];

const topCompanies = [
  {
    id: 1,
    name: "Google",
    openings: 42,
    logo: "https://via.placeholder.com/45",
  },
  {
    id: 2,
    name: "Amazon",
    openings: 31,
    logo: "https://via.placeholder.com/45",
  },
  {
    id: 3,
    name: "Microsoft",
    openings: 27,
    logo: "https://via.placeholder.com/45",
  },
];

/* ================= COMPONENT ================= */
const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-root">
      {/* NAVBAR */}
      <Navbar bg="light" fixed="top" className="shadow-sm px-3">
        <Navbar.Brand className="brand-spacing">SkillHire</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Bell className="me-3" />
          <Image src="https://via.placeholder.com/40" roundedCircle />
          <span className="ms-2 fw-semibold">John Doe</span>
        </Nav>
      </Navbar>

      {/* SIDEBAR TOGGLE */}
      <Button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </Button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Button className="w-100 mb-2">Add Skills</Button>
      </aside>

      {/* MAIN BODY */}
      <div className="dashboard-body">
        <div className={`sidebar-spacer ${sidebarOpen ? "open" : ""}`} />

        <main className="main-content">
          <Container fluid>
            {/* STATS */}
            <Row className="mb-4">
              {stats.map((s) => (
                <Col md={4} key={s.label}>
                  <Card className="shadow-sm">
                    <Card.Body className="d-flex justify-content-between">
                      <div>
                        <h6 className="text-muted">{s.label}</h6>
                        <h4>{s.value}</h4>
                        <small className="text-success">{s.change}</small>
                      </div>
                      <div className="icon-circle">{s.icon}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* JOB RECOMMENDATIONS */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                 <Card.Header className="fw-bold fs-5">
                  Top Recommended Jobs
                 </Card.Header>
                  <Card.Body>
                    {recommendedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="d-flex justify-content-between align-items-center border-bottom py-3"
                      >
                        <div className="d-flex align-items-center">
                          <Image
                            src={job.logo}
                            rounded
                            width={50}
                            height={50}
                            className="me-3"
                          />
                          <div>
                            <h6 className="mb-1">{job.title}</h6>
                            <small className="text-muted">
                              {job.company} · <GeoAlt /> {job.location}
                            </small>
                          </div>
                        </div>
                        <Badge bg="success">{job.match}</Badge>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* COMPANIES */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                 <Card.Header className="fw-bold fs-5">
  Top Companies Hiring
</Card.Header>
                  <Card.Body>
                    <Row>
                      {topCompanies.map((company) => (
                        <Col md={4} key={company.id}>
                          <div className="d-flex align-items-center mb-3">
                            <Image
                              src={company.logo}
                              rounded
                              width={45}
                              height={45}
                              className="me-3"
                            />
                            <div>
                              <h6 className="mb-0">{company.name}</h6>
                              <small className="text-muted">
                                {company.openings} openings
                              </small>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* MAP */}
            <MapContainer
              center={[37.7749, -122.4194]}
              zoom={3}
              className="map-container"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {recommendedJobs.map((job) => (
                <Marker key={job.id} position={[job.lat, job.lng]}>
                  <Popup>
                    <strong>{job.title}</strong>
                    <br />
                    {job.company}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
