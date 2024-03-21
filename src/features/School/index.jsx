import { lazy } from 'react';

const Schools =  lazy(() => import('./components/Schools'));
const CreateSchool =  lazy(() => import('./components/CreateSchool'));
const EditSchool =  lazy(() => import('./components/EditSchool'));

export {Schools,CreateSchool, EditSchool};


