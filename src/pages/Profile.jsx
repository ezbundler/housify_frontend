import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {currentUser} =useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} className='rounded-3xl h-24 w-24 object-cover cursor-pointer self-center' alt="profile pic" />
      <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'></input>
      <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email'></input>
      <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password'></input>
      <button className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-70'>update</button>

    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>Delete account
        </span>
      <span className='text-red-700 cursor-pointer'>Sign out
        </span>
        </div>
    </div>
  )
}

export default Profile