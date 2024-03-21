import { lazy } from 'react';

const EducationBoards =  lazy(() => import('./EducationBoards'));
const CreateEducationBoard =  lazy(() => import('./CreateEducationBoard'));
const EditEducationBoard =  lazy(() => import('./EditEducationBoard'));

export {EducationBoards,CreateEducationBoard, EditEducationBoard};


