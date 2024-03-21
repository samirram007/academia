import { lazy } from 'react';

const Documents =  lazy(() => import('./components/Documents'));
const CreateDocument =  lazy(() => import('./components/CreateDocument'));
const DocumentModal =  lazy(() => import('./components/DocumentModal'));

export {Documents,CreateDocument,DocumentModal};

