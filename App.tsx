
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
  Briefcase,
  ShieldCheck,
  Percent,
  Save,
  Info,
  Building,
  CreditCard
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

const SettingsPlaceholder = ({ onSaveSettings }: { onSaveSettings: () => void }) => {
  const [activeSubTab, setActiveSubTab] = useState<'bpjs' | 'tax' | 'bank'>('bpjs');
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Compliance Settings</h3>
          <p className="text-slate-500">Configure regulatory rates and contribution caps.</p>
        </div>
        <button 
          onClick={onSaveSettings}
          className="flex items-center space-x-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 flex overflow-x-auto">
          {[
            { id: 'bpjs', label: 'BPJS Rates', icon: ShieldCheck },
            { id: 'tax', label: 'PPh 21 (TER)', icon: Percent },
            { id: 'bank', label: 'Bank Integrations', icon: CreditCard },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-8 py-5 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeSubTab === tab.id 
                  ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeSubTab === 'bpjs' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Building size={16} />
                  </div>
                  <h4 className="font-bold text-slate-800">BPJS Kesehatan Configuration</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Contribution Rate (%)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">CO:</span>
                        <input type="number" defaultValue="4.0" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">EMP:</span>
                        <input type="number" defaultValue="1.0" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Monthly Salary Cap (Rp)</label>
                    <input type="number" defaultValue="12000000" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="font-bold text-slate-800">BPJS Ketenagakerjaan</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">JKK Rate (%)</label>
                    <input type="number" defaultValue="0.24" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">JKM Rate (%)</label>
                    <input type="number" defaultValue="0.30" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">JHT Rate (%) (Company / Emp)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="number" defaultValue="3.7" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                      <input type="number" defaultValue="2.0" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">JP Salary Cap (Rp)</label>
                    <input type="number" defaultValue="10047900" className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'tax' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800">
                <Info size={20} className="shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold mb-1">PPh 21 TER 2024 Compliance</p>
                  <p className="text-xs opacity-80">Tarif Efektif Rata-rata (TER) berlaku mulai 1 Januari 2024. Sesuaikan persentase berdasarkan status PTKP di bawah ini.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { cat: 'Category A', status: 'TK/0, TK/1, K/0', rate: '0% - 30%' },
                  { cat: 'Category B', status: 'TK/2, TK/3, K/1, K/2', rate: '0% - 31%' },
                  { cat: 'Category C', status: 'K/3', rate: '0% - 34%' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-bold text-slate-800">{item.cat}</p>
                        <p className="text-xs text-slate-400">{item.status}</p>
                      </div>
                      <button className="text-blue-600 text-xs font-bold uppercase hover:underline">Edit Table</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Bracket 1 (0 - 5.4M)</p>
                        <p className="text-sm font-bold">0%</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Bracket 2 (5.4M - 6.5M)</p>
                        <p className="text-sm font-bold">0.25%</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Bracket 3 (6.5M - 7.5M)</p>
                        <p className="text-sm font-bold">0.50%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'bank' && (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <CreditCard size={32} />
              </div>
              <h4 className="text-xl font-bold">KlikBCA Bisnis Integration</h4>
              <p className="text-slate-500 max-w-sm">Manage your corporate account credentials and export formats for BCA mass transfers.</p>
              <div className="w-full max-w-md p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Corporate ID</label>
                  <input type="text" defaultValue="HRPRO_CORP_01" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Source Account</label>
                  <input type="text" defaultValue="1234-567-890" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
    }
  ]);

  const [toast, setToast] = useState<Notification | null>(null);

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
      setTimeout(() => setToast(null), 5000);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleSaveSettings = () => {
    const successNotif: Notification = {
      id: Date.now().toString(),
      userId: 'admin',
      title: 'Settings Saved',
      message: 'Compliance rates and tax tables have been updated successfully.',
      timestamp: 'Just now',
      isRead: false,
      type: 'SUCCESS'
    };
    setNotifications(prev => [successNotif, ...prev]);
    setToast(successNotif);
    setTimeout(() => setToast(null), 4000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <EmployeesPlaceholder />;
      case 'attendance': return <Attendance />;
      case 'payroll': return <Payroll />;
      case 'ess': return <ESS />;
      case 'settings': return <SettingsPlaceholder onSaveSettings={handleSaveSettings} />;
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

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 w-80 flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${
              toast.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 
              toast.type === 'ALERT' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
            }`}>
              <BellRing size={20} className="animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">{toast.title}</p>
                <button onClick={() => setToast(null)}><XCircle size={14} className="text-slate-400" /></button>
              </div>
              <p className="text-xs text-slate-500 mt-1">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
