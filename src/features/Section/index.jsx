import { lazy } from 'react';

const Sections =  lazy(() => import('./components/DataList'));
const CreateSection =  lazy(() => import('./components/Create'));
const EditSection =  lazy(() => import('./components/Edit'));

export {Sections,CreateSection, EditSection};


