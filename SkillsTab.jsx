import { Plus, Star, Search, Code, Cloud, Database, Github, Twitter } from "lucide-react";
import { useState } from "react";
import "../../styles/AdminPortal.css";

const SkillsTab = () => {
  const [newSkill, setNewSkill] = useState("");
  const [search, setSearch] = useState("");
  
  const skills = [
    "React", "Node.js", "Python", "JavaScript", "TypeScript", "Next.js",
    "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Tailwind CSS",
    "Git", "Vercel", "Netlify", "Prisma", "tRPC", "Zod"
  ];

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

  const skillIcons = {
    React: <Code size={32} className="text-blue-500" />,
    "Node.js": <Database size={32} className="text-green-600" />,
    Python: <Twitter size={32} className="text-orange-500" />,
    JavaScript: <Star size={32} className="text-yellow-500" />,
    AWS: <Cloud size={32} className="text-orange-400" />,
    Docker: <Github size={32} className="text-gray-800" />
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* 🔥 MAIN SKILLS CONTAINER */}
      <div className="dashboard-container">
        <div className="status-bar-approved"></div>
        
        {/* 🔥 DARK HEADER */}
        <div className="container-header">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-2">Skills Master</h1>
              <p className="text-xl md:text-2xl text-blue-200 font-medium">
                {skills.length}+ skills powering intelligent job recommendations
              </p>
            </div>
            <div className="verified-badge">
              Skills Verified
            </div>
          </div>
        </div>

        {/* 🔥 WHITE CONTENT */}
        <div className="container-content">
          {/* 🔥 SEARCH + ADD SKILL */}
          <div className="flex flex-col lg:flex-row gap-8 items-end mb-16">
            <div className="search-modern relative flex-1 max-w-2xl">
              <Search size={28} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                placeholder="🔍 Search skills..."
                className="pl-20 pr-8 py-6 w-full text-xl bg-transparent border-none focus:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4 flex-1">
              <input
                placeholder="New skill name..."
                className="search-modern flex-1 py-6 px-8 text-xl bg-white/80 border-2 border-gray-200 focus:border-emerald-500"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 whitespace-nowrap">
                <Plus size={28} />
                Add Skill
              </button>
            </div>
          </div>

          {/* 🔥 SKILLS GRID */}
          <div className="companies-grid">
            {filteredSkills.map((skill, idx) => (
              <div key={idx} className="glass-card group cursor-pointer hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                <div className="status-bar-approved"></div>
                <div className="p-10 text-center">
                  <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500">
                    {skillIcons[skill] || <Star size={36} className="text-emerald-600 drop-shadow-lg" />}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-emerald-600 transition-all duration-300 leading-tight">
                    {skill}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full group-hover:animate-ping" />
                    <span className="text-lg font-bold text-emerald-600">Active Skill</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-32">
              <Star size={120} className="mx-auto mb-12 text-emerald-400 drop-shadow-3xl animate-pulse" />
              <div className="verified-badge mx-auto mb-8 w-fit">
                No Skills Found
              </div>
              <h3 className="text-5xl font-black text-gray-600 mb-6">No skills match your search</h3>
              <p className="text-2xl text-gray-500 max-w-2xl mx-auto">Try different keywords or add new skills</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
