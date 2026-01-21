import { useState, useEffect, useCallback } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import SuccessMessage from '../components/SuccessMessage';
import { employeeApi } from '../services/employeeApi';
import { Employee } from '../types';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await employeeApi.getAllEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEmployeeAdded = useCallback(() => {
        setSuccess('Employee added successfully!');
        setShowForm(false);
        loadEmployees();
        setTimeout(() => setSuccess(''), 5000);
    }, []);

    const handleDeleteClick = useCallback((employee: Employee) => {
        setEmployeeToDelete(employee);
    }, []);

    const handleDeleteConfirm = async () => {
        if (!employeeToDelete) return;

        try {
            setIsDeleting(true);
            await employeeApi.deleteEmployee(employeeToDelete.id);
            setSuccess('Employee deleted successfully!');
            setEmployeeToDelete(null);
            loadEmployees();
            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setEmployeeToDelete(null);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6 page-transition">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 fade-in">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-900 to-gray-700 bg-clip-text text-transparent">
                        Employee Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage your employee records</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <button
                        onClick={loadEmployees}
                        className="btn btn-secondary inline-flex items-center justify-center ripple flex-1 sm:flex-initial"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'sm:mr-2'}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn btn-primary inline-flex items-center justify-center ripple flex-1 sm:flex-initial"
                    >
                        <Plus className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">{showForm ? 'Hide Form' : 'Add Employee'}</span>
                        <span className="sm:hidden">{showForm ? 'Hide' : 'Add'}</span>
                    </button>
                </div>
            </div>

            {/* Alerts */}
            <ErrorAlert message={error} onClose={() => setError('')} />
            <SuccessMessage message={success} onClose={() => setSuccess('')} />

            {/* Employee Form */}
            {showForm && (
                <div className="slide-in-left">
                    <EmployeeForm
                        onSuccess={handleEmployeeAdded}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {/* Employee List */}
            {loading && !showForm ? (
                <LoadingSpinner message="Loading employees..." />
            ) : (
                <EmployeeList
                    employees={employees}
                    onDelete={handleDeleteClick}
                    loading={loading}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                employee={employeeToDelete}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setEmployeeToDelete(null)}
                isDeleting={isDeleting}
            />
        </div>
    );
}
