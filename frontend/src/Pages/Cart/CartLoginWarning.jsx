import React from 'react'
import LoginButton from '../../components/LoginButton'

const CartLoginWarning = () => {
  return (
    <div className='center'>
        <div className='center' style={{flexDirection:'column'}}>
            <p>Login to see the items you added previously</p>
            <LoginButton />
        </div>
    </div>
  )
}

export default CartLoginWarning
