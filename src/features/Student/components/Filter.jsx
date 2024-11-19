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
            // console.log('ib', initialFilterValues);
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-2 '>

                                    <StudentFilterSelect formik={formik} />


                                </div>
                                <div className='col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                {/* <div className='col-span-2 '>
                                    <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading} />

                                </div>
                                <div className='col-span-2 '>

                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />

                                </div> */}
                                <div className='col-span-2 '>

                                    <CampusAcademicClassSelect formik={formik} name='academic_class_id' label={'Class'} />

                                </div>


                                {fetchedData.isRefetching ?
                                    (
                                        <div className={'flex flex-col justify-end '}>
                                            <button type="submit"
                                                className={`btn !bg-red-400 !text-slate-900 btn-disabled flex flex-row flex-nowrap text-nowrap`}>
                                                Filtering
                                            </button>
                                        </div>
                                    )
                                    :
                                    (
                                        formik.values &&
                                        <div className={' flex flex-col justify-end '}>

                                                <FormikSubmit formik={formik} label={'Filter'} />
                                            </div>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Filter

