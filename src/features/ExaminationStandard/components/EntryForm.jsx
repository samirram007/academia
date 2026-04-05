import * as Yup from "yup";

import { useFormik } from "formik";
import {
  useDeleteExaminationStandardMutation,
  useStoreExaminationStandardMutation,
  useUpdateExaminationStandardMutation,
} from "../hooks/mutations";

import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { useAcademicStandards } from "@/features/AcademicStandard/hooks/quaries";
import { FormikSelect } from "@/components/form-components/FormikSelect";
import { useExaminations } from "@/features/Examination/hooks/quaries";

const validationSchema = Yup.object().shape({
  academic_standard_id: Yup.number().required("Academic Standard is required"),
  examination_id: Yup.number().required("Examination Id is required"),
});

const EntryForm = ({ initialValues, entryMode }) => {
  const examinationStandardStoreMutation =
    useStoreExaminationStandardMutation();
  const examinationStandardUpdateMutation =
    useUpdateExaminationStandardMutation();
  const examinationStandardDeleteMutation =
    useDeleteExaminationStandardMutation();

  const examinationData = useExaminations();

  const academicStandardData = useAcademicStandards();

  const handleFormSubmit = (values) => {
    if (entryMode === "create") {
      examinationStandardStoreMutation.mutate(values);
    } else if (entryMode === "edit") {
      examinationStandardUpdateMutation.mutate(values);
    } else if (entryMode === "delete") {
      examinationStandardDeleteMutation.mutate(values);
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
              {academicStandardData.data && (
                <FormikSelect
                  formik={formik}
                  name="academic_standard_id"
                  label="Academic Standard"
                  options={
                    academicStandardData.data.data &&
                    Object.entries(academicStandardData.data.data).map(
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
            <div>
              {examinationData.data && (
                <FormikSelect
                  formik={formik}
                  name="examination_id"
                  label="Examination "
                  options={
                    examinationData.data.data &&
                    Object.entries(examinationData.data.data).map(
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
