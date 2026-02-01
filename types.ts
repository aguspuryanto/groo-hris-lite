
export enum EmployeeRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER'
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  role: EmployeeRole;
  salary: number;
  bankAccount: string;
  taxStatus: 'TK/0' | 'K/0' | 'K/1' | 'K/2' | 'K/3'; // Tax statuses for PPh 21
  joinDate: string;
  age: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  location: { lat: number; lng: number };
  photoUrl?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  overtime: number;
  bpjsKesehatan: number;
  bpjsKetenagakerjaan: number;
  pph21: number;
  netSalary: number;
  status: 'PENDING' | 'PAID';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
}

export interface Claim {
  id: string;
  employeeId: string;
  title: string;
  amount: number;
  date: string;
  category: 'MEDICAL' | 'TRAVEL' | 'OTHER';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  receiptUrl: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}
