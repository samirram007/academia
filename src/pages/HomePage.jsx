import { NavLink } from 'react-router'

const HomePage = () => {
    return (
        <div className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            {/* Navigation Bar */}
            <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">Academia</span>
                        </div>
                        <NavLink
                            to={'/login'}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                School Management
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"> Simplified</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                Manage your entire school efficiently with our comprehensive management system. From attendance to grades, fees to communications - all in one platform.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <NavLink
                                to={'/login'}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg text-center"
                            >
                                Get Started
                            </NavLink>
                            <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div>
                                <p className="text-3xl font-bold text-blue-600">50+</p>
                                <p className="text-gray-600 dark:text-gray-400">Schools</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600">10K+</p>
                                <p className="text-gray-600 dark:text-gray-400">Students</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-blue-600">99.9%</p>
                                <p className="text-gray-600 dark:text-gray-400">Uptime</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="hidden md:flex justify-center">
                        <div className="relative w-full h-96">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-3xl transform rotate-3"></div>

                            {/* Illustration Box */}
                            <div className="absolute inset-0 bg-white dark:bg-slate-700 rounded-3xl shadow-2xl p-8 flex items-center justify-center -rotate-1">
                                <svg className="w-full h-full text-blue-600" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2">
                                    {/* Dashboard like illustration */}
                                    <rect x="20" y="20" width="160" height="160" rx="8" />
                                    <line x1="20" y1="50" x2="180" y2="50" />
                                    <rect x="30" y="60" width="140" height="20" rx="2" />
                                    <rect x="30" y="90" width="60" height="60" rx="2" />
                                    <rect x="100" y="90" width="70" height="60" rx="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 dark:bg-slate-800/50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to manage your school</p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Attendance Tracking</h3>
                            <p className="text-gray-600 dark:text-gray-400">Real-time attendance tracking for students and staff with automated reports.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.65-2.15-.92 1.23 2.57 3.32 3.67-4.75z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Grade Management</h3>
                            <p className="text-gray-600 dark:text-gray-400">Easy grade entry, calculation, and report card generation for all students.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.8 10.9c-2.27-.59-3.8-1.95-3.8-4.9 0-3.74 2.66-6.41 6.02-6.41 3.6 0 5.23 3.16 5.35 5.36h2.26c-.13-3.83-2.7-7.12-7.61-7.12-4.75 0-8.28 3.72-8.28 8.17 0 3.02 1.18 5.03 4.26 6.24v2.88c-2.31.46-4.75 1.63-4.75 2.64 0 .924 1.5 1.31 3.25 1.67 3.01.51 6.6 1.15 6.6 4.11 0 3.09-2.5 4.11-7.12 4.11-4.63 0-7.38-1.57-7.87-4.12H4.3c.62 3.29 3.95 5.78 9.84 5.78 5.45 0 8.74-.87 8.74-4.64 0-2.46-1.61-3.66-3.16-4.27z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fee Management</h3>
                            <p className="text-gray-600 dark:text-gray-400">Transparent fee collection, receipts, and payment tracking system.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Communication</h3>
                            <p className="text-gray-600 dark:text-gray-400">Send notifications and messages to parents and students instantly.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Student Profiles</h3>
                            <p className="text-gray-600 dark:text-gray-400">Comprehensive student records with personal and academic information.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Reports & Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-400">Detailed reports and analytics for better school management decisions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-16 text-white">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold">Why Choose Academia?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-lg">Easy to use interface</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-lg">24/7 Customer support</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-lg">99.9% Uptime Guarantee</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-lg">Secure and compliant</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-lg">Regular updates and improvements</span>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:flex justify-center">
                            <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
                                <svg className="w-full h-64 text-white" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="100" cy="100" r="80" />
                                    <path d="M100 30v140M30 100h140" />
                                    <circle cx="100" cy="100" r="20" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">Academia</span>
                            </div>
                            <p className="text-gray-400 text-sm">School Management System</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
                        <p className="text-gray-400 text-sm">© 2024 Academia. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage