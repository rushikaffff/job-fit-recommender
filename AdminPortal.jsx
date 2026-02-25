import React, { useState, useEffect } from "react";
import "../../styles/AdminPortal.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, Users, Star, LogOut, ChevronLeft, Menu, Edit2
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "skills", label: "Skills", icon: Star },
];

const AdminPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "admin@skillhire.com"
  });
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "overview";

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSaveProfile = () => {
    console.log("Profile saved:", profileData);
    setEditingProfile(false);
  };

  return (
    <div className="admin-layout">
      {/* 🔥 FIXED NAVBAR - NO TOGGLE */}
      <nav className={`admin-navbar ${collapsed ? 'collapsed' : ''}`}>
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
        
        <div className="brand-title">
          <span className="skillhire-logo">SkillHire</span>
          <span className="admin-text"> Admin</span>
        </div>

        {/* REMOVED NAVBAR TOGGLE - NOW IN SIDEBAR */}
      </nav>

      {/* 🔥 PERFECT SKY BLUE SIDEBAR */}
      <aside className={`sidebar-modern ${collapsed ? 'collapsed' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* 🔥 HEADER - SKILLHIRE BAG LOGO + HAMBURGER TOGGLE */}
        <div className="sidebar-header">
          {!collapsed && (
            <div className="brand-section">
              <div className="skillhire-bag-logo"></div>
              <div>
                <h1 className="skillhire-title">SkillHire</h1>
                <p className="admin-portal-text">Admin Portal</p>
              </div>
            </div>
          )}
          
          {/* 🔥 SIDEBAR TOGGLE + MOBILE CLOSE */}
          <div className="header-actions">
            <button 
              className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand" : "Collapse"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <button 
              className="close-sidebar-btn lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* 🔥 COMPACT PROFILE */}
        <div className="sidebar-profile">
          <div className="profile-top">
            <div className="profile-avatar">RK</div>
            {!collapsed && (
              <div className="profile-info">
                <p className="profile-name">{profileData.name}</p>
                <p className="profile-email">{profileData.email}</p>
              </div>
            )}
          </div>
          
          {/* 🔥 COMPACT EDIT */}
          {!collapsed && !editingProfile && (
            <button className="edit-profile-btn-full" onClick={() => setEditingProfile(true)}>
              <Edit2 size={18} /> Edit Profile
            </button>
          )}
          
          {!collapsed && editingProfile && (
            <div className="profile-edit-full">
              <input 
                className="edit-input-full" 
                placeholder="Full Name" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
              <input 
                className="edit-input-full" 
                type="email"
                placeholder="Email Address" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
              <div className="edit-buttons-row">
                <button className="save-btn-full" onClick={handleSaveProfile}>
                  Save Changes
                </button>
                <button className="cancel-btn-full" onClick={() => setEditingProfile(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 🔥 NAVIGATION */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.id === "overview" ? navigate("/admin") : navigate(`/admin/${item.id}`);
                setSidebarOpen(false);
              }}
              className={`nav-item ${activeTab === item.id ? 'nav-item-active' : ''}`}
            >
              <item.icon size={22} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* 🔥 GREY LOGOUT */}
        <div className="sidebar-logout">
          <button className="logout-btn" onClick={() => console.log("🔐 Logging out...")}>
            <LogOut size={24} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 🔥 MAIN CONTENT */}
      <main className={`admin-content ${collapsed ? 'collapsed-content' : ''}`}>
        <Outlet />
      </main>

      {/* 🔥 MOBILE OVERLAY */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminPortal;
