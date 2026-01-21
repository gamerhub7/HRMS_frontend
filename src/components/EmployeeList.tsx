import { Trash2, Mail, Briefcase, User } from 'lucide-react';
import EmptyState from './EmptyState';
import { Employee } from '../types';

interface EmployeeListProps {
    employees: Employee[];
    onDelete: (employee: Employee) => void;
    loading?: boolean;
}

export default function EmployeeList({ employees, onDelete, loading }: EmployeeListProps) {
    if (loading) {
        return <div className="card">Loading employees...</div>;
    }

    if (employees.length === 0) {
        return (
            <EmptyState
                icon={User}
                title="No employees yet"
                message="Start by adding your first employee to the system"
            />
        );
    }

    return (
        <div className="card fade-in">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Employee List
            </h2>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {employees.map((employee, index) => (
                    <div
                        key={employee.id}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all scale-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <User className="w-4 h-4 text-primary-600 mr-2" />
                                    <h3 className="font-semibold text-gray-900">{employee.full_name}</h3>
                                </div>
                                <p className="text-xs text-primary-600 font-medium mb-1">
                                    ID: {employee.employee_id}
                                </p>
                            </div>
                            <button
                                onClick={() => onDelete(employee)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete employee"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="truncate">{employee.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                    {employee.department}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block table-container">
                <table className="table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="table-header">Employee ID</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Department</th>
                            <th className="table-header text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="table-cell font-medium text-primary-600">
                                    {employee.employee_id}
                                </td>
                                <td className="table-cell">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 text-gray-400 mr-2" />
                                        {employee.full_name}
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {employee.email}
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="flex items-center">
                                        <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                            {employee.department}
                                        </span>
                                    </div>
                                </td>
                                <td className="table-cell text-right">
                                    <button
                                        onClick={() => onDelete(employee)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded"
                                        title="Delete employee"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-xs sm:text-sm text-gray-500">
                Total employees: <span className="font-semibold text-gray-900">{employees.length}</span>
            </div>
        </div>
    );
}
