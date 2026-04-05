import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from "yup";



import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusAcademicClassSelect } from '../../Common/components/CampusAcademicClassSelect';
import { StudentFilterSelect } from '../../Common/components/StudentFilterSelect';


const validationSchema = Yup.object().shape({
    campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ fetchedData, initialFilterValues }) => {

    const [isLoading, setIsLoading] = useState(fetchedData.isLoading)
    const formik = useFormik({
        initialValues: initialFilterValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values);

            // setSubmitting(false)
            fetchedData.refetch()
            setSubmitting(false)
            // setSubmitting(false)
            //  queryClient.invalidateQueries({ queryKey: ['students'] })
            // if (fetchedData.isFetched) {
            //     setTimeout(() => {
            //         setSubmitting(false)
            //     }, 200);
            // }

        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false)

        }

    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap items-end gap-4'>
                <div className='w-60'>
                    <StudentFilterSelect formik={formik} />
                </div>
                <div className='w-60'>
                    <AcademicSessionSelect formik={formik} />
                </div>
                <div className='w-60'>
                    <CampusAcademicClassSelect formik={formik} name='academic_class_id' label={'Class'} />
                </div>

                {fetchedData.isRefetching ? (
                    <button
                        type="submit"
                        disabled
                        className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold bg-amber-400/60 text-slate-700 cursor-not-allowed opacity-70 whitespace-nowrap"
                    >
                        Filtering
                    </button>
                ) : (
                    formik.values && <FormikSubmit formik={formik} label={'Filter'} />
                )}
            </div>
        </form>
    )
}

export default Filter

