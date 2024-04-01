import { useFormikContext } from "formik";
import { useCallback } from "react";

export const FormikCheckBox = (
    { formik, error, label, name, placeholder, type, ...props }
) => {
// alert("HEllo")
// console.log(name,formik.values[name])
    return (
        <>
            <label className="label cursor-pointer justify-end gap-4">
                <span className="label-text">{label}</span>
                <input type="checkbox" id={name}
                    name={name}
                    onChange={()=>{
                        formik.setFieldValue(name,!formik.values[name])
                    }}

                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    checked={formik.values[name]}
                    className={`checkbox  m-0 ${formik.errors[name] ? 'checkbox-error' : 'checkbox-primary'}`} />

            </label>
            {formik.errors[name] ? <div className='text-error'>{formik.errors[name]}</div> : null}
        </>

    )
}