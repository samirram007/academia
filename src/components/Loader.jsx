
const Loader = ({size}) => {
  const sizeStyle = size ? `h-${size} w-${size}` : 'h-20 w-20'
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full ${sizeStyle} border-t-2 border-b-2 border-gray-400`}></div>
      </div>
    </div>
  )
}

export default Loader
