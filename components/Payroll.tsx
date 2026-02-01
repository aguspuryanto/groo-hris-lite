
import React, { useState } from 'react';
import { 
  Calculator, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  Building,
  CreditCard
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants.tsx';
import { 
  calculateBPJSKesehatan, 
  calculateBPJSKetenagakerjaan, 
  calculatePPh21 
} from '../utils/calculations';

const Payroll: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('May 2024');

  const processPayroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };

  const generateBCAFile = () => {
    const header = "BCA_KLIK_BISNIS_PAYROLL_V1";
    const body = MOCK_EMPLOYEES.map(emp => {
      return `${emp.bankAccount},${emp.name},${emp.salary},SALARY_TRANSFER_${selectedMonth}`;
    }).join('\n');
    
    const element = document.createElement("a");
    const file = new Blob([header + '\n' + body], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `BCA_PAYROLL_${selectedMonth.replace(' ', '_')}.csv`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Payroll Management</h3>
          <p className="text-slate-500">Calculate, review, and execute monthly salary transfers.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>April 2024</option>
            <option>May 2024</option>
            <option>June 2024</option>
          </select>
          {!isProcessed ? (
            <button 
              onClick={processPayroll}
              disabled={isProcessing}
              className={`flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100 transition-all ${isProcessing ? 'opacity-50' : 'hover:bg-blue-700'}`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  <span>Run Payroll</span>
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={generateBCAFile}
              className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-lg shadow-emerald-100 transition-all"
            >
              <Download size={18} />
              <span>Export BCA CSV</span>
            </button>
          )}
        </div>
      </div>

      {isProcessed && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center space-x-4 animate-in slide-in-from-top duration-300">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-emerald-800 font-bold">Payroll for {selectedMonth} is ready!</p>
            <p className="text-emerald-600 text-sm">Calculations include PPh 21 (TER 2024) and BPJS compliance.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h4 className="text-lg font-bold">Payroll Summary</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Basic Salary</th>
                <th className="px-6 py-4">BPJS (Emp)</th>
                <th className="px-6 py-4">PPh 21</th>
                <th className="px-6 py-4">Take Home Pay</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_EMPLOYEES.map((emp) => {
                const bpjsKes = calculateBPJSKesehatan(emp.salary);
                const bpjsKet = calculateBPJSKetenagakerjaan(emp.salary);
                const totalBPJS = bpjsKes.employee + bpjsKet.jht_employee + bpjsKet.jp_employee;
                const pph21 = calculatePPh21(emp.salary, emp.taxStatus);
                const takeHome = emp.salary - totalBPJS - pph21;

                return (
                  <tr key={emp.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {emp.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{emp.name}</p>
                          <p className="text-[10px] text-slate-400">{emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">Rp {emp.salary.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-sm text-rose-500 font-medium">-Rp {totalBPJS.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-sm text-rose-500 font-medium">-Rp {pph21.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">Rp {takeHome.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-bold uppercase flex items-center space-x-1">
                        <FileSpreadsheet size={14} />
                        <span>Slip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-800">BPJS Integration</h5>
            <Building className="text-blue-500" size={20} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">BPJS Kesehatan</span>
              <span className="font-semibold text-emerald-600 text-xs">Syncing...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">BPJS Ketenagakerjaan</span>
              <span className="font-semibold text-emerald-600 text-xs">Syncing...</span>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-colors">
            Generate BPJS Files
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-800">Tax Compliance</h5>
            <AlertCircle className="text-amber-500" size={20} />
          </div>
          <p className="text-xs text-slate-500">Sistem mematuhi tarif PPh 21 TER (Tarif Efektif Rata-rata) 2024.</p>
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-colors">
            Download SPT 1721-A1
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-800">Bank Transfer (BCA)</h5>
            <CreditCard className="text-indigo-500" size={20} />
          </div>
          <p className="text-xs text-slate-500">Format file siap untuk KlikBCA Bisnis & LLG/Payroll Batch.</p>
          <button 
            disabled={!isProcessed}
            onClick={generateBCAFile}
            className={`w-full py-2 ${isProcessed ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'} rounded-lg text-xs font-bold transition-colors`}
          >
            Download Payroll File
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
