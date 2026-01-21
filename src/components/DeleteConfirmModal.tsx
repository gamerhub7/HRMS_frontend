import { X, AlertTriangle } from 'lucide-react';
import { Employee } from '../types';

interface DeleteConfirmModalProps {
    employee: Employee | null;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting?: boolean;
}

export default function DeleteConfirmModal({ employee, onConfirm, onCancel, isDeleting }: DeleteConfirmModalProps) {
    if (!employee) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 fade-in">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                    </div>
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-2">
                        Are you sure you want to delete this employee?
                    </p>
                    <div className="bg-gray-50 rounded p-3 mt-3">
                        <p className="text-sm font-medium text-gray-900">{employee.full_name}</p>
                        <p className="text-sm text-gray-600">ID: {employee.employee_id}</p>
                        <p className="text-sm text-gray-600">{employee.email}</p>
                    </div>
                    <p className="text-sm text-red-600 mt-3 font-medium">
                        This will also delete all attendance records for this employee. This action cannot be undone.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="btn btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="btn btn-danger flex-1 disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Employee'}
                    </button>
                </div>
            </div>
        </div>
    );
}
