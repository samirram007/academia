
const Loader = ({size,label}) => {
  const sizeStyle = size ? `h-${size} w-${size}` : 'h-20 w-20'
  return (
    <>
    <div>{label ?? label}</div>

      <div className={`flex ${label?'justify-start':'justify-center'} items-center`}>
        <div className={`animate-spin rounded-full ${sizeStyle} border-t-2 border-b-2 border-gray-400`}></div>
      </div>
    </>
  )
}

export default Loader
