import { lazy } from 'react';

const Campuses =  lazy(() => import('./components/Campuses'));
const CreateCampus =  lazy(() => import('./components/CreateCampus'));
const EditCampus =  lazy(() => import('./components/EditCampus'));

export {Campuses,CreateCampus,EditCampus};


