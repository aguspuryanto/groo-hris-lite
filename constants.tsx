
import { Employee, EmployeeRole, Shift } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: 'Budi Santoso',
    email: 'budi@company.com',
    position: 'Senior Developer',
    department: 'Engineering',
    role: EmployeeRole.ADMIN,
    salary: 15000000,
    bankAccount: '1234567890',
    taxStatus: 'K/1',
    joinDate: '2022-01-15',
    // Fix: Added missing age property
    age: 35
  },
  {
    id: 'EMP002',
    name: 'Siti Aminah',
    email: 'siti@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    role: EmployeeRole.MANAGER,
    salary: 12000000,
    bankAccount: '0987654321',
    taxStatus: 'TK/0',
    joinDate: '2021-06-10',
    // Fix: Added missing age property
    age: 30
  },
  {
    id: 'EMP003',
    name: 'Andi Pratama',
    email: 'andi@company.com',
    position: 'Designer',
    department: 'Creative',
    role: EmployeeRole.EMPLOYEE,
    salary: 8000000,
    bankAccount: '5556667778',
    taxStatus: 'TK/0',
    joinDate: '2023-03-01',
    // Fix: Added missing age property
    age: 26
  }
];

export const SHIFTS: Shift[] = [
  { id: 'S1', name: 'Morning', startTime: '08:00', endTime: '17:00' },
  { id: 'S2', name: 'Afternoon', startTime: '14:00', endTime: '22:00' },
  { id: 'S3', name: 'Night', startTime: '22:00', endTime: '06:00' }
];

export const TAX_TER_CATEGORIES = {
  A: ['TK/0', 'TK/1', 'K/0'],
  B: ['TK/2', 'TK/3', 'K/1', 'K/2'],
  C: ['K/3']
};