import { Search, User, Shield, Building2, CircleCheck, Clock, Eye, Edit, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import "../../styles/User.css";

const UsersTab = () => {
  const [search, setSearch] = useState("");
  
  const users = [
    { id: 1, name: "Anaya Sharma", email: "anaya@company.com", role: "user", status: "active", avatar: "AS" },
    { id: 2, name: "Vishak Patel", email: "vishak@hr.com", role: "recruiter", status: "pending", avatar: "VP" },
    { id: 3, name: "Priya Menon", email: "priya@tech.com", role: "user", status: "active", avatar: "PM" },
    { id: 4, name: "Adi Reddy", email: "adi@admin.com", role: "admin", status: "verified", avatar: "AR" },
    { id: 5, name: "Rajesh Kumar", email: "rajesh@company.com", role: "recruiter", status: "approved", avatar: "RK" },
    { id: 6, name: "Sneha Gupta", email: "sneha@company.com", role: "user", status: "active", avatar: "SG" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateUserStatus = (userId, newStatus) => {
    console.log(`✅ User ${userId} updated to ${newStatus}`);
  };

  const deleteUser = (userId) => {
    if (confirm(`Delete user ${userId}?`)) {
      console.log(`🗑️ Deleted user ${userId}`);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      pending: 'bg-orange-100 text-orange-800 border-orange-200', 
      verified: 'bg-sky-100 text-sky-800 border-sky-200',
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-0">
      {/* 🔥 USERS DASHBOARD CONTAINER */}
      <div className="dashboard-container">
        
        {/* 🔥 HEADER SECTION */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="navy-header-small">Users Directory</h1>
            <p className="text-xl text-gray-700 font-medium mt-2">
              {users.length} Total Users • {filteredUsers.length} Visible
            </p>
          </div>
          <button 
            onClick={() => console.log("👤 Add new user clicked")}
            className="approve-btn flex items-center gap-2 px-6 py-3 text-sm font-bold"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        {/* 🔥 SEARCH BAR */}
        <div className="search-modern mb-8">
          <Search size={24} className="text-sky-500 flex-shrink-0" />
          <input
            placeholder="🔍 Search users by name, email, or role..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🔥 USERS TABLE */}
        <div className="modern-table-container">
          
          {/* 🔥 TABLE HEADER */}
          <div className="table-header">
            <User size={24} className="inline mr-3 text-emerald-500" />
            Active Users Directory
          </div>

          {/* 🔥 TABLE ROW HEADER */}
          <div className="table-row-header">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* 🔥 USERS DATA ROWS */}
          {filteredUsers.map((user) => (
            <div key={user.id} className="glass-card group">
              
              {/* 🔥 NAME COLUMN - WITH AVATAR */}
              <div className="table-cell flex items-center gap-3">
                <div className="w-20 flex-shrink-0">{user.avatar}</div>
                <span className="font-semibold text-gray-900">{user.name}</span>
              </div>

              {/* 🔥 EMAIL COLUMN */}
              <div className="table-cell font-medium text-gray-700 truncate">{user.email}</div>

              {/* 🔥 ROLE COLUMN */}
              <div className="table-cell">
                <span className="px-4 py-2 bg-white/80 backdrop-blur rounded-xl text-sm font-bold text-gray-800 border border-gray-200 shadow-sm">
                  {user.role.toUpperCase()}
                </span>
              </div>

              {/* 🔥 STATUS COLUMN */}
              <div className="table-cell">
                <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 shadow-sm ${getStatusBadge(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>

              {/* 🔥 ACTIONS COLUMN */}
              <div className="table-cell">
                <div className="action-buttons">
                  
                  {/* 🔥 APPROVE BUTTON - TOGGLE */}
                  <button 
                    onClick={() => updateUserStatus(user.id, 'approved')}
                    className="approve-btn"
                    title="Approve User"
                    aria-label="Approve user"
                  >
                    <CircleCheck size={20} />
                  </button>

                  {/* 🔥 DELETE BUTTON */}
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="reject-btn"
                    title="Delete User"
                    aria-label="Delete user"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>
              </div>

            </div>
          ))}

          {/* 🔥 EMPTY STATE */}
          {filteredUsers.length === 0 && (
            <div className="glass-card text-center py-16">
              <User size={48} className="mx-auto mb-4 text-gray-400" />
              <div className="text-2xl font-bold text-gray-500 mb-2">No users found</div>
              <p className="text-gray-500">Try adjusting your search terms or add new users</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UsersTab;
