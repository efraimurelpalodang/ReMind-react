import React from 'react'

const Container = ({children}) => {
  return (
    <div className='px-5 py-1 mt-4'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container