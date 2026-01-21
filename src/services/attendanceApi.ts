import apiClient from './api';
import { Attendance, AttendanceFormData, AttendanceResponse } from '../types';

export const attendanceApi = {
    // Mark attendance
    markAttendance: async (attendanceData: AttendanceFormData): Promise<AttendanceResponse> => {
        const response = await apiClient.post<AttendanceResponse>('/api/v1/attendance', attendanceData);
        return response.data;
    },

    // Get employee attendance
    getEmployeeAttendance: async (employeeId: string): Promise<Attendance[]> => {
        const response = await apiClient.get<Attendance[]>(`/api/v1/attendance/employee/${employeeId}`);
        return response.data;
    },

    // Get all attendance
    getAllAttendance: async (): Promise<Attendance[]> => {
        const response = await apiClient.get<Attendance[]>('/api/v1/attendance');
        return response.data;
    },

    // Get attendance by date (bonus feature)
    getAttendanceByDate: async (date: string): Promise<Attendance[]> => {
        const response = await apiClient.get<Attendance[]>('/api/v1/attendance', {
            params: { attendance_date: date }
        });
        return response.data;
    },
};
