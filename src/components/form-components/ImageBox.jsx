import React, { useState } from 'react'


import { MdClose } from 'react-icons/md'
import { DocumentModal, Documents } from '../../features/Document'

export const ImageBox = ({ formik, name, resource, editable, src = '' }) => {

    const [imageId, setImageId] = useState(formik.values[name])


    const defaultImage = '/no-image.png'
    const [open, setOpen] = React.useState(false);
    const resolveImagePath = (path) => {
        if (!path || typeof path !== 'string') return defaultImage
        if (path.startsWith('http://') || path.startsWith('https://')) return path
        if (path.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL}${path}`
        return `${import.meta.env.VITE_API_BASE_URL}/${path.replace(/^\/+/, '')}`
    }

    const [imageSrc, setImageSrc] = useState(
        (formik.values[resource]) ?
            (resolveImagePath(formik.values[resource].path))
            :
            defaultImage)

    const handleSetImageId = (param) => {
        setImageId(param)
        formik.values[name] = param
    }

    const handleSetImageSrc = (path) => {
        setImageSrc(resolveImagePath(path))
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
                    style={{ width: '14rem', height: '9rem', borderRadius: '0.6rem', border: '8px solid #eaecee11' }}
                    className='object-contain bg-slate-50 dark:bg-slate-800 hover:scale-95 transition-transform'
                    onClick={editable ? handleOpen : undefined}
                    src={imageSrc}
                    onError={() => {
                        setImageSrc(defaultImage)
                    }}
                    alt={name} />
            </span>
            {
               editable ?

                    <button type='button' className='mt-2 inline-flex items-center rounded-md px-2.5 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-800 transition-colors' onClick={handleOpen}>Click to change</button>
                :
                ""
            }
            <DocumentModal isOpen={open} onClose={handleClose}>
                <h1 className='flex justify-end   ' >
                    <button onClick={handleClose} type="button" className='inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors'>
                        <MdClose />
                    </button>
                </h1>
                <Documents setImageId={handleSetImageId} setImageSrc={handleSetImageSrc} />

            </DocumentModal>

        </div>
    )
}

