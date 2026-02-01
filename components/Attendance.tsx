
import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, CheckCircle, Clock, Calendar } from 'lucide-react';
import { SHIFTS } from '../constants.tsx';

const Attendance: React.FC = () => {
  const [isPresent, setIsPresent] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  const captureAndCheckIn = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      
      // Simulate check in
      setIsPresent(true);
      setIsCapturing(false);
      
      // Stop camera stream
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Geolocation error", err)
    );
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
        
        <div className="relative flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg mb-2">
            <Clock size={40} />
          </div>
          
          <h3 className="text-3xl font-bold text-slate-900">Mobile Attendance</h3>
          <p className="text-slate-500 max-w-md">Verify your identity and location to mark your attendance for today's shift.</p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Location</p>
                <p className="text-sm font-semibold">{location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Detecting...'}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Shift</p>
                <p className="text-sm font-semibold">{SHIFTS[0].name} ({SHIFTS[0].startTime} - {SHIFTS[0].endTime})</p>
              </div>
            </div>
          </div>

          {!isPresent ? (
            <div className="w-full space-y-4">
              {isCapturing ? (
                <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-3xl pointer-events-none m-8 opacity-50"></div>
                  <button 
                    onClick={captureAndCheckIn}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all flex items-center space-x-2"
                  >
                    <Camera size={20} />
                    <span>Verify & Check-In</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={startCamera}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2"
                >
                  <Camera size={20} />
                  <span>Start Verification</span>
                </button>
              )}
            </div>
          ) : (
            <div className="w-full p-8 bg-emerald-50 border-2 border-emerald-200 rounded-3xl flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-emerald-800">Checked In Successfully</h4>
                <p className="text-emerald-600">Time: {new Date().toLocaleTimeString('id-ID')}</p>
              </div>
              <canvas ref={canvasRef} className="hidden" />
              <button 
                className="text-emerald-700 font-semibold underline text-sm"
                onClick={() => setIsPresent(false)}
              >
                Reset for Demo
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-800">Attendance History</h4>
          <div className="flex space-x-2">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1 bg-slate-50">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Shift</th>
                <th className="px-6 py-4">Clock In</th>
                <th className="px-6 py-4">Clock Out</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2024-05-20', shift: 'Morning', in: '07:58', out: '17:05', status: 'ON TIME' },
                { date: '2024-05-19', shift: 'Morning', in: '08:15', out: '17:10', status: 'LATE' },
                { date: '2024-05-18', shift: 'Morning', in: '07:55', out: '17:00', status: 'ON TIME' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{row.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.shift}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.in}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.out}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      row.status === 'ON TIME' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
