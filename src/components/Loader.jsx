import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    </div>
  )
}

export default Loader
