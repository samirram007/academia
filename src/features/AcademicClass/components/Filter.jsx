
import { useFormik } from 'formik';

import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useState } from 'react';
import * as Yup from "yup";
import { CampusSelect } from '../../Common/components/CampusSelect';



const validationSchema = Yup.object().shape({
    // campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Academic class")
    //     .required("Please select Academic class"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ fetchedData, initialFilterValues }) => {
    // const { data:fetchedData,refetch,isFetching} = useAcademicClasses({campus_id:initialValues.campus_id})
    // const  fetchedData  = useAcademicClasses(initialFilterValues)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialFilterValues,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values);
            fetchedData.refetch()

            if (!fetchedData.isRefetching) {
                setSubmitting(false)
            }

        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false)

        }
    })

    // const formik = useFormik({
    //     initialValues:initialFilterValues,
    //     onSubmit: (values,{setSubmitting}) => {
    //         Object.assign(initialFilterValues, values);
    //         fetchedData.refetch()
    //         console.log("iv",fetchedData)
    //        setSubmitting(false)
    //     }

    // })

    return (
        <div className={isLoading ? 'hidden' : 'flex-1 flex flex-col justify-end bg-slate-900/10 rounded-lg '}>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-12 md:col-span-3 '>
                                    <CampusSelect formik={formik} auto={false} />



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
                                        <div className={isLoading ? 'hidden' : '   flex flex-col justify-end '}>

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

