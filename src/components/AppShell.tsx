import React, { useMemo, useState } from 'react';
import {
  Home,
  Layers,
  Recycle,
  Activity,
  FileBarChart2,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { ImariLogo } from './ImariLogo';
import { AppRoute, UserProfile } from '../types';
import { DASHBOARD_ALERTS } from '../data/imariData';

interface AppShellProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  user: UserProfile;
  onLogout: () => void;
  onOpenSettings: () => void;
  activeAlertCount: number;
  children: React.ReactNode;
}

const NAV_ITEMS: { id: AppRoute; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'conveyor', label: 'Conveyor', icon: Layers },
  { id: 'compost', label: 'Compost', icon: Recycle },
  { id: 'monitor', label: 'Monitor', icon: Activity },
  { id: 'reports', label: 'Report', icon: FileBarChart2 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
];

const QUICK_SEARCH_INDEX: { label: string; sub: string; route: AppRoute }[] = [
  { label: 'Main Dashboard', sub: 'Compost production, system status & batch IM-024', route: 'dashboard' },
  { label: 'Automated Waste Sorting', sub: 'Conveyor 1.2 m/s, Sorting Arms 1–3 & outputs', route: 'conveyor' },
  { label: 'Composting System (CB-024)', sub: 'Thermophilic Phase · 56.8°C · 62% Moisture', route: 'compost' },
  { label: 'Live System Overview', sub: 'Environmental trends, 12/12 sensors connected', route: 'monitor' },
  { label: 'System Reports & Analytics', sub: '12,480 kg processed · Batch CB-021 to CB-024', route: 'reports' },
  { label: 'System Alerts & Notifications', sub: 'Chamber CB-024 temperature & sensor alerts', route: 'alerts' },
];

export const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onNavigate,
  user,
  onLogout,
  onOpenSettings,
  activeAlertCount,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return QUICK_SEARCH_INDEX.filter(
      (item) => item.label.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-[220px] shrink-0 select-none">
      <div className="px-5 pt-5 pb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            onNavigate('dashboard');
            setMobileMenuOpen(false);
          }}
          className="cursor-pointer focus:outline-none"
          aria-label="IMARI Dashboard"
        >
          <ImariLogo className="h-8" />
        </button>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1" aria-label="Workspace navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#0E7A3A] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className={`w-[17px] h-[17px] ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </span>
              {item.id === 'alerts' && activeAlertCount > 0 && (
                <span
                  className={`text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {activeAlertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-slate-100 space-y-1">
        <button
          type="button"
          onClick={() => {
            onOpenSettings();
            setMobileMenuOpen(false);
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Settings className="w-[17px] h-[17px] text-slate-500" />
          <span>Settings</span>
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-[17px] h-[17px]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F7F9F8] text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen">{SidebarContent}</aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full">{SidebarContent}</div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md relative">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                placeholder="Search anything..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F8FAFC] border border-slate-200/90 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 transition-colors"
              />
              {searchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-30">
                  {searchResults.length > 0 ? (
                    searchResults.map((res) => (
                      <button
                        key={res.route}
                        type="button"
                        onMouseDown={() => {
                          onNavigate(res.route);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-emerald-50/60 transition-colors cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-slate-800">{res.label}</div>
                        <div className="text-[11px] text-slate-500">{res.sub}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-3.5 py-2 text-xs text-slate-500">
                      No matching modules for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Simulated system status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="whitespace-nowrap">System online</span>
            </div>

            {/* Notifications popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
                {activeAlertCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-lg p-3 z-30">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Notifications</span>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifOpen(false);
                        onNavigate('alerts');
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {DASHBOARD_ALERTS.map((a) => (
                      <div key={a.id} className="text-xs p-2 rounded-lg bg-slate-50/80">
                        <div className="font-semibold text-slate-800">{a.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {a.subtitle} · {a.ago}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Account menu"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-2 z-30">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    <div className="text-[10.5px] text-emerald-700 font-medium mt-0.5">
                      {user.facility}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate('landing');
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>Public Landing Page</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    System Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
