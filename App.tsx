
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Payroll from './components/Payroll';
import ESS from './components/ESS';
import { 
  Users, 
  Settings as SettingsIcon, 
  BellRing, 
  XCircle, 
  Search, 
  Filter, 
  UserPlus, 
  ChevronRight,
  MoreVertical,
  Mail,
  Briefcase
} from 'lucide-react';
import { Notification, EmployeeRole } from './types';
import { MOCK_EMPLOYEES } from './constants';

const EmployeesPlaceholder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  const departments = useMemo(() => {
    const depts = new Set(MOCK_EMPLOYEES.map(emp => emp.department));
    return ['All Departments', ...Array.from(depts)];
  }, []);

  const roles = ['All Roles', ...Object.values(EmployeeRole)];

  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All Departments' || emp.department === deptFilter;
      const matchesRole = roleFilter === 'All Roles' || emp.role === roleFilter;
      return matchesSearch && matchesDept && matchesRole;
    });
  }, [searchQuery, deptFilter, roleFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Employee Directory</h3>
          <p className="text-slate-500">Manage your workforce, roles, and department assignments.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all">
          <UserPlus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-slate-700"
            >
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div className="relative min-w-[160px]">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium text-slate-700"
            >
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Employee List */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(emp => (
            <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                  {emp.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{emp.name}</h4>
                  <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">{emp.id}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-slate-500">
                      <Briefcase size={12} className="mr-2 text-slate-400" />
                      <span className="truncate">{emp.position}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Users size={12} className="mr-2 text-slate-400" />
                      <span>{emp.department}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Mail size={12} className="mr-2 text-slate-400" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                  emp.role === EmployeeRole.ADMIN ? 'bg-indigo-100 text-indigo-700' :
                  emp.role === EmployeeRole.MANAGER ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {emp.role}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center">
                  Profile <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No employees found</h3>
          <p className="text-slate-500 max-w-md mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); setDeptFilter('All Departments'); setRoleFilter('All Roles'); }}
            className="text-blue-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

const SettingsPlaceholder = () => (
  <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 shadow-sm">
    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
      <SettingsIcon size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-800">System Configuration</h3>
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
