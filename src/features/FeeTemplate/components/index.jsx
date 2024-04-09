import { lazy } from 'react';

const FeeTemplates =  lazy(() => import('./FeeTemplates'));
const CreateFeeTemplate =  lazy(() => import('./Create'));
const EditFeeTemplate =  lazy(() => import('./Edit'));
const FeeTemplateFilter =  lazy(() => import('./Filter'));

export {FeeTemplates,CreateFeeTemplate, EditFeeTemplate,FeeTemplateFilter};


