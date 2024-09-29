import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
const Cart = () => {
    const {cartItems} = useContext(UserContext)
  return (
    <>
    <Header />
    <div className='cart-parent'>
      {cartItems && cartItems.map((item)=>{
        return (<div>
            <Products {...item} />
        </div>)
      })}
    </div>
    </>
  )
}
import './Cart.css'
import Header from '../../components/Header'
import URL from '../../server'
import { UserContext } from '../Context/context'
import Products from '../Electronics/Products'
export default Cart
