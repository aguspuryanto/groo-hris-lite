
import React from 'react';
import { Users, UserCheck, Clock, TrendingUp, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

const retentionData = [
  { month: 'Jan', rate: 98 },
  { month: 'Feb', rate: 97 },
  { month: 'Mar', rate: 99 },
  { month: 'Apr', rate: 96 },
  { month: 'May', rate: 98 },
  { month: 'Jun', rate: 97.5 },
];

const deptData = [
  { name: 'Engineering', value: 45 },
  { name: 'HR', value: 12 },
  { name: 'Creative', value: 25 },
  { name: 'Sales', value: 30 },
  { name: 'Finance', value: 12 },
];

const ageData = [
  { range: '20-25', count: 20 },
  { range: '26-30', count: 45 },
  { range: '31-35', count: 35 },
  { range: '36-40', count: 15 },
  { range: '41+', count: 9 },
];

const overtimeData = [
  { month: 'Jan', hours: 120 },
  { month: 'Feb', hours: 150 },
  { month: 'Mar', hours: 110 },
  { month: 'Apr', hours: 180 },
  { month: 'May', hours: 140 },
  { month: 'Jun', hours: 165 },
];

const COLORS = ['#2563eb', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

const StatCard = ({ icon: Icon, label, value, color, change, subValue }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        {change !== undefined && (
          <span className={`text-xs font-semibold ${change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      {subValue && <p className="text-[10px] text-slate-400 mt-1">{subValue}</p>}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Employees" value="124" color="bg-blue-500" change={2.4} />
        <StatCard icon={UserCheck} label="Avg. Attendance Rate" value="94.2%" color="bg-emerald-500" change={1.2} subValue="Last 30 days" />
        <StatCard icon={Clock} label="Monthly Overtime" value="165h" color="bg-amber-500" change={15.4} subValue="All departments" />
        <StatCard icon={Heart} label="Retention Rate" value="97.5%" color="bg-rose-500" change={-0.5} subValue="Monthly average" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Retention Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold">Employee Retention Trend</h4>
            <select className="text-xs bg-slate-50 border border-slate-200 p-1.5 rounded-lg font-medium outline-none">
              <option>Year 2024</option>
              <option>Year 2023</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dept Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6">Department Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overtime Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6">Total Monthly Overtime (Hours)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overtimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Age Demographics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6">Age Demographics</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} width={60} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Approvals Table (Analytics for Managers) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="text-rose-500" size={20} />
            <h4 className="text-lg font-bold">Pending Approvals</h4>
          </div>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">4 ACTION REQUIRED</span>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { user: 'Andi Pratama', type: 'Annual Leave', date: 'Jun 24 - 26', status: 'Pending', urgent: true },
            { user: 'Rina Wijaya', type: 'Reimbursement', date: 'Jun 12', status: 'Pending', urgent: false },
            { user: 'Eko Saputra', type: 'Overtime Claim', date: 'Jun 15', status: 'Pending', urgent: false },
          ].map((item, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                  {item.user[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.user}</p>
                  <p className="text-xs text-slate-500">{item.type} • {item.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">Approve</button>
                <button className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
