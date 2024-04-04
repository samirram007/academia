import { lazy } from 'react';

const Designations =  lazy(() => import('./components/Designations'));
const CreateDesignation =  lazy(() => import('./components/CreateDesignation'));
const EditDesignation =  lazy(() => import('./components/EditDesignation'));

export {Designations,CreateDesignation, EditDesignation};


