import { useRef, useState } from 'react';


import { CiEdit } from "react-icons/ci";


import { IoSaveOutline } from "react-icons/io5";


import { RiDeleteBinLine } from 'react-icons/ri';

import { ImSpinner } from "react-icons/im";
import { MdFolder } from "react-icons/md";
import { PiUploadSimpleLight } from 'react-icons/pi';
import FilterDropDown from './FilterDropdown';


import { useDocumentQuery } from '../hooks/queries';
import ImageToFolderBtn from './ImageToFolderBtn';

import { useDocumentDeleteMutation, useUpdateDocumentMutation } from '../hooks/mutations';
import CreateDocument from './CreateDocument';




const Documents = ({ setImageId, setImageSrc }) => {
    const [showUploadPanel, setShowUploadPanel] = useState(false);
    const docQuery = useDocumentQuery()



    // //run on component mount only
    if (docQuery.documents.isLoading) {
        return <div className="w-full h-full  flex justify-center items-center">
            <h1 className="text-4xl">Loading data...</h1>
        </div>
    }
    if (docQuery.documents.isError) { return <p>An error occurred while fetching the data</p> }
    return (
        <>
            {showUploadPanel && <CreateDocument openPanel={() => setShowUploadPanel(!showUploadPanel)} />}
            {!showUploadPanel && <DocumentBar filterFn={docQuery.handleFilter} openPanel={() => setShowUploadPanel(!showUploadPanel)} />}
            {/* <div className='flex flex-row flex-wrap   justify-evenly w-full min-h-[200px]'> */}
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4'>

                {

                    docQuery.documents.data.map((doc, index) => (
                        doc.document_type === 'folder' ?
                            <FolderBox key={doc.id} index={index} document={doc} />

                            : doc.document_type === 'image' ?

                                <ImageBox key={doc.id} index={index} document={doc} handleFilter={docQuery.handleFilter}
                                    setImageId={setImageId} setImageSrc={setImageSrc} />
                                : ''
                    ))


                }
            </div>
        </>

    )
}

// Documents.defaultProps={
// setImageId: ()=>{},
// setImageSrc: ()=>{}
// }



export default Documents
const DocumentBar = ({ openPanel, filterFn }) => {
    return (
        <>
            <div className='flex flex-row justify-between items-center w-full px-2 py-2 border-b-2 border-violet-300/10'>
                <h1 className='text-2xl font-bold'>Documents</h1>
                <div className='flex flex-row gap-2 justify-end items-center'>
                    <FilterDropDown filterFn={filterFn} />
                    <button type="button"
                        onClick={openPanel}
                        className='btn btn-primary btn-narrow btn-sm '>
                        <PiUploadSimpleLight /> Upload</button>
                </div>
            </div>


        </>
    )

}
const FolderBox = ({ document }) => {
    return (
        <div className='flex px-6 py-2 flex-col justify-start gap-2 w-full/2 md:w-64  '>

            <div className=' relative w-full h-48 bg-slate-50/0 rounded-2xl shadow-md  items-center justify-center
                     hover:bg-slate-50/0 cursor-pointer transition duration-300 ease-in-out'

            >
                {/* <DocumentSelector documentId={document.id} /> */}
                <DocumentRemover document={document} />

                <MdFolder className=' text-[220px] text-yellow-500 hover:text-yellow-400 ' />


                {/* <img src={document.path} alt="" className=' w-full h-full object-contain  ' /> */}

            </div>
            <DocumentName document={document} />
            {/* <div className="skeleton w-32 h-32"></div> */}
        </div>

    )
}
const ImageBox = ({ document, handleFilter, setImageId, setImageSrc }) => {
    return (
        <div className='flex px-6 py-2 flex-col-reverse justify-start gap-2 w-full md:w-64  ' >
            <DocumentName document={document} className="order-last" />
            <div className=' relative w-full h-48  bg-slate-50/10 rounded-md shadow-md p-4 items-center
                     hover:bg-slate-50/20 cursor-pointer transition duration-300 ease-in-out'
                draggable
            >
                {setImageId &&
                    <DocumentSelector document={document} setImageId={setImageId} setImageSrc={setImageSrc} />
                }
                <DocumentRemover document={document} handleFilter={handleFilter} />
                <ImageMenuBtn tabindex="0" document={document} />
                {/* <img src={document.path} alt="" className=' w-full h-full object-contain  ' /> */}
                <img src={document.path} alt="" className=' w-full h-full object-contain  ' />

            </div>

            {/* <div className="skeleton w-32 h-32"></div> */}
        </div>

    )
}
const ImageMenuBtn = ({ document }) => {

    const [showImageMenu, setShowImageMenu] = useState(false);


    return (
        <>
            <div className='absolute top-2 right-2 flex flex-row gap-2
         text-slate-100/20
         text-lg
         hover:text-green-400 hover:rotate-1 transform transition duration-300 ease-in-out
          active:text-slate-100/20 active:rotate-6 active:touch-pinch-zoom  rounded-tl-lg'>


                <ImageToFolderBtn document={document} />
            </div>
        </>
    )
}
// const ImageMenu = ({ document }) => {
//     const links = [
//         { href: '/account-settings', label: 'Account settings' },
//         { href: '/support', label: 'Support' },
//         { href: '/license', label: 'License' },
//         { href: '/sign-out', label: 'Sign out' },
//       ]

