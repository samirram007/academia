
import { AcademicSessionSelect } from '../../../../Common/components/AcademicSessionSelect'

import { FormikSubmit } from '@/components/form-components/FormikSubmit'
import { useFormik } from 'formik'
import { CampusAcademicClassSelect } from '../../../../Common/components/CampusAcademicClassSelect'
import { SectionSelect } from '../../../../Common/components/SectionSelect'

const FilterHead = ({ initialFilterValues, fetchedData }) => {


    const formik = useFormik({
        initialValues: initialFilterValues,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values);

            fetchedData.refetch();
            setSubmitting(false);
        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false);
        },
    })

    return (
        <div>
            <div className='grid grid-cols-1 '>
                <div className='grid grid-flow-row grid-cols-6 gap-5 md:grid-flow-col'>
                    <div className='grid col-span-6 gap-4 px-4 pb-2 mb-2 border-b-2 border-blue-300/30 '>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='grid grid-cols-12 gap-4 mb-2'>
                                {/* <div className='col-span-1 font-bold text-md'>Filter</div> */}


                                <div className='col-span-2 '>

                                    <AcademicSessionSelect formik={formik}   />

                                </div>
                                <div className='col-span-2 '>

                                    <CampusAcademicClassSelect formik={formik} name='academic_class_id' label={'Class'} />
                                </div>
                                <div className='col-span-2'>
                                    <SectionSelect formik={formik} />
                                </div>


                                {formik.values &&
                                    <div className='flex flex-col justify-end col-span-1 '>
                                        <FormikSubmit formik={formik} label={'Filter'} />
                                    </div>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterHead
