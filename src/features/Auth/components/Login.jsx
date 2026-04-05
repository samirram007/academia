import { useRef } from "react";
import { Link, useNavigate } from 'react-router';
import BrandMark from "@/components/BrandMark";
import { useDocumentTitle } from "../../../hooks";
import { useAuthLogin } from "../hooks/mutations";

export default function Login() {
    useDocumentTitle("LOGIN")

    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const loginMutation = useAuthLogin()
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        loginMutation.mutate(payload, {
            onSuccess: () => navigate('/dashboard')
        });
    };

    return (
        <div className="h-screen w-full bg-white dark:bg-slate-900 flex overflow-hidden">
            {/* Left Side - Branding & Decoration */}
            <div
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-8"
                style={{
                    background: 'linear-gradient(135deg, #061227 0%, #0b2b5a 50%, #061227 100%)'
                }}
            >
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>
                </div>

                {/* Infographic Section */}
                <div className="relative z-10 w-full max-w-md px-8">
                    <svg className="w-full h-auto" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid meet">
                        {/* Top Section - Stats with white lines */}
                        <g>
                            {/* Stat 1 - Students */}
                            <circle cx="80" cy="50" r="35" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <text x="80" y="62" textAnchor="middle" fontSize="28" fill="#60a5fa" fontWeight="bold">👥</text>
                            <text x="80" y="115" textAnchor="middle" fontSize="22" fill="white" fontWeight="bold">5,000+</text>
                            <text x="80" y="138" textAnchor="middle" fontSize="15" fill="#93c5fd" fontWeight="600">Students</text>

                            {/* Stat 2 - Teachers */}
                            <circle cx="200" cy="50" r="35" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <text x="200" y="62" textAnchor="middle" fontSize="28" fill="#60a5fa" fontWeight="bold">🎓</text>
                            <text x="200" y="115" textAnchor="middle" fontSize="22" fill="white" fontWeight="bold">500+</text>
                            <text x="200" y="138" textAnchor="middle" fontSize="15" fill="#93c5fd" fontWeight="600">Teachers</text>

                            {/* Stat 3 - Classes */}
                            <circle cx="320" cy="50" r="35" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <text x="320" y="62" textAnchor="middle" fontSize="28" fill="#60a5fa" fontWeight="bold">📚</text>
                            <text x="320" y="115" textAnchor="middle" fontSize="22" fill="white" fontWeight="bold">100+</text>
                            <text x="320" y="138" textAnchor="middle" fontSize="15" fill="#93c5fd" fontWeight="600">Classes</text>

                            {/* Horizontal divider line */}
                            <line x1="40" y1="165" x2="360" y2="165" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />
                        </g>

                        {/* Middle Section - Features with rounded line boxes */}
                        <g>
                            {/* Feature 1 - Attendance */}
                            <rect x="20" y="190" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <circle cx="77" cy="225" r="18" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <text x="71" y="235" fontSize="22" fontWeight="bold" fill="#60a5fa">✓</text>
                            <text x="77" y="275" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Attendance</text>

                            {/* Feature 2 - Grades */}
                            <rect x="145" y="190" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <line x1="165" y1="210" x2="185" y2="235" stroke="#60a5fa" strokeWidth="2.5" />
                            <line x1="190" y1="210" x2="210" y2="235" stroke="#60a5fa" strokeWidth="2.5" />
                            <line x1="215" y1="210" x2="235" y2="235" stroke="#60a5fa" strokeWidth="2.5" />
                            <text x="202" y="266" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Grades &</text>
                            <text x="202" y="280" textAnchor="middle" fontSize="12" fill="#93c5fd">Results</text>

                            {/* Feature 3 - Fees */}
                            <rect x="270" y="190" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <circle cx="327" cy="215" r="10" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <circle cx="327" cy="235" r="15" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <text x="327" y="266" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Fee</text>
                            <text x="327" y="280" textAnchor="middle" fontSize="12" fill="#93c5fd">Management</text>
                        </g>

                        {/* Line connector */}
                        <line x1="200" y1="295" x2="200" y2="320" stroke="#60a5fa" strokeWidth="1.5" opacity="0.3" />

                        {/* Bottom Section - More Features */}
                        <g>
                            {/* Feature 4 - Student Profiles */}
                            <rect x="20" y="330" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <circle cx="77" cy="355" r="12" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <path d="M 65 375 Q 77 382 89 375" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <text x="77" y="405" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Student</text>
                            <text x="77" y="421" textAnchor="middle" fontSize="12" fill="#93c5fd">Profiles</text>

                            {/* Feature 5 - Notifications */}
                            <rect x="145" y="330" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <path d="M 185 350 Q 202 340 219 350 L 219 370 Q 202 378 185 370 Z" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <circle cx="202" cy="355" r="3" fill="#60a5fa" />
                            <text x="202" y="405" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Notifications</text>
                            <text x="202" y="421" textAnchor="middle" fontSize="12" fill="#93c5fd">System</text>

                            {/* Feature 6 - Mobile */}
                            <rect x="270" y="330" width="115" height="95" rx="12" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                            <rect x="300" y="355" width="35" height="48" rx="3" fill="none" stroke="#60a5fa" strokeWidth="2" />
                            <circle cx="317" cy="370" r="4" fill="#60a5fa" />
                            <text x="327" y="405" textAnchor="middle" fontSize="15" fill="white" fontWeight="700">Mobile</text>
                            <text x="327" y="421" textAnchor="middle" fontSize="12" fill="#93c5fd">Access</text>
                        </g>

                        {/* Horizontal divider line */}
                        <line x1="40" y1="445" x2="360" y2="445" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />

                        {/* Welcome Section */}
                        <g>
                            <text x="200" y="495" textAnchor="middle" fontSize="26" fill="#60a5fa" fontWeight="bold">Academia</text>
                            <text x="200" y="527" textAnchor="middle" fontSize="15" fill="#93c5fd" fontWeight="600">School Management System</text>

                            <text x="200" y="570" textAnchor="middle" fontSize="14" fill="white">✓ Complete School Management</text>
                            <text x="200" y="595" textAnchor="middle" fontSize="14" fill="white">✓ Secure & Reliable</text>
                            <text x="200" y="620" textAnchor="middle" fontSize="14" fill="white">✓ Easy to Use</text>

                            <text x="200" y="670" textAnchor="middle" fontSize="13" fill="#93c5fd">Trusted by 50+ Schools</text>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:bg-slate-800 flex flex-col items-center justify-center p-6 sm:p-8 overflow-y-auto">
                {/* Logo for mobile */}
                <div className="lg:hidden text-center mb-8">
                    <BrandMark
                        className="text-blue-700 dark:text-blue-300"
                        iconClassName="h-8 w-8"
                        textClassName="text-2xl font-bold tracking-wide"
                    />
                </div>

                {/* Login Form Card */}
                <div className="w-full max-w-md">
                    <div className="bg-slate-50/90 dark:bg-slate-700 rounded-2xl shadow-2xl p-8 border border-blue-100/70 dark:border-slate-600">
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Sign in to your account to continue
                                </p>
                            </div>

                            {/* Username Input */}
                            <div className="space-y-2.5">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Username
                                </label>
                                <div className="relative flex items-center">
                                    <svg className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                    <input
                                        ref={usernameRef}
                                        type="text"
                                        placeholder="Enter your username"
                                        defaultValue={"admin00000"}
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2.5">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <svg className="absolute left-4 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.54l7 3.5v6c0 4.32-2.82 8.19-7 9.32-4.18-1.13-7-5-7-9.32v-6l7-3.5z" />
                                    </svg>
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Enter your password"
                                        defaultValue={"password"}
                                        className="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-700 shadow-lg mt-8"
                            >
                                Sign In
                            </button>

                            {/* Divider */}
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-50/90 dark:bg-slate-700 text-gray-500 dark:text-gray-400">
                                        New to Academia?
                                    </span>
                                </div>
                            </div>

                            {/* Signup Link */}
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                                >
                                    Create one
                                </Link>
                            </p>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 text-xs text-gray-600 dark:text-gray-400">
                        <p>© 2024 Academia School Management. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
