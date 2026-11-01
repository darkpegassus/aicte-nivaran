import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  AlertCircle,
  Layers,
  Clock3,
  BarChart3,
  Briefcase,
  Users,
  Settings,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Executive Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Institution 360° Directory', path: '/institutions', icon: Building2 },
  { name: 'Grievance Central', path: '/complaints', icon: AlertCircle },
  { name: 'Overlap Detection Engine', path: '/overlaps', icon: Layers, highlight: true },
  { name: 'Action & SLA Tracking', path: '/case-tracking', icon: Clock3 },
  { name: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
  { name: 'Bureau Oversight', path: '/bureaus', icon: Briefcase },
  { name: 'Officer Management', path: '/users', icon: Users },
  { name: 'System Parameters', path: '/settings', icon: Settings }
];

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const handleNavClick = () => {
    // Only close sidebar on mobile screens (< 768px)
    if (window.innerWidth < 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-aicte-navy text-white transition-all duration-300 ease-in-out md:static ${
        isOpen
          ? 'w-72 translate-x-0 shadow-2xl md:w-64 md:shadow-none'
          : '-translate-x-full md:w-20 md:translate-x-0'
      }`}
    >
      {/* Official Government Identity Header */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 p-1 border border-white/20">
            <svg viewBox="0 0 48 48" className="h-8 w-8 text-amber-400" fill="currentColor">
              <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M24 6L8 14v12c0 10 16 16 16 16s16-6 16-16V14L24 6z" fill="#174EA6" stroke="white" strokeWidth="1.5"/>
              <path d="M24 12l-8 4v8c0 5 8 8 8 8s8-3 8-8v-8l-8-4z" fill="#F2B544" />
            </svg>
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'opacity-100' : 'md:hidden opacity-0'}`}>
            <div className="text-[10px] font-bold tracking-widest text-blue-200 uppercase">AICTE - MoE Portal</div>
            <div className="text-lg font-extrabold tracking-tight text-white font-biolinum">NIVARAN</div>
            <div className="text-[9px] text-slate-300 truncate font-sans">Nat. Complaint & Redressal</div>
          </div>
        </div>

        {/* Mobile-only Close X button */}
        {isOpen && (
          <button
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
            title="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className={`mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-sans ${!isOpen && 'md:hidden'}`}>
          Operational Modules
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium font-sans transition-all ${
                    isActive
                      ? 'bg-aicte-royal text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  } ${item.highlight && !isOpen ? 'border-r-4 border-amber-400' : ''}`
                }
                title={!isOpen ? item.name : ''}
              >
                <Icon className={`h-4 w-4 shrink-0 ${item.highlight ? 'text-amber-400' : ''}`} />
                <span className={`flex-1 truncate transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'md:hidden opacity-0'}`}>
                  {item.name}
                </span>

                {item.highlight && isOpen && (
                  <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                    Core AI
                  </span>
                )}
                {isOpen && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Badge */}
      <div className="border-t border-white/10 p-3">
        <div className={`rounded-xl bg-white/5 p-2.5 border border-white/5 text-center ${!isOpen && 'md:hidden'}`}>
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-[11px] font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Smart India Hackathon
          </div>
          <p className="text-[10px] font-medium text-slate-300 mt-0.5">Prototype Demonstration Build</p>
          <p className="text-[9px] text-slate-400 mt-1">Ministry of Education, GoI</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;