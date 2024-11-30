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

const EntryForm = ({ initialValues, entryMode }) => {
  const examinationScheduleStoreMutation =
    useStoreExaminationScheduleMutation();
  const examinationScheduleUpdateMutation =
    useUpdateExaminationScheduleMutation();
  const examinationScheduleDeleteMutation =
    useDeleteExaminationScheduleMutation();

  const examinationStandardData = useExaminationStandards();
  const subjectData = useSubjects();

  console.log(subjectData, "subject data");

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
                        <option key={index} value={value.id}>
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
                  name="examination_standard_id"
                  label="Examination Standard"
                  options={
                    subjectData.data.data &&
                    Object.entries(subjectData.data.data).map(
                      ([key, value], index) => (
                        <option key={index} value={value.id}>
                          {value.academic_standard.name}
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

        <div className="mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6">
          <div className="flex gap-2 items-center text-red-600">
            {entryMode === "delete" &&
              "Are your sure you want to delete this entry?"}
          </div>
          <button type="submit" className="btn btn-primary btn-wide">
            {entryMode === "delete" ? "Delete" : "Save"}
            {formik.isSubmitting && (
              <span
                className="spinner-border spinner-border-sm ms-2"
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
