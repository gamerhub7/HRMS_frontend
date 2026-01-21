import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { attendanceApi } from '../services/attendanceApi';
import { employeeApi } from '../services/employeeApi';
import { Employee } from '../types';

interface AttendanceFormData {
    employee_id: string;
    date: string;
    status: 'Present' | 'Absent';
}

interface AttendanceFormProps {
    onSuccess?: () => void;
}

export default function AttendanceForm({ onSuccess }: AttendanceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AttendanceFormData>();

    useEffect(() => {
        loadEmployees();
    }, []);

    // Helper function to get today's date in local timezone (YYYY-MM-DD format)
    const getTodayLocalDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const loadEmployees = async () => {
        try {
            const data = await employeeApi.getAllEmployees();
            setEmployees(data);
        } catch (err) {
            setError('Failed to load employees');
        } finally {
            setLoadingEmployees(false);
        }
    };

    const onSubmit = async (data: AttendanceFormData) => {
        setError('');
        setIsSubmitting(true);

        try {
            await attendanceApi.markAttendance({
                employee_id: data.employee_id,
                date: data.date,
                status: data.status
            });
            reset();
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card fade-in">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Mark Attendance</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Employee *
                    </label>
                    <select
                        id="employee_id"
                        className={`input ${errors.employee_id ? 'border-red-500' : ''}`}
                        {...register('employee_id', { required: 'Please select an employee' })}
                        disabled={loadingEmployees || employees.length === 0}
                    >
                        <option value="">
                            {loadingEmployees ? 'Loading employees...' : 'Select an employee'}
                        </option>
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.employee_id}>
                                {emp.employee_id} - {emp.full_name}
                            </option>
                        ))}
                    </select>
                    {errors.employee_id && (
                        <p className="text-sm text-red-600 mt-1">{errors.employee_id.message}</p>
                    )}
                    {!loadingEmployees && employees.length === 0 && (
                        <p className="text-sm text-amber-600 mt-1">No employees available. Please add employees first.</p>
                    )}
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                    </label>
                    <input
                        id="date"
                        type="date"
                        className={`input ${errors.date ? 'border-red-500' : ''}`}
                        defaultValue={getTodayLocalDate()}
                        max={getTodayLocalDate()}
                        {...register('date', {
                            required: 'Date is required',
                        })}
                    />
                    {errors.date && (
                        <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="Present"
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                {...register('status', { required: 'Please select a status' })}
                            />
                            <span className="ml-2 text-sm text-gray-700">Present</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="Absent"
                                className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                {...register('status', { required: 'Please select a status' })}
                            />
                            <span className="ml-2 text-sm text-gray-700">Absent</span>
                        </label>
                    </div>
                    {errors.status && (
                        <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || employees.length === 0}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Marking Attendance...' : 'Mark Attendance'}
                </button>
            </form>
        </div>
    );
}
