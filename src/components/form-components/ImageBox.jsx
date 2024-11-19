import React, { useState } from 'react'


import { MdClose } from 'react-icons/md'
import { DocumentModal, Documents } from '../../features/Document'

export const ImageBox = ({ formik, name, resource, editable, src = '' }) => {

    const [imageId, setImageId] = useState(formik.values[name])


    const [defaultImage, setDefaultImage] = useState(`${import.meta.env.VITE_API_BASE_URL}/storage/documents/student.png`)
    const [open, setOpen] = React.useState(false);
    const [imageSrc, setImageSrc] = useState(
        (formik.values[resource]) ?
            (formik.values[resource].path)
            :
            defaultImage)

    const handleSetImageId = (param) => {
        setImageId(param)
        formik.values[name] = param
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



    return (
        <div className='flex flex-col items-center cursor-pointer'>
            {/* <FormikHiddenInput formik={formik} name={name} /> */}
            <input
                id={name}
                name={name}
                type={'text'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={imageId}
                className='hidden'
            />
            <span className='active:touch-pinch-zoom' style={{ borderRadius: '0.5rem', border: '2px  solid #eaecee55' }}>
                <img
                    style={{ width: '15rem', borderRadius: '0.6rem', border: '10px  solid #eaecee11' }}
                    className='hover:scale-95 '
                    onClick={ editable ?? editable ? handleOpen : undefined }
                    src={imageSrc}
                    alt={name} />
            </span>
            {
               editable ?

                <button type='button' className='btn btn-link mt-n2 !pt-0' onClick={handleOpen}>Click to change</button>
                :
                ""
            }
            <DocumentModal isOpen={open} onClose={handleClose}>
                <h1 className='flex justify-end   ' >
                    <button onClick={handleClose} type="button" className='btn !btn-circle btn-outline'>
                        <MdClose />
                    </button>
                </h1>
                <Documents setImageId={handleSetImageId} setImageSrc={setImageSrc} />

            </DocumentModal>

        </div>
    )
}

