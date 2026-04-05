import { fetchAcademicClassServices } from '@/features/AcademicClass/services/apis';
import { fetchAcademicSessionServices } from '@/features/AcademicSession/services/apis';
import { fetchCampusesService } from '@/features/Campus/services/apis';
import { fetchSectionsService } from '@/features/Section/services/apis';
import { fetchTeachers } from '@/features/Teacher/services/apis';
import { queryClient } from '@/utils/queryClient';

const warmedRoutes = new Set();

const routeChunkWarmups = {
    academic_classes: () => import('@/features/AcademicClass/components/DataList'),
    students: () => import('@/features/Student/components/Gateway'),
    fees: () => import('@/features/Fee/components/DataList'),
    expenses: () => import('@/features/Expense/components/DataList'),
    teachers: () => import('@/features/Teacher/components/DataList'),
    sections: () => import('@/features/Section/components/DataList'),
    subjects: () => import('@/features/Subject/components/DataList'),
};

const routeDataWarmups = {
    academic_classes: () => Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['academic_classes'],
            queryFn: fetchAcademicClassServices,
        }),
        queryClient.prefetchQuery({
            queryKey: ['campuses'],
            queryFn: fetchCampusesService,
        }),
    ]),
    students: () => Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['academic_sessions'],
            queryFn: fetchAcademicSessionServices,
        }),
        queryClient.prefetchQuery({
            queryKey: ['academic_classes'],
            queryFn: fetchAcademicClassServices,
        }),
    ]),
    fees: () => queryClient.prefetchQuery({
        queryKey: ['academic_sessions'],
        queryFn: fetchAcademicSessionServices,
    }),
    expenses: () => queryClient.prefetchQuery({
        queryKey: ['academic_sessions'],
        queryFn: fetchAcademicSessionServices,
    }),
    teachers: () => Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['teachers'],
            queryFn: fetchTeachers,
        }),
        queryClient.prefetchQuery({
            queryKey: ['academic_sessions'],
            queryFn: fetchAcademicSessionServices,
        }),
    ]),
    sections: () => queryClient.prefetchQuery({
        queryKey: ['sections'],
        queryFn: fetchSectionsService,
    }),
};

const toBaseRoute = (routePath = '') => routePath.replace(/^\//, '').split('/')[0];

export const warmupRoute = (routePath) => {
    const baseRoute = toBaseRoute(routePath);

    if (!baseRoute || warmedRoutes.has(baseRoute)) return;

    const warmupChunk = routeChunkWarmups[baseRoute];
    const warmupData = routeDataWarmups[baseRoute];

    warmedRoutes.add(baseRoute);

    if (warmupChunk) {
        warmupChunk().catch(() => {
            warmedRoutes.delete(baseRoute);
        });
    }

    if (warmupData) {
        warmupData().catch(() => {
            warmedRoutes.delete(baseRoute);
        });
    }
};

export const warmupCriticalRoutes = () => {
    ['academic_classes', 'students', 'fees', 'expenses', 'teachers', 'sections', 'subjects'].forEach((route) => warmupRoute(route));
};
