import { lazy } from 'react';

const Designations =  lazy(() => import('./Designations'));
const CreateDesignation =  lazy(() => import('./CreateDesignation'));
const EditDesignation =  lazy(() => import('./EditDesignation'));

export {Designations,CreateDesignation, EditDesignation};


