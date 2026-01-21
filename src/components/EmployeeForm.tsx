import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { employeeApi } from '../services/employeeApi';
import { EmployeeFormData } from '../types';

interface EmployeeFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function EmployeeForm({ onSuccess, onCancel }: EmployeeFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showCustomDepartment, setShowCustomDepartment] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<EmployeeFormData>();

    // Watch the department field to toggle custom input
    const departmentValue = watch('department');

    useEffect(() => {
        if (departmentValue === 'custom') {
            setShowCustomDepartment(true);
            setValue('department', ''); // Clear to allow custom input
        }
    }, [departmentValue, setValue]);

    const onSubmit = async (data: EmployeeFormData) => {
        setError('');
        setIsSubmitting(true);

        try {
            await employeeApi.createEmployee(data);
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Employee</h2>
                {onCancel && (
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 p-2">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-xs sm:text-sm text-red-800">{error}</p>
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-xs sm:text-sm text-blue-800">
                    ℹ️ Employee ID will be <strong>automatically generated</strong> (e.g., EMP001, EMP002, etc.)
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                    </label>
                    <input
                        id="full_name"
                        type="text"
                        className={`input ${errors.full_name ? 'border-red-500' : ''}`}
                        {...register('full_name', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        placeholder="e.g., John Doe"
                    />
                    {errors.full_name && (
                        <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`input ${errors.email ? 'border-red-500' : ''}`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                        placeholder="e.g., john.doe@company.com"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                    </label>

                    {showCustomDepartment ? (
                        <div className="space-y-2">
                            <input
                                id="department"
                                type="text"
                                className={`input ${errors.department ? 'border-red-500' : ''}`}
                                {...register('department', {
                                    required: 'Department name is required',
                                    minLength: { value: 2, message: 'Department name must be at least 2 characters' }
                                })}
                                placeholder="Enter custom department (e.g., Games, Movies, etc.)"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomDepartment(false);
                                    setValue('department', '');
                                }}
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                ← Back to department list
                            </button>
                        </div>
                    ) : (
                        <select
                            id="department"
                            className={`input ${errors.department ? 'border-red-500' : ''}`}
                            {...register('department', { required: 'Department is required' })}
                        >
                            <option value="">Select a department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Operations">Operations</option>
                            <option value="Customer Support">Customer Support</option>
                            <option value="custom">Add Custom Department</option>
                        </select>
                    )}

                    {errors.department && (
                        <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full sm:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Adding Employee...' : 'Add Employee'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-secondary w-full sm:w-auto"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
