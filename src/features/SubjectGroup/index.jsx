import { lazy } from 'react';

const SubjectGroups =  lazy(() => import('./components/DataList'));
const CreateSubjectGroup =  lazy(() => import('./components/Create'));
const EditSubjectGroup =  lazy(() => import('./components/Edit'));

export {SubjectGroups,CreateSubjectGroup, EditSubjectGroup};


