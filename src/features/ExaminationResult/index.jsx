import { lazy } from "react";

const ExaminationResults = lazy(() => import("./components/DataList"));
const CreateExaminationResult = lazy(() => import("./components/Create"));
const EditExaminationResult = lazy(() => import("./components/Edit"));

export { ExaminationResults, CreateExaminationResult, EditExaminationResult };
