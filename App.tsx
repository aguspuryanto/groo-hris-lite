
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import ESS from './components/ESS';
// Fix: Added XCircle to imports
import { Users, Settings as SettingsIcon, BellRing, XCircle } from 'lucide-react';
import { Notification } from './types';

const EmployeesPlaceholder = () => (
  <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 shadow-sm">
    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
      <Users size={32} />
    </div>
    <h3 className="text-xl font-bold">Employee Directory</h3>
    <p className="text-slate-500 max-w-md mx-auto">Manage all your team members, their roles, and personal records in one central location.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
            <div className="h-2 w-1/3 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 shadow-sm">
    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
      <SettingsIcon size={32} />
    </div>
    <h3 className="text-xl font-bold">System Configuration</h3>
    <p className="text-slate-500 max-w-md mx-auto">Configure PPh 21 settings, BPJS caps, shift rules, and company information.</p>
    <div className="flex flex-col space-y-2 pt-6 text-left max-w-sm mx-auto">
      {['Tax TER Tables 2024', 'BPJS Rates', 'BCA KlikBCA Settings', 'Role Permissions'].map(item => (
        <div key={item} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
          <span className="text-sm font-semibold">{item}</span>
          <button className="text-blue-600 text-xs font-bold uppercase hover:underline">Edit</button>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'admin',
      title: 'Leave Request Approved',
      message: 'Your annual leave for next week has been approved by HR.',
      timestamp: '2 hours ago',
      isRead: false,
      type: 'SUCCESS'
    },
    {
      id: '2',
      userId: 'admin',
      title: 'Pending Approvals',
      message: 'You have 4 new leave requests that require your immediate approval.',
      timestamp: '5 hours ago',
      isRead: false,
      type: 'ALERT'
    },
    {
      id: '3',
      userId: 'admin',
      title: 'Payroll Deadline',
      message: 'The monthly payroll processing period ends in 2 days. Please review all claims.',
      timestamp: 'Yesterday',
      isRead: true,
      type: 'WARNING'
    },
    {
      id: '4',
      userId: 'admin',
      title: 'Company Announcement',
      message: 'Town hall meeting will be held on Friday at 3 PM in the main lounge.',
      timestamp: '2 days ago',
      isRead: true,
      type: 'INFO'
    }
  ]);

  const [toast, setToast] = useState<Notification | null>(null);

  // Simulate push notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotif: Notification = {
        id: Date.now().toString(),
        userId: 'admin',
        title: 'New Claim Submitted',
        message: 'Budi Santoso just submitted a medical reimbursement claim.',
        timestamp: 'Just now',
        isRead: false,
        type: 'ALERT'
      };
      setNotifications(prev => [newNotif, ...prev]);
      setToast(newNotif);
      
      // Auto-hide toast
      setTimeout(() => setToast(null), 5000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <EmployeesPlaceholder />;
      case 'attendance': return <Attendance />;
      case 'payroll': return <Payroll />;
      case 'ess': return <ESS />;
      case 'settings': return <SettingsPlaceholder />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      notifications={notifications}
      onMarkAsRead={markAsRead}
    >
      {renderContent()}

      {/* Real-time Push Notification Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 w-80 flex items-start space-x-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <BellRing size={20} className="animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">{toast.title}</p>
                <button onClick={() => setToast(null)}><XCircle size={14} className="text-slate-400" /></button>
              </div>
              <p className="text-xs text-slate-500 mt-1">{toast.message}</p>
              <button 
                onClick={() => { setActiveTab('dashboard'); setToast(null); }}
                className="mt-2 text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;