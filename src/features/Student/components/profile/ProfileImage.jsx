import { useMemo, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router'

const ProfileImage = ({ data }) => {
    const navigate = useNavigate()
    const [hasImageError, setHasImageError] = useState(false)

    const imageSrc = useMemo(() => {
        const fallback = `${import.meta.env.VITE_API_BASE_URL}/storage/documents/student.png`
        if (!data?.profile_document?.path) return fallback
        const path = data.profile_document.path
        if (path.startsWith('http://') || path.startsWith('https://')) return path
        if (path.startsWith('/')) return `${import.meta.env.VITE_API_BASE_URL}${path}`
        return path
    }, [data])

    const initials = useMemo(() => {
        const name = (data?.name || 'Student').trim()
        const parts = name.split(/\s+/).filter(Boolean)
        if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
        return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase()
    }, [data])

    return (
        <>
            <div className='relative'>
                <span onClick={() => navigate(`/students/edit/${data.id}`)}
                    className='absolute right-1 top-1 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/85 text-blue-700 shadow-sm transition hover:bg-white dark:bg-slate-800/90 dark:text-blue-200'>
                    <MdOutlineModeEditOutline className='text-base' />
                </span>
                <div className='h-32 w-32 overflow-hidden rounded-full border-4 border-white/70 bg-slate-200 shadow-md ring-2 ring-blue-200/80 dark:border-slate-700/80 dark:bg-slate-700 dark:ring-blue-400/25'>
                    {!hasImageError ? (
                        <img
                            src={imageSrc}
                            className='h-full w-full object-cover'
                            alt='Student profile'
                            onError={() => setHasImageError(true)}
                        />
                    ) : (
                        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl font-semibold text-white'>
                            {initials}
                        </div>
                    )}
                </div>
            </div>



        </>
    )
}

export default ProfileImage
