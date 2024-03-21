import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useStoreFeeTemplateMutation, useUpdateFeeTemplateMutation } from '../hooks/mutations';
import { CampusSelect } from './CampusSelect';
import { AcademicYearSelect } from './AcademicYearSelect';
import { AcademicClassSelect } from './AcademicClassSelect';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {


    const feeTemplateStoreMutation = useStoreFeeTemplateMutation()
    const feeTemplateUpdateMutation = useUpdateFeeTemplateMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            feeTemplateStoreMutation.mutate(values)

        } else {

            feeTemplateUpdateMutation.mutate(values)

        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            handleFormSubmit(values)
        }
    })

  return (
    <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-3 '>
                                <CampusSelect formik={formik}/>


                                </div>
                                <div className='col-span-3 '>

                                    <AcademicYearSelect formik={formik} campus_id={formik.values.campus_id} />

                                </div>
                                <div className='col-span-3 '>

                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />


                                </div>

                                {formik.values.campus_id &&
                                    <div className='col-span-2 flex flex-col justify-end '>

                                        <FormikSubmit formik={formik} label={'Filter'} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default EntryForm