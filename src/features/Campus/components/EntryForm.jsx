
import { useFormik } from 'formik';
import * as Yup from "yup";


import { EducationBoardSelect } from '../../Common/components/EducationBoardSelect';
import { SchoolSelect } from '../../Common/components/SchoolSelect';
import { useDeleteCampusMutation, useStoreCampusMutation, useUpdateCampusMutation } from '../hooks/mutations';



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})


const EntryForm = ({ initialValues, entryMode }) => {
    const campusStoreMutation = useStoreCampusMutation()
    const campusUpdateMutation = useUpdateCampusMutation()
    const campusDeleteMutation = useDeleteCampusMutation()

    const handleFormSubmit = (values) => {

        if (entryMode === 'create') {
            campusStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            campusUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            campusDeleteMutation.mutate(values)
        }
        else {
            console.info('Invalid entry mode')
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleFormSubmit(values)
        }
    })

    return (
        <div>

            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 md:col-span-4 border-b-2 md:border-r-2 md:border-b-0 border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-6  border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='col-span-6 md:col-span-3'>

                                    <FormikInputBox formik={formik} name="name" label="Name" />

                                </div>

                                <div className='col-span-6 md:col-span-3'>
                                    <FormikInputBox formik={formik} name="code" label="Code" />
                                </div>



                            </div>
                            <div className='grid gap-4 grid-cols-6  border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <SchoolSelect formik={formik} name="school_id" label="School" />

                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <EducationBoardSelect formik={formik} name="education_board_id" label="Education Board" />

                                </div>
                            </div>

                            <div className='grid gap-4 grid-cols-6 border-b-2 border-blue-300/30 pb-2  mb-2'>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="establishment_date" type={'date'} label="Date of Establishment" />


                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="email" type={'email'} label="Email" />


                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="contact_no" type={'text'} label="Contact Number" />

                                </div>
                                <div className='  col-span-6 md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="website" type={'text'} label="Website" />

                                </div>


                            </div>
                            <div className='grid gap-4 grid-cols-6'>


                            </div>
                            {entryMode == 'edit' &&
                                <>

                                    {/* <Addresses formik={formik} name="addresses" label="Address" /> */}
                                </>
                            }



                        </div>
                        <div className='col-span-6 md:col-span-2'>
                            <div className='col-span-6 md:col-span-4'>
                                <ImageBox formik={formik} name="logo_image_id" editable={true} resource="logo_image" />
                            </div>



                            <div className='mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                                <div className='flex gap-2 items-center text-red-600'>

                                    {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                                </div>
                                <button type="submit" className='btn btn-primary btn-wide'>
                                    {entryMode === 'delete' ? 'Delete' : 'Save'}
                                    {formik.isSubmitting && (
                                        <span
                                            className='spinner-border spinner-border-sm ms-2'
                                            role='status'
                                            aria-hidden='true'
                                        ></span>
                                    )}
                                </button>
                            </div>

                        </div>


                    </div>

                    <div className='order-first'>

                        <div className="form-control ">
                            {/* <FormikCheckBox formik={formik} name="is_current" type={"checkbox"} label="Is Current?" /> */}

                        </div>


                    </div>
                </div>


            </form>
        </div>
    )
}

export default EntryForm