//       return(
//       <>
//             <Menu>
//                 <Menu.Button>
//                     <Menu.Items>
//                         {
//                             links.map((link,index)=>(
//                                 <Menu.Item key={index} as={Fragment}>
//                                   <span>{link.label}</span>
//                                 </Menu.Item>
//                             ))
//                         }
//                     </Menu.Items>
//                 </Menu.Button>
//             </Menu>
//       </>
//       )

// }
const DocumentRemover = ({ document, handleFilter }) => {

    const [isDeleteInit, setDeleteInit] = useState(false);
    const deleteMutation = useDocumentDeleteMutation()
    const handleDelete = () => {

        setDeleteInit(true)
        setTimeout(() => {
            deleteMutation.mutate(document)
        }, 1000);

    }

    return (
        <>
            <div className='absolute bottom-2 right-2 flex flex-row gap-2
         text-slate-100/20
         hover:text-red-400 hover:rotate-2 transform transition duration-300 ease-in-out
          active:text-slate-100/20 active:touch-pinch-zoom  rounded-tl-lg' >
                <RiDeleteBinLine onClick={handleDelete} className={`size-6  ${isDeleteInit ? 'animate-spin hidden' : ''} `} />
                <ImSpinner className={`size-6 text-red-400 animate-spin ${isDeleteInit ? '' : '  hidden'} `} />
            </div>
        </>
    )
}
const DocumentName = ({ document }) => {

    // split only last .
    const updateMutation = useUpdateDocumentMutation();


    const [isContentEditable, setIsContentEditable] = useState(false);
    const documentNameRef = useRef(null);
    let nameArr = document.original_name.split('.');
    let extension = nameArr[nameArr.length - 1];
    nameArr.pop();
    nameArr = nameArr.join('.');
    const handleEditable = () => {
        setIsContentEditable(true);


        setTimeout(() => {

            if (documentNameRef.current) {
                documentNameRef.current.focus()
            }
        }, 100);

    }
    const handleSave = () => {
        setIsContentEditable(false);
        if (documentNameRef.current.innerText === '') {
            documentNameRef.current.innerText = nameArr
            return
        }
        document.original_name = `${documentNameRef.current.innerText}${extension && '.'.concat(extension)}`

        updateMutation.mutate(document)
    }


    return (
        <>
            <div className='flex justify-center relative'>
                <div onClick={handleEditable} className='hidden absolute top-0 right-0   flex-row gap-2  text-yellow-300 '>
                    <CiEdit className='size-6' />
                </div>
                <div onClick={handleSave}
                    className={`absolute top-0 right-0 flex flex-row gap-2  text-green-300 bg-slate-500/10 ${isContentEditable ? '' : 'hidden'}`}>
                    <IoSaveOutline className='size-6' />
                </div>
                <div ref={documentNameRef} contentEditable={isContentEditable}
                    onClick={handleEditable}
                    onBlur={handleSave}
                    suppressContentEditableWarning={true}
                    spellCheck={true}
                    className='content--editable
                items-start
                overflow-x-auto
                border-t-2 border-blue-300/10 pb-2 mb-2 text-center   w-4/5  '>{nameArr}</div>
                <span className='badge badge-error hidden'> {extension && '.'.concat(extension)}</span>


            </div>




        </>
    )

}
const DocumentSelector = ({ document, setImageId, setImageSrc }) => {
    const handleOnClick = () => {
        setImageId(document.id)
        setImageSrc(document.path)

    }
    return (
        <>
            <div className='absolute top-2 left-2'>
                <input type="radio" name="document-radio"
                    id={`radio-${document.id}`}
                    className="radio  radio-primary "
                    onClick={handleOnClick}
                />
            </div>

        </>
    )

}