import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceTable from '../components/AttendanceTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import SuccessMessage from '../components/SuccessMessage';
import { attendanceApi } from '../services/attendanceApi';

import { Attendance } from '../types';

export default function AttendancePage() {
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await attendanceApi.getAllAttendance();
            setAttendance(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAttendanceMarked = useCallback(() => {
        setSuccess('Attendance marked successfully!');
        loadAttendance();
        setTimeout(() => setSuccess(''), 5000);
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
                    <p className="text-gray-600 mt-2">Mark and track employee attendance</p>
                </div>
                <button
                    onClick={loadAttendance}
                    className="btn btn-secondary inline-flex items-center"
                    disabled={loading}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Alerts */}
            <ErrorAlert message={error} onClose={() => setError('')} />
            <SuccessMessage message={success} onClose={() => setSuccess('')} />

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance Form */}
                <div className="lg:col-span-1">
                    <AttendanceForm onSuccess={handleAttendanceMarked} />
                </div>

                {/* Attendance Table */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <LoadingSpinner message="Loading attendance records..." />
                    ) : (
                        <AttendanceTable attendance={attendance} loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
}
