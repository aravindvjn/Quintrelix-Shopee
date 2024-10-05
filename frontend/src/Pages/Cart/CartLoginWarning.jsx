import React from 'react'
import LoginButton from '../../components/LoginButton'

const CartLoginWarning = ({message}) => {
  return (
    <div className='center cart-login-warning'>
        <div className='center' style={{flexDirection:'column'}}>
            <p>{message ? message : "Please Login"}</p>
            <LoginButton />
        </div>
    </div>
  )
}

export default CartLoginWarning
