import React from 'react'

const Loader = ({size}) => {
<<<<<<< HEAD
  const sizeStyle = size ? `h-${size} w-${size}` : 'h-20 w-20'
=======
  const sizeStyle = size ? `h-${size} w-${size}` : ''
>>>>>>> 38fe76ea24ea4a688945fbee42d4c859bab31c8f
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full ${sizeStyle} border-t-2 border-b-2 border-gray-400`}></div>
      </div>
    </div>
  )
}

export default Loader
