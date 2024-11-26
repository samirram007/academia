import * as Yup from "yup";

import { useFormik } from "formik";
import {
  useDeleteExaminationMutation,
  useStoreExaminationMutation,
  useUpdateExaminationMutation,
} from "../hooks/mutations";

import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { useExaminationTypes } from "@/features/ExaminationType/hooks/quaries";
import { FormikSelect } from "@/components/form-components/FormikSelect";
import { useAcademicSessions } from "@/features/AcademicSession/hooks/quaries";
import { useCampuses } from "@/features/Campus/hooks/queries";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Examination Type is required"),
  examination_types_id: Yup.number().required("Examination Type is reuqired"),
  examination_start_date: Yup.date().required("Date is required"),
  examination_end_date: Yup.date().required("Date is required"),
  academic_session_id: Yup.number().required("Academic Session is reuqired"),
  campus_id: Yup.number().required("Academic Session is reuqired"),
});

const EntryForm = ({ initialValues, entryMode }) => {
  const examinationStoreMutation = useStoreExaminationMutation();
  const examinationUpdateMutation = useUpdateExaminationMutation();
  const examinationDeleteMutation = useDeleteExaminationMutation();

  const examinationTypeData = useExaminationTypes();
  const academicSessionData = useAcademicSessions({ is_current: false });
  const campusData = useCampuses();

  const handleFormSubmit = (values) => {
    if (entryMode === "create") {
      examinationStoreMutation.mutate(values);
    } else if (entryMode === "edit") {
      examinationUpdateMutation.mutate(values);
    } else if (entryMode === "delete") {
      examinationDeleteMutation.mutate(values);
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
            <div>
              <FormikInputBox
                formik={formik}
                name="name"
                label="Examination Name"
              />
            </div>
            <div>
              {examinationTypeData.data && (
                <FormikSelect
                  formik={formik}
                  name="examination_types_id"
                  label="Examination Type"
                  options={
                    examinationTypeData.data.data &&
                    Object.entries(examinationTypeData.data.data).map(
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-2">
            <div>
              <FormikInputBox
                type="date"
                formik={formik}
                name="examination_start_date"
                label="Examination Start Date"
              />
            </div>
            <div>
              <FormikInputBox
                type="date"
                formik={formik}
                name="examination_end_date"
                label="Examination End Date"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-2">
            <div>
              {academicSessionData.data && (
                <FormikSelect
                  formik={formik}
                  name="academic_session_id"
                  label="Academic Session"
                  options={
                    academicSessionData.data?.data &&
                    Object.entries(academicSessionData.data?.data).map(
                      ([key, value], index) => (
                        <option key={index} value={value.id}>
                          {value.id}
                        </option>
                      )
                    )
                  }
                />
              )}
            </div>
            <div>
              {campusData.data && (
                <FormikSelect
                  formik={formik}
                  name="campus_id"
                  label="Campus Name"
                  options={
                    campusData.data?.data &&
                    Object.entries(campusData.data?.data).map(
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
