import React from 'react'
import Loading from './Loading'
import './Loading.css'
const GlobalLoading = () => {
  return (
    <div className='global-loading'>
      <Loading />
      <center>Loading...</center>
    </div>
  )
}

export default GlobalLoading
