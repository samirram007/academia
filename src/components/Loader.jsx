
const Loader = ({size,label}) => {
  const spinnerSize = size ? `${size * 4}px` : '80px'
  return (
    <>
      {label ? <div className='text-sm text-slate-500 dark:text-slate-400 mb-2'>{label}</div> : null}

      <div className={`flex ${label?'justify-start':'justify-center'} items-center`}>
        <div
          className='animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-slate-600 dark:border-t-blue-400'
          style={{ width: spinnerSize, height: spinnerSize }}
        ></div>
      </div>
    </>
  )
}

export default Loader
