import { format } from 'date-fns';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import EmptyState from './EmptyState';

import { Attendance } from '../types';

interface AttendanceTableProps {
    attendance: Attendance[];
    loading?: boolean;
}

export default function AttendanceTable({ attendance, loading }: AttendanceTableProps) {
    if (loading) {
        return <div className="card">Loading attendance records...</div>;
    }

    if (attendance.length === 0) {
        return (
            <EmptyState
                icon={Calendar}
                title="No attendance records"
                message="Attendance records will appear here once you start marking attendance"
            />
        );
    }

    // Calculate statistics
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;

    return (
        <div className="card fade-in">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-gray-600">Present: <span className="font-semibold text-gray-900">{presentCount}</span></span>
                    </div>
                    <div className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-gray-600">Absent: <span className="font-semibold text-gray-900">{absentCount}</span></span>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="table-header">Employee ID</th>
                            <th className="table-header">Date</th>
                            <th className="table-header">Status</th>
                            <th className="table-header">Marked On</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {attendance.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                <td className="table-cell font-medium text-primary-600">
                                    {record.employee_id}
                                </td>
                                <td className="table-cell">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                        {format(new Date(record.date), 'MMM dd, yyyy')}
                                    </div>
                                </td>
                                <td className="table-cell">
                                    {record.status === 'Present' ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Present
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <XCircle className="w-3 h-3 mr-1" />
                                            Absent
                                        </span>
                                    )}
                                </td>
                                <td className="table-cell text-gray-500 text-sm">
                                    {format(new Date(record.created_at), 'MMM dd, yyyy HH:mm')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Total records: <span className="font-semibold text-gray-900">{attendance.length}</span>
            </div>
        </div>
    );
}
