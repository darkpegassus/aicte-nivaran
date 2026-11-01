import React, { useState } from 'react';
import { Menu, Bell, Settings, LogOut, Search, UserCircle, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import GuidedTourModal from '../common/GuidedTourModal';

// Emblems
import aicteLogo from '../../assets/aicte-logo.png';
import moeEmblem from '../../assets/moe-emblem.png';

const TopHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    navigate(`/complaints?search=${encodeURIComponent(globalSearch)}`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-aicte-border bg-white px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded p-1.5 text-aicte-textSecondary hover:bg-aicte-bg hover:text-aicte-navy focus:outline-none"
          title="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Dual Government Crest Branding */}
        <div className="flex items-center gap-3">
          <img 
            src={moeEmblem} 
            alt="Gov of India" 
            className="h-9 w-auto object-contain hidden sm:block" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <img 
            src={aicteLogo} 
            alt="AICTE" 
            className="h-9 w-auto object-contain" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-tight text-aicte-navy font-biolinum leading-none">
              AICTE NIVARAN
            </h1>
            <span className="text-[10px] font-medium text-aicte-textSecondary font-sans">
              National Integrated Grievance Portal &bull; GoI
            </span>
          </div>
        </div>
      </div>

      {/* Global Search */}
      <form onSubmit={handleSearchSubmit} className="mx-4 hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search AICTE Permanent ID, College Name, Case No..."
            className="w-full rounded-md border border-aicte-border bg-aicte-bg py-1.5 pl-9 pr-4 text-xs font-medium font-sans text-aicte-textPrimary placeholder-slate-400 focus:border-aicte-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-aicte-royal"
          />
        </div>
      </form>

      {/* Action Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Evaluator Guided Tour Trigger */}
        <button
          onClick={() => setIsTourOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm hover:bg-amber-100 transition-all font-sans"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          Guided Walkthrough
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative rounded-md p-2 text-aicte-textSecondary hover:bg-aicte-bg hover:text-aicte-navy"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-aicte-accentRed text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-aicte-border bg-white py-2 shadow-dropdown z-50">
              <div className="flex items-center justify-between border-b border-aicte-border px-4 pb-2">
                <span className="text-xs font-bold text-aicte-navy font-biolinum">Coordination Alerts</span>
                <span className="text-[11px] font-medium text-aicte-royal">{unreadCount} New</span>
              </div>
              <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto font-sans">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      setShowNotifications(false);
                      navigate(n.link);
                    }}
                    className={`cursor-pointer px-4 py-2.5 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      {n.type === 'alert' ? (
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aicte-accentRed" />
                      ) : (
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aicte-royal" />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-aicte-textPrimary">{n.title}</p>
                        <p className="text-[11px] text-aicte-textSecondary leading-snug mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-aicte-border p-1.5 pr-2.5 hover:bg-aicte-bg"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-aicte-royal text-xs font-semibold text-white">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="hidden text-left md:block">
              <div className="text-xs font-semibold text-aicte-navy leading-tight">{user?.name}</div>
              <div className="text-[10px] text-aicte-textSecondary leading-tight">{user?.roleTitle}</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-aicte-border bg-white py-1.5 shadow-dropdown z-50 font-sans">
              <div className="border-b border-aicte-border px-3 py-2">
                <p className="text-xs font-bold text-aicte-navy">{user?.name}</p>
                <p className="text-[11px] text-aicte-textSecondary truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-aicte-textPrimary hover:bg-aicte-bg"
              >
                <UserCircle className="h-4 w-4 text-slate-500" />
                Profile & Settings
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <GuidedTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </header>
  );
};

export default TopHeader;