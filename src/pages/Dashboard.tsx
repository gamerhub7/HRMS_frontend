import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, CheckCircle, TrendingUp, LucideIcon, RefreshCw } from 'lucide-react';
import { employeeApi } from '../services/employeeApi';
import { attendanceApi } from '../services/attendanceApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

interface DashboardStats {
    totalEmployees: number;
    totalAttendance: number;
    presentToday: number;
    absentToday: number;
}

interface StatCard {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    textColor: string;
}

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState<DashboardStats>({
        totalEmployees: 0,
        totalAttendance: 0,
        presentToday: 0,
        absentToday: 0,
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [employees, attendance] = await Promise.all([
                employeeApi.getAllEmployees(),
                attendanceApi.getAllAttendance(),
            ]);

            // Get today's date
            const today = new Date().toISOString().split('T')[0];
            // FIX: Use 'date' field instead of 'attendance_date' to match backend response
            const todayAttendance = attendance.filter(a => a.date === today);

            setStats({
                totalEmployees: employees.length,
                totalAttendance: attendance.length,
                presentToday: todayAttendance.filter(a => a.status === 'Present').length,
                absentToday: todayAttendance.filter(a => a.status === 'Absent').length,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    const statCards: StatCard[] = [
        {
            title: 'Total Employees',
            value: stats.totalEmployees,
            icon: Users,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            title: 'Total Attendance Records',
            value: stats.totalAttendance,
            icon: Calendar,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
        },
        {
            title: 'Present Today',
            value: stats.presentToday,
            icon: CheckCircle,
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
        },
        {
            title: 'Absent Today',
            value: stats.absentToday,
            icon: TrendingUp,
            color: 'bg-red-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
        },
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                    Overview of your workforce
                    </p>
                </div>
                <button
                    onClick={loadDashboardData}
                    className="btn btn-secondary inline-flex items-center justify-center w-full sm:w-auto"
                    disabled={loading}
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            <ErrorAlert message={error} onClose={() => setError('')} />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={stat.title}
                        className={`card fade-in hover-glow stagger-${index + 1}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center">
                            <div className={`p-3 rounded-xl shadow-md ${stat.bgColor} transform transition-transform hover:scale-110 hover:rotate-3`}>
                                <stat.icon className={`w-6 h-6 ${stat.textColor} animate-float`} />
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card scale-in">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/employees"
                        className="group p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        <Users className="w-10 h-10 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600">Manage Employees</h3>
                        <p className="text-sm text-gray-600 mt-1">Add, view, or delete employee records</p>
                    </Link>
                    <Link
                        to="/attendance"
                        className="group p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        <Calendar className="w-10 h-10 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600">Track Attendance</h3>
                        <p className="text-sm text-gray-600 mt-1">Mark and view attendance records</p>
                    </Link>
                </div>
            </div>

            {/* Info Section */}
            {stats.totalEmployees === 0 && (
                <div className="card bg-amber-50 border border-amber-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-amber-800">Get Started</h3>
                            <p className="mt-1 text-sm text-amber-700">
                                No employees in the system yet. Start by adding your first employee to begin tracking attendance.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
