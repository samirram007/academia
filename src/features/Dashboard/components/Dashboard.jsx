
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    fetchBuildings,
    fetchFees,
    fetchFloors,
    fetchRooms,
    fetchSubjects,
    fetchUsers,
} from '../../../services';
import { fetchAttendances } from '../../../services/attendances-api';
import { useTheme } from '../../../contexts/ThemeProvider';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.data)) return data.data.data;
    if (Array.isArray(data?.items)) return data.items;
    return [];
};

const toCount = (data) => {
    const list = toArray(data);
    if (list.length > 0) return list.length;

    const count =
        data?.meta?.total ??
        data?.total ??
        data?.count ??
        data?.data?.total ??
        data?.data?.count ??
        0;

    return Number(count) || 0;
};

const normalizeRole = (user) => {
    const roleSource = user?.role ?? user?.user_type ?? user?.type ?? user?.user_role ?? 'other';
    const roleValue = typeof roleSource === 'string' ? roleSource : roleSource?.name ?? 'other';
    return String(roleValue).toLowerCase();
};

const prettyRole = (role) => {
    if (!role) return 'Unknown';
    return role.charAt(0).toUpperCase() + role.slice(1);
};

const Dashboard = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const panel =
        'rounded-2xl border border-blue-200/70 dark:border-cyan-400/10 bg-white/85 dark:bg-slate-900/70 p-5 shadow-[0_20px_70px_-40px_rgba(37,99,235,0.25)] dark:shadow-[0_20px_70px_-40px_rgba(34,211,238,0.45)] backdrop-blur-sm';

    const results = useQueries({
        queries: [
            { queryKey: ['dashboard_users'], queryFn: fetchUsers },
            { queryKey: ['dashboard_subjects'], queryFn: fetchSubjects },
            { queryKey: ['dashboard_fees'], queryFn: fetchFees },
            { queryKey: ['dashboard_rooms'], queryFn: fetchRooms },
            { queryKey: ['dashboard_buildings'], queryFn: fetchBuildings },
            { queryKey: ['dashboard_floors'], queryFn: fetchFloors },
            { queryKey: ['dashboard_attendances'], queryFn: fetchAttendances },
        ],
    });

    const [usersQuery, subjectsQuery, feesQuery, roomsQuery, buildingsQuery, floorsQuery, attendancesQuery] = results;

    const hasAnyError = results.some((query) => query.isError);
    const isFirstLoad = results.every((query) => query.isLoading);

    const dashboardData = useMemo(() => {
        const users = toArray(usersQuery.data);
        const subjects = toCount(subjectsQuery.data);
        const fees = toCount(feesQuery.data);
        const rooms = toCount(roomsQuery.data);
        const buildings = toCount(buildingsQuery.data);
        const floors = toCount(floorsQuery.data);
        const attendances = toCount(attendancesQuery.data);

        const roleSummary = users.reduce(
            (acc, user) => {
                const role = normalizeRole(user);
                if (role.includes('student')) acc.student += 1;
                else if (role.includes('teacher')) acc.teacher += 1;
                else if (role.includes('admin')) acc.admin += 1;
                else acc.other += 1;
                return acc;
            },
            { student: 0, teacher: 0, admin: 0, other: 0 }
        );

        const recentUsers = users.slice(0, 6);

        return {
            totalUsers: users.length,
            subjects,
            fees,
            rooms,
            buildings,
            floors,
            attendances,
            roleSummary,
            recentUsers,
        };
    }, [
        usersQuery.data,
        subjectsQuery.data,
        feesQuery.data,
        roomsQuery.data,
        buildingsQuery.data,
        floorsQuery.data,
        attendancesQuery.data,
    ]);

    const overviewBarData = {
        labels: ['Users', 'Subjects', 'Fees', 'Rooms', 'Buildings', 'Floors', 'Attendance'],
        datasets: [
            {
                label: 'Records',
                data: [
                    dashboardData.totalUsers,
                    dashboardData.subjects,
                    dashboardData.fees,
                    dashboardData.rooms,
                    dashboardData.buildings,
                    dashboardData.floors,
                    dashboardData.attendances,
                ],
                backgroundColor: [
                    '#06b6d4',
                    '#22c55e',
                    '#f59e0b',
                    '#818cf8',
                    '#14b8a6',
                    '#ec4899',
                    '#0ea5e9',
                ],
                borderRadius: 8,
                maxBarThickness: 38,
            },
        ],
    };

    const roleDoughnutData = {
        labels: ['Students', 'Teachers', 'Admins', 'Others'],
        datasets: [
            {
                data: [
                    dashboardData.roleSummary.student,
                    dashboardData.roleSummary.teacher,
                    dashboardData.roleSummary.admin,
                    dashboardData.roleSummary.other,
                ],
                backgroundColor: ['#06b6d4', '#22c55e', '#f59e0b', '#64748b'],
                borderWidth: 0,
            },
        ],
    };

    const infraDoughnutData = {
        labels: ['Buildings', 'Floors', 'Rooms'],
        datasets: [
            {
                data: [dashboardData.buildings, dashboardData.floors, dashboardData.rooms],
                backgroundColor: ['#14b8a6', '#8b5cf6', '#0ea5e9'],
                borderWidth: 0,
            },
        ],
    };

    const chartTickColor = isDark ? '#cbd5e1' : '#475569';
    const chartGridColor = isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(148, 163, 184, 0.22)';
    const chartLegendColor = isDark ? '#cbd5e1' : '#334155';

    return (
        <div className='w-full h-full overflow-auto p-4 md:p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100'>
            <div className='mb-6'>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>School Analytics Dashboard</h1>
                <p className='text-slate-500 dark:text-slate-400 mt-1'>Live data from your ERP endpoints</p>
            </div>

            {isFirstLoad && (
                <div className={`${panel} mb-6`}>
                    <div className='animate-pulse h-6 w-56 bg-slate-200 dark:bg-slate-700 rounded mb-4' />
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className='h-20 rounded-xl bg-slate-100 dark:bg-slate-800' />
                        ))}
                    </div>
                </div>
            )}

            {hasAnyError && (
                <div className='mb-6 rounded-xl border border-amber-400/40 bg-amber-50 dark:bg-amber-400/10 px-4 py-3 text-amber-700 dark:text-amber-200'>
                    Some dashboard endpoints failed to load. Showing available live data.
                </div>
            )}

            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-6'>
                <div className={panel}>
                    <p className='text-xs text-cyan-300 uppercase tracking-wider'>Users</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.totalUsers}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-emerald-300 uppercase tracking-wider'>Subjects</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.subjects}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-amber-300 uppercase tracking-wider'>Fees</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.fees}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-indigo-300 uppercase tracking-wider'>Rooms</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.rooms}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-teal-300 uppercase tracking-wider'>Buildings</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.buildings}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-fuchsia-300 uppercase tracking-wider'>Floors</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.floors}</p>
                </div>
                <div className={panel}>
                    <p className='text-xs text-sky-300 uppercase tracking-wider'>Attendance</p>
                    <p className='text-2xl font-bold mt-2'>{dashboardData.attendances}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
                <div className={`${panel} xl:col-span-7`}>
                    <h2 className='text-lg font-semibold mb-4'>Resource Overview</h2>
                    <div className='h-[320px]'>
                        <Bar
                            data={overviewBarData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                },
                                scales: {
                                    x: {
                                        ticks: { color: chartTickColor },
                                        grid: { color: chartGridColor },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: { color: chartTickColor },
                                        grid: { color: chartGridColor },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className={`${panel} xl:col-span-5`}>
                    <h2 className='text-lg font-semibold mb-4'>Recent Users</h2>
                    <div className='space-y-2'>
                        {dashboardData.recentUsers.length === 0 && (
                            <div className='text-slate-500 dark:text-slate-400 text-sm'>No user records found.</div>
                        )}

                        {dashboardData.recentUsers.map((user, index) => {
                            const name = user?.name ?? user?.full_name ?? user?.username ?? `User ${index + 1}`;
                            const contact = user?.email ?? user?.phone ?? user?.mobile ?? 'No contact';
                            const role = normalizeRole(user);

                            return (
                                <div
                                    key={user?.id ?? `${name}-${index}`}
                                    className='flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 px-3 py-2'
                                >
                                    <div className='min-w-0'>
                                        <div className='font-medium truncate'>{name}</div>
                                        <div className='text-xs text-slate-500 dark:text-slate-400 truncate'>{contact}</div>
                                    </div>
                                    <span className='ml-3 rounded-full bg-cyan-100 dark:bg-cyan-500/15 px-2.5 py-1 text-xs text-cyan-700 dark:text-cyan-300 border border-cyan-300/40 dark:border-cyan-400/20'>
                                        {prettyRole(role)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`${panel} xl:col-span-6`}>
                    <h2 className='text-lg font-semibold mb-4'>User Role Distribution</h2>
                    <div className='h-[280px]'>
                        <Doughnut
                            data={roleDoughnutData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        labels: { color: chartLegendColor },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <div className={`${panel} xl:col-span-6`}>
                    <h2 className='text-lg font-semibold mb-4'>Infrastructure Mix</h2>
                    <div className='h-[280px]'>
                        <Doughnut
                            data={infraDoughnutData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        labels: { color: chartLegendColor },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


