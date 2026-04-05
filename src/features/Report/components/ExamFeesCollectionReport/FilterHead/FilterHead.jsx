
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
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap items-end gap-4 px-5 py-3'>
                <div className='w-48'>
                    <AcademicSessionSelect formik={formik} />
                </div>
                <div className='w-56'>
                    <CampusAcademicClassSelect formik={formik} name='academic_class_id' label={'Class'} />
                </div>
                <div className='w-40'>
                    <SectionSelect formik={formik} />
                </div>
                {formik.values &&
                    <FormikSubmit formik={formik} label={'Filter'} />
                }
            </div>
        </form>
    )
}

export default FilterHead
