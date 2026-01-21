import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, Calendar, LayoutDashboard, LucideIcon, Menu, X } from 'lucide-react';

interface NavLinkItem {
    to: string;
    icon: LucideIcon;
    label: string;
}

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks: NavLinkItem[] = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/employees', icon: Users, label: 'Employees' },
        { to: '/attendance', icon: Calendar, label: 'Attendance' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                HRMS Lite
                            </h1>
                            <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-500 hidden sm:inline">
                                Employee & Attendance Management
                            </span>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Desktop Navigation */}
            <nav className="hidden md:block bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {navLinks.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-4 border-b-2 text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 mr-2" />
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg slide-in-left">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-8 sm:mt-12 md:mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <p className="text-center text-xs sm:text-sm text-gray-500">
                        © 2024 HRMS Lite. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
