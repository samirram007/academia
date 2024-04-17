import React from 'react';
import { Formik, Field } from 'formik';

const SubForm = ({ handleSubmit, handleChange, values, submitSubForm }) => (
  <Formik
    initialValues={{ subformField: '' }}
    onSubmit={(values) => {
      submitSubForm(values); // Pass subform values to the parent component's handler
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <form onSubmit={handleSubmitSubform}>
        <label>
          Subform Field:
          <Field type="text" name="subformField" value={values.subformField} onChange={handleChange} />
        </label>
        <button type="submit">Submit Subform</button>
      </form>
    )}
  </Formik>
);

const CreateStudentMain = () => (
  <Formik
    initialValues={{ mainFormField: '', subform: { subformField: '' } }}
    onSubmit={(values) => {
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <form onSubmit={handleSubmit}>
        <label>
          Main Form Field:
          <Field type="text" name="mainFormField" value={values.mainFormField} onChange={handleChange} />
        </label>
        <SubForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values.subform}
          submitSubForm={(subformValues) => {
            // Handle subform submit here or pass it to the parent's onSubmit
          }}
        />
        <button type="submit">Submit Main Form</button>
      </form>
    )}
  </Formik>
);

export default CreateStudentMain;
