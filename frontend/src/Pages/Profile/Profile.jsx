import React, { useContext } from 'react'
import Header from '../../components/Header'
import { UserContext } from '../Context/context'
import './Profile.css'
const Profile = () => {
  const {user} = useContext(UserContext)
  console.log(user)
  return (
    <div>
        <Header />
        <div className="profile-parent-div">
          <p>Name : <strong>{user.username.toUpperCase()}</strong></p>
          <p>Email : <strong>{user.email}</strong></p>
        </div>
    </div>
  )
}

export default Profile
