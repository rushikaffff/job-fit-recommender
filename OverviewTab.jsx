import { Building2, Users, Star, TrendingUp, CheckCircle, Clock, MapPin, X } from "lucide-react";
import "../../styles/Overview.css";

const StatCard = ({ label, value, icon: Icon, trend, color }) => (
  <div className="glass-stat-card group cursor-pointer p-10 rounded-3xl backdrop-blur-xl border border-white/50 shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 hover:bg-gradient-special">
    <div className="flex items-center justify-between mb-8">
      <div className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300`}>
        <Icon size={28} className="text-white drop-shadow-lg" />
      </div>
      {trend && <TrendingUp size={28} className="text-emerald-500 group-hover:scale-110 transition-all" />}
    </div>
    <div>
      <p className="text-6xl font-black text-gray-900 mb-4 leading-none">{value}</p>
      <p className="text-3xl font-bold text-gray-600">{label}</p>
      {trend && <p className="text-lg font-semibold text-emerald-600 mt-4 flex items-center gap-2">+12% from last month <TrendingUp size={20} /></p>}
    </div>
  </div>
);

const OverviewTab = () => {
  const companies = [
    { id: 1, companyName: "DataPulse AI", location: "Delhi, India", status: "pending", matchScore: "92%" },
    { id: 2, companyName: "GreenTech", location: "Bangalore", status: "approved" },
    { id: 3, companyName: "Nexlify Corp", location: "Mumbai", status: "approved" },
    { id: 4, companyName: "TechNova", location: "Hyderabad", status: "pending", matchScore: "87%" },
    { id: 5, companyName: "CodeZap", location: "Pune", status: "approved" }
  ];

  const users = [
    { id: 1, name: "Anaya Sharma", email: "anaya@company.com" },
    { id: 2, name: "Vishak Patel", email: "vishak@hr.com" },
    { id: 3, name: "Priya Menon", email: "priya@tech.com" },
    { id: 4, name: "Adi Reddy", email: "adi@admin.com" },
    { id: 5, name: "Rajesh Kumar", email: "rajesh@company.com" },
    { id: 6, name: "Sneha Gupta", email: "sneha@company.com" }
  ];

  const skills = [
    { id: 1, skillName: "React" },
    { id: 2, skillName: "Node.js" },
    { id: 3, skillName: "Python" },
    { id: 4, skillName: "JavaScript" },
    { id: 5, skillName: "AWS" },
    { id: 6, skillName: "Docker" }
  ];

  const approved = companies.filter(c => c.status === "approved").length;
  const pending = companies.filter(c => c.status === "pending").length;

  const handleApprove = (company) => {
    console.log('✅ APPROVED:', company.companyName);
  };

  const handleReject = (company) => {
    console.log('❌ REJECTED:', company.companyName);
  };

  return (
    <div className="common-gradient-bg">
      {/* 🔥 MAIN DASHBOARD - NAVY FULL BACKGROUND HEADER */}
      <div className="dashboard-container">
        <div className="status-bar-approved"></div>
        
        <div className="container-header">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="navy-header">Platform Overview</h1>
              <p className="emerald-accent">
                Real-time analytics • {approved} approved • {pending} pending
              </p>
            </div>
            <div className="verified-badge">
              Platform Verified
            </div>
          </div>
        </div>

        <div className="container-content">
          {/* 🔥 WHITE/BLUE GLASS STAT CARDS */}
          <div className="metrics-grid mb-16">
            <StatCard 
              label="Total Companies" 
              value={companies.length} 
              icon={Building2} 
              color="bg-gradient-to-r from-blue-500 to-indigo-600"
              trend
            />
            <StatCard 
              label="Approved Companies" 
              value={approved} 
              icon={CheckCircle} 
              color="bg-gradient-to-r from-emerald-500 to-teal-600"
              trend
            />
            <StatCard 
              label="Active Users" 
              value={users.length} 
              icon={Users} 
              color="bg-gradient-to-r from-purple-500 to-pink-500"
              trend
            />
            <StatCard 
              label="Skills Mastered" 
              value={skills.length} 
              icon={Star} 
              color="bg-gradient-to-r from-amber-500 to-orange-500"
            />
          </div>

          {/* 🔥 QUICK ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <CheckCircle size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="navy-header-small">Quick Actions</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="quick-action-btn emerald">
                  Review Pending
                </button>
                <button className="quick-action-btn blue">
                  View Analytics
                </button>
              </div>
            </div>

            <div className="glass-card p-10 lg:col-span-2">
              <h3 className="navy-header-small">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-50/80 to-white/70 rounded-2xl hover:shadow-md transition-all hover:bg-gradient-special">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">GreenTech Solutions approved</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 PENDING COMPANIES - ROYAL PURPLE FULL BACKGROUND HEADER */}
      <div className="dashboard-container">
        <div className={`status-bar-${pending > 0 ? 'pending' : 'approved'}`}></div>
        <div className="container-header">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl flex items-center justify-center shadow-2xl">
              <Clock size={28} className="text-white" />
            </div>
            <div>
              <h1 className="royal-purple-header">Pending Approvals</h1>
              <p className="amber-accent">{pending} companies awaiting your review</p>
            </div>
          </div>
        </div>

        <div className="container-content">
          {pending > 0 ? (
            <div className="pending-grid-container">
              <div className="pending-cards-grid">
                {companies.filter(c => c.status === "pending").map(c => (
                  <div key={c.id} className="glass-modern-card group cursor-pointer hover:-translate-y-3 transition-all duration-500 overflow-hidden hover:bg-gradient-special">
                    <div className="status-bar-pending"></div>
                    <div className="p-8">
                      <div className="flex items-center gap-6 pb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl flex items-center justify-center text-2xl font-black text-white shadow-2xl group-hover:scale-110 transition-all flex-shrink-0">
                          {c.companyName.split(' ')[0][0]}{c.companyName.split(' ')[1]?.[0] || 'X'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-all leading-tight">
                            {c.companyName}
                          </h4>
                          <p className="text-xl text-gray-600 flex items-center gap-3">
                            <MapPin size={24} className="text-gray-500 flex-shrink-0" />
                            {c.location}
                          </p>
                        </div>
                      </div>
                      
                      {/* 🔥 MATCH BADGE + REAL APPROVE/REJECT */}
                      <div className="flex items-center justify-between pt-8 border-t-2 border-gray-100 bg-gradient-to-r from-purple-50/60 to-white/60 backdrop-blur-sm rounded-3xl -mx-8 -mb-8 px-8 py-6">
                        <div className="match-badge">
                          <span>Match Score</span>
                          <div className="match-badge-number">{c.matchScore}</div>
                        </div>
                        <div className="action-buttons">
                          <button 
                            className="reject-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(c);
                            }}
                          >
                            <X size={20} strokeWidth={3} />
                          </button>
                          <button 
                            className="approve-btn" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(c);
                            }}
                          >
                            <CheckCircle size={24} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="verified-badge mx-auto mb-8 w-fit">
                All Clear
              </div>
              <CheckCircle size={120} className="mx-auto mb-8 text-emerald-400 drop-shadow-2xl" />
              <h3 className="text-5xl font-black text-gray-600 mb-6">🎉 Perfect!</h3>
              <p className="text-2xl text-gray-500 max-w-2xl mx-auto">No pending approvals - everything is up to date</p>
            </div>
          )}
        </div>
      </div>
    </div> 
  );
};

export default OverviewTab;
