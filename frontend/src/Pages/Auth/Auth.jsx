import React, { useState } from 'react'
import Form from './Form';

const Auth = () => {
    const [input,setInput] = useState({
        fullName:'',
        email:'',
        password:'',
    });
    const handleChange=(e)=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
       
    }
  return (
    <div className='add-product-form' style={{backgroundColor:'white'}}>
      <Form handleChange={handleChange} input={input} setInput={setInput}/>
    </div>
  )
}

export default Auth
