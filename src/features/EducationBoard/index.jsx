import { lazy } from 'react';

const EducationBoards =  lazy(() => import('./components/EducationBoards'));
const CreateEducationBoard =  lazy(() => import('./components/CreateEducationBoard'));
const EditEducationBoard =  lazy(() => import('./components/EditEducationBoard'));

export {EducationBoards,CreateEducationBoard, EditEducationBoard};


