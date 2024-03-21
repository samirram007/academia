import { useCampuses } from '../../Campus/hooks/queries';
import useCampusChange from '../hooks/useCampusChange'

export const CampusSelect = ({formik}) => {
    const CampusData = useCampuses()
    return (

            CampusData.data &&
                <HandleSelect
                    formik={formik}
                    name="campus_id" label={'Campus'}
                    options={
                        CampusData.data.data &&
                        CampusData.data.data.map(({ id: key, name: value }, index) => (
                            <option key={index} value={key}>{value}</option>
                        ))
                    } />
         )

}
export const HandleSelect = (
    { formik, label, name, placeholder, type, ...props }
) => {

    const campusFormik = useCampusChange(formik);
    const handleDropdownChange = (event) => {
        const { name, value } = event.target;
        console.log(formik);
        formik.setFieldValue(name, value); // Update the dropdown field that triggered the change

        // If campus_id dropdown changes, reset academic_year_id and academic_class_id
        if (name === 'campus_id') {
            formik.setFieldValue('academic_year_id', ''); // Reset academic_year_id
            formik.setFieldValue('academic_class_id', ''); // Reset academic_class_id
        }
    };
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name}
                onChange={handleDropdownChange}
                onBlur={formik.handleBlur}
                defaultValue={formik.values[name]}
                className={`select  w-full ${formik.errors[name] ? 'select-error' : 'select-primary'}`}
            >
                <option value=''      >-- please select</option>
                {props.options}
            </select>
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-sm pl-2'>{formik.errors[name]}</div> : null}
        </>

    )
}
