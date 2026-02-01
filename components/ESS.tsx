
import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Upload,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const ESS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'claims' | 'leaves'>('claims');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* User Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full border-4 border-white border-opacity-20 overflow-hidden shadow-lg bg-white bg-opacity-10 flex items-center justify-center text-3xl font-bold">
            B
          </div>
          <div>
            <h3 className="text-2xl font-bold">Welcome, Budi Santoso</h3>
            <p className="text-blue-100">Senior Developer • Engineering Department</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-2xl text-center">
            <p className="text-[10px] uppercase font-bold text-blue-200">Leave Balance</p>
            <p className="text-xl font-bold">12 Days</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-2xl text-center">
            <p className="text-[10px] uppercase font-bold text-blue-200">Working Year</p>
            <p className="text-xl font-bold">2.5 Yrs</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100">
          <nav className="flex px-6">
            <button 
              onClick={() => setActiveTab('claims')}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'claims' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
            >
              Reimbursement & Claims
            </button>
            <button 
              onClick={() => setActiveTab('leaves')}
              className={`px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'leaves' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
            >
              Leave Requests
            </button>
          </nav>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-slate-800">
              {activeTab === 'claims' ? 'My Reimbursements' : 'My Leave History'}
            </h4>
            <button 
              onClick={() => setIsClaimModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-100 transition-all"
            >
              <Plus size={18} />
              <span>{activeTab === 'claims' ? 'Submit New Claim' : 'Apply for Leave'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'claims' ? (
              [
                { id: 'CLM001', title: 'Medical Checkup', date: '2024-05-15', amount: 500000, status: 'APPROVED' },
                { id: 'CLM002', title: 'Travel Jakarta - Surabaya', date: '2024-05-10', amount: 1250000, status: 'PENDING' },
                { id: 'CLM003', title: 'Office Supplies', date: '2024-04-28', amount: 120000, status: 'REJECTED' },
              ].map((claim) => (
                <div key={claim.id} className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{claim.title}</p>
                      <div className="flex items-center text-xs text-slate-400 space-x-2 mt-1">
                        <Calendar size={12} />
                        <span>{claim.date}</span>
                        <span>•</span>
                        <span>{claim.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">Rp {claim.amount.toLocaleString('id-ID')}</p>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase mt-2 inline-block ${
                      claim.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                      claim.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              [
                { type: 'Annual Leave', range: 'May 20 - May 22', duration: '3 Days', status: 'APPROVED' },
                { type: 'Sick Leave', range: 'April 12', duration: '1 Day', status: 'APPROVED' },
              ].map((leave, i) => (
                <div key={i} className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{leave.type}</p>
                      <div className="flex items-center text-xs text-slate-400 space-x-2 mt-1">
                        <Clock size={12} />
                        <span>{leave.range}</span>
                        <span>•</span>
                        <span>{leave.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase">
                      {leave.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Claim Submission Modal (Mockup) */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">New Reimbursement</h3>
              <button onClick={() => setIsClaimModalOpen(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Claim Title</label>
                <input type="text" placeholder="e.g. Medika Hospital Checkup" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount (Rp)</label>
                  <input type="number" placeholder="500000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Receipt / Invoice</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="text-slate-300 mb-2" size={32} />
                  <p className="text-sm text-slate-500">Click to upload or drag & drop</p>
                  <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or PDF up to 5MB</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsClaimModalOpen(false)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ESS;
