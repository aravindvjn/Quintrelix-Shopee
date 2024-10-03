import React from 'react'
import LoginButton from '../../components/LoginButton'

const CartLoginWarning = ({message}) => {
  return (
    <div className='center'>
        <div className='center' style={{flexDirection:'column'}}>
            <p>{message}</p>
            <LoginButton />
        </div>
    </div>
  )
}

export default CartLoginWarning
