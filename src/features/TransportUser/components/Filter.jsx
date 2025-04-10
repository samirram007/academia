
import { useFormik } from 'formik';

import * as Yup from "yup";


import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useState } from 'react';
import { TransportSelect } from '../../Common/components/TransportSelect';

const validationSchema = Yup.object().shape({
    // campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ TransportUserData,  initialFilterValues,setInitialFilterValues }) => {
    // const { data:TransportUserData,refetch,isFetching} = useAcademicSessions({campus_id:initialValues.campus_id})
    // const  TransportUserData  = useAcademicSessions(initialFilterValues)
    const [initialValues,setInitialValues] = useState(initialFilterValues)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues,
         enableReinitialize: true,

        onSubmit: (values,{setSubmitting}) => {

            Object.assign(initialFilterValues, values);
            setInitialFilterValues(prev=>initialFilterValues)
            setInitialValues(prev=>initialFilterValues)
             TransportUserData.refetch()
           setTimeout(() => {

               setSubmitting(false)
           }, 500);

        },
        onError: (errors, values,{setSubmitting}) => {
            setSubmitting(false)

        }
    })



    return (
        <div className={isLoading ? 'hidden' : 'flex-1 flex flex-col justify-end bg-slate-900/10 rounded-lg '}>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6 border-b-2   border-blue-300/30 pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-12 md:col-span-3 '>
                                    <TransportSelect formik={formik} auto={true} isLoading={isLoading} setIsLoading={setIsLoading} />



                                </div>


                                {formik.values &&
                                    <div className={isLoading ? 'hidden' : '  col-span-12 md:col-span-2 flex flex-col justify-end '}>

                                        <FormikSubmit formik={formik} label={'Show Users'} />
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

export default Filter

