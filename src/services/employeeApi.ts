import apiClient from './api';
import { Employee, EmployeeFormData, EmployeeResponse } from '../types';

export const employeeApi = {
    // Get all employees
    getAllEmployees: async (): Promise<Employee[]> => {
        const response = await apiClient.get<Employee[]>('/api/v1/employees');
        return response.data;
    },

    // Create new employee
    createEmployee: async (employeeData: EmployeeFormData): Promise<EmployeeResponse> => {
        const response = await apiClient.post<EmployeeResponse>('/api/v1/employees', employeeData);
        return response.data;
    },

    // Get employee by ID
    getEmployeeById: async (employeeId: number): Promise<Employee> => {
        const response = await apiClient.get<Employee>(`/api/v1/employees/${employeeId}`);
        return response.data;
    },

    // Delete employee
    deleteEmployee: async (employeeId: number): Promise<void> => {
        await apiClient.delete(`/api/v1/employees/${employeeId}`);
    },
};
