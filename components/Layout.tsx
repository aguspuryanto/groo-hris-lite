
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X,
  UserCircle,
  CheckCircle2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { Notification } from '../types';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, notifications, onMarkAsRead }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isNotifOpen, setNotifOpen] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-30`}>
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HRIS Pro</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Users size={20} />} label="Employees" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} />
          <SidebarItem icon={<Clock size={20} />} label="Attendance" active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} />
          <SidebarItem icon={<CreditCard size={20} />} label="Payroll" active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} />
          <SidebarItem icon={<FileText size={20} />} label="ESS / Claims" active={activeTab === 'ess'} onClick={() => setActiveTab('ess')} />
          <div className="pt-4 border-t border-slate-100">
            <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center p-3 space-x-3 rounded-lg bg-slate-50 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserCircle size={24} />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@hris.pro</p>
              </div>
            )}
            {isSidebarOpen && <button className="text-slate-400 hover:text-red-500"><LogOut size={18} /></button>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            {/* Notification Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => setNotifOpen(!isNotifOpen)}
                className={`relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors ${isNotifOpen ? 'bg-slate-100 text-blue-600' : ''}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Center Pop-over */}
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-bold">Notifications</h4>
                      <button className="text-xs text-blue-600 font-bold hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-slate-400 text-sm">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => { onMarkAsRead(notif.id); setNotifOpen(false); }}
                            className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!notif.isRead ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className="flex space-x-3">
                              <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                                notif.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' :
                                notif.type === 'ALERT' ? 'bg-rose-100 text-rose-600' :
                                notif.type === 'WARNING' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                              }`}>
                                {notif.type === 'SUCCESS' ? <CheckCircle2 size={16} /> : 
                                 notif.type === 'ALERT' ? <AlertTriangle size={16} /> : <Info size={16} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!notif.isRead ? 'font-bold' : 'font-medium'} text-slate-800`}>{notif.title}</p>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{notif.message}</p>
                                <p className="text-[10px] text-slate-400 mt-1">{notif.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 text-center border-t border-slate-100">
                      <button className="text-xs font-bold text-slate-500 hover:text-blue-600">View History</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-sm text-slate-500 font-medium">
              {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
