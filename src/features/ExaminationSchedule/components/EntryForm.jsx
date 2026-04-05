import * as Yup from "yup";

import { useFormik } from "formik";
import {
  useDeleteExaminationScheduleMutation,
  useStoreExaminationScheduleMutation,
  useUpdateExaminationScheduleMutation,
} from "../hooks/mutations";

import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { useExaminationStandards } from "@/features/ExaminationStandard/hooks/quaries";
import { FormikSelect } from "@/components/form-components/FormikSelect";
import { useSubjects } from "@/features/Subject/hooks/quaries";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Examination Type is required"),
});

const initialFilterValues = {
  academic_standard_id: "",
  subject_group_id: "",
};

const EntryForm = ({ initialValues, entryMode }) => {
  const examinationScheduleStoreMutation =
    useStoreExaminationScheduleMutation();
  const examinationScheduleUpdateMutation =
    useUpdateExaminationScheduleMutation();
  const examinationScheduleDeleteMutation =
    useDeleteExaminationScheduleMutation();

  const examinationStandardData = useExaminationStandards();
  const subjectData = useSubjects(initialFilterValues);

  const handleFormSubmit = (values) => {
    if (entryMode === "create") {
      examinationScheduleStoreMutation.mutate(values);
    } else if (entryMode === "edit") {
      examinationScheduleUpdateMutation.mutate(values);
    } else if (entryMode === "delete") {
      examinationScheduleDeleteMutation.mutate(values);
    } else {
      console.info("Invalid entry mode");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              {examinationStandardData.data && (
                <FormikSelect
                  formik={formik}
                  name="examination_standard_id"
                  label="Examination Standard"
                  options={
                    examinationStandardData.data.data &&
                    Object.entries(examinationStandardData.data.data).map(
                      ([key, value], index) => (
                        <option key={index} value={value.academic_standard.id}>
                          {value.academic_standard.name}
                        </option>
                      )
                    )
                  }
                />
              )}
            </div>
            <div>
              {subjectData.data && (
                <FormikSelect
                  formik={formik}
                  name="subject_id"
                  label="Subject"
                  options={
                    subjectData.data.data &&
                    Object.entries(subjectData.data.data).map(
                      ([key, value], index) => (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      )
                    )
                  }
                />
              )}
            </div>
          </div>

          <div className="order-first"></div>
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60">
          <div className="flex gap-2 items-center text-red-600">
            {entryMode === "delete" &&
              "Are your sure you want to delete this entry?"}
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {entryMode === "delete" ? "Delete" : "Save"}
            {formik.isSubmitting && (
              <span
                className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
