import React, { useState, useEffect, useCallback } from 'react'

import { PiUploadSimpleLight } from "react-icons/pi";
import { useDropzone } from 'react-dropzone'



import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../utils/queryClient';
import { AiOutlineUndo } from 'react-icons/ai';
import { BsBackspaceReverse } from "react-icons/bs";
import { storeDocuments } from '../services/apis';

const maxLength = 30;

const nameLengthValidator=file=> {

    if (file.name.length > maxLength) {

        return {
            code: "name-too-large",
            message: `Name is larger than ${maxLength} characters`
        };
    }

    return
}

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'flex',
    justifyContent:'space-between',
    borderRadius: 5,
    border: '1px solid #eaeaea22',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 1,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    overflow:'hidden',
    position:'relative'
};

const thumbInner = {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const CreateDocument = ({openPanel}) => {
    const [files, setFiles] = useState([]);
    const [rejectedFiles, setRejectedFiles] = useState([]);
    const documentMutation = useMutation({
        mutationFn: storeDocuments,
        onSuccess: (data) => {
            setFiles([])
            setRejectedFiles([])
         queryClient.invalidateQueries({ queryKey: ['documents'] })
         toast.success("Document uploaded successfully")
        },
        onError: (error) => {
          toast.error(error.response.data.message, { transition: Flip })
        }
      })
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]
            )
        }
        if (rejectedFiles?.length) {
            setRejectedFiles(previousFiles => [
                ...previousFiles,
                ...rejectedFiles
            ]
            )
        }


    }, [])
    const { isDragActive, acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps } = useDropzone({
            onDrop,
            validator: nameLengthValidator,
            accept: { 'image/*': [] },

        })

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }
    const removeRejectedFile = name => {

        setRejectedFiles(files => rejectedFiles.filter(({file })=> file.name !== name))
    }

    const acceptedFileItems = files.map(file => (
        <div key={file.name}>
            <div style={thumb} >
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />


                </div>
                <button
                        type='button'
                        className='absolute top-0 right-0 bg-red-500 hover:bg-red-700   text-xs font-bold  rounded-full'
                        onClick={() => removeFile(file.name)}>
<IoClose className='w-5 h-5 text-gray-100/90 hover:text-white shadow-md'/>
                    </button>

            </div>
            {/* <li key={file.path}>
                {file.path} - {file.size} bytes
            </li> */}
        </div>
    ));

    const fileRejectionItems = rejectedFiles.map(({ file, errors }) => (
        <li key={file.path} className='flex items-center justify-between mt-2 border-t border-slate-100/30 '>
            <div>
                <p className='mt-2 text-sm text-neutral-500  font-medium cursor-pointer' title={file.name}>{file.name.length>maxLength?file.name.slice(0, maxLength) + '...': file.name}</p>
                <ul className='text-[12px] text-red-400'>
                    {errors.map(error => (
                        <li key={error.code}>{error.message}</li>
                    ))}
                </ul>
            </div>
            <button
            type='button'
            className='mt-1 ml-4 py-1 text-[12px]  uppercase tracking-wider font-bold badge badge-error px-4'
            onClick={() => removeRejectedFile(file.name)}
            >remove</button>

        </li>
    ));


    const handleSubmit = (ev) => {
        ev.preventDefault()
        if(!files?.length) {
            toast.info("Please select a file")
            return
        }
        const formData = new FormData()
        files.forEach(file => {
          formData.append('files[]', file)
        });

        documentMutation.mutate(formData)
    }
    const className = `p-8 mt-2 border border-dashed rounded border-neutral-200`


    return (
        <div className='flex flex-col justify-center items-center w-full
        gap-0 border-b-2 mb-4 border-blue-300/10 pb-2 '>
            <div className='text-2xl'>Upload Document</div>

            <form onSubmit={handleSubmit}>
                {/* <input type="file" name="file" id="file" /> */}
                <div {...getRootProps({ className })}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>
                    <button type="submit"
                    disabled={!files?.length}
                        className='disabled:cursor-not-allowed disabled:bg-slate-500/50  btn btn-primary btn-wide btn-sm mt-4'>
                        <PiUploadSimpleLight /> Upload</button>
                        <button type="button" onClick={() => {
                            setFiles([])
                            setRejectedFiles([])
                        }}

                            className='cursor-not-allowed btn btn-primary  btn-sm mt-4'>
                                <AiOutlineUndo /> Reset</button>
                        <button type="button" onClick={openPanel}

                            className='  btn btn-error   btn-sm mt-4'>
                                <BsBackspaceReverse /> Cancel</button>


                </div>
            </form>

            <div className='flex flex-col'>
                {files.length > 0 &&
                    <div className='flex flex-col gap-2 mt-6'>
                        <div className='text-white badge badge-primary badge-outline p-2'>Accepted file(s)</div>
                        <ul className='flex flex-row flex-wrap'>{acceptedFileItems}</ul>
                    </div>}
                {rejectedFiles.length>0 &&
                    <div className='mt-6'>
                        <div className='text-white badge badge-error p-2'>Rejected file(s)</div>

                        <ul className='mt-1 flex flex-col'>{fileRejectionItems}</ul>
                    </div>
                }
            </div>


        </div>
    )
}

export default CreateDocument