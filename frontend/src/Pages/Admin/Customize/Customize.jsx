import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import './Customize.css'
import Banner from './Banner'
import URL from '../../../server'
const Customize = () => {
  const[fetchBanner,setFetchBanner] = useState()
  const [edit,setEdit] = useState(false)
  useEffect(()=>{
    const fetchData= async ()=>{
     try{
       const results = await fetch(URL+'banner').then((response)=>{
         return response.json()
       }).then((data)=>{
         return data;
       })
       setFetchBanner(results)
     }catch(err){
       console.error("Error in fetching data at Home.jsx",err)
     }
    }
    fetchData();
   },[edit])
  return (
    <div>
        <Header admin={true} />
        <div className="customize-body">
            <center><h3>Banners</h3></center>
          <div className="customize-banner">
            {fetchBanner && fetchBanner.map((banner,index)=>{
              return <Banner key={index} {...banner} setEdit={setEdit} edit={edit}/>
            })}
          </div>
        </div>
    </div>
  )
}

export default Customize
