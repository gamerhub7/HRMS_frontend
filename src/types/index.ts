// ============================================================================
// Employee Types
// ============================================================================

export interface Employee {
    id: number;
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
}

export interface EmployeeFormData {
    full_name: string;
    email: string;
    department: string;
}

export interface EmployeeResponse {
    id: number;
    employee_id: string;
    full_name: string;
    email: string;
    department: string;
}

// ============================================================================
// Attendance Types
// ============================================================================

export type AttendanceStatus = 'Present' | 'Absent' | 'On Leave' | 'Half Day';

export interface Attendance {
    id: number;
    employee_id: string;
    employee_name?: string;
    date: string; // Backend returns this field
    status: AttendanceStatus;
    check_in_time?: string | null;
    check_out_time?: string | null;
    notes?: string | null;
    created_at: string;
}

export interface AttendanceFormData {
    employee_id: string;
    date: string; // Match backend field name
    status: AttendanceStatus;
    check_in_time?: string;
    check_out_time?: string;
    notes?: string;
}

export interface AttendanceResponse {
    id: number;
    employee_id: string;
    employee_name: string;
    date: string; // Match backend field name
    status: AttendanceStatus;
    check_in_time?: string | null;
    check_out_time?: string | null;
    notes?: string | null;
    created_at: string;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface EmployeeFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export interface EmployeeListProps {
    employees: Employee[];
    onDeleteEmployee: (employeeId: number) => void;
}

export interface AttendanceFormProps {
    employees: Employee[];
    onSuccess?: () => void;
    onCancel?: () => void;
}

export interface AttendanceTableProps {
    attendanceRecords: Attendance[];
}

export interface ErrorAlertProps {
    message: string;
}

export interface SuccessMessageProps {
    message: string;
}

export interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export interface DeleteConfirmModalProps {
    isOpen: boolean;
    itemName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting?: boolean;
}

// ============================================================================
// API Types
// ============================================================================

export interface ApiErrorResponse {
    detail: string;
}

export interface DashboardStats {
    total_employees: number;
    present_today: number;
    average_attendance: number;
    total_departments: number;
}
