import React from 'react'
import Header from '../../../components/Header'
import AddProductBody from './AddProductBody'

const AddProducts = () => {
  return (
    <div>
      <Header admin={true} />
      <AddProductBody />
    </div>
  )
}

export default AddProducts
