import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-300 shadow-md max-w-full  p-3'>

     <div className='flex justify-between items-center'>
        <Link to='/'>
         <h1 className='text-slate-600 font-bold text-sm sm:text-xl'>Housify</h1>
         </Link>
     <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
        <input type="text" placeholder='Search..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch className='text-slate-600'/>
     </form>
 <ul className='flex justify-around items-center gap-3  '>
    <Link to='/'>
    <li className='hidden px-2 py-1 sm:inline text-slate-700 hover:border-b-2 hover:cursor-pointer'>Home</li></Link>
    <Link to='/about'> <li className='hidden px-2 py-1 sm:inline text-slate-700 hover:border-b-2 hover:cursor-pointer'>About</li></Link>
    <Link to='/sign-in'>  <li className='p-1 px-3 rounded-lg hover:bg-slate-700 hover:cursor-pointer bg-slate-900 text-slate-100'>Sign in</li></Link>
 </ul>
     </div>
    </header>
  )
}

export default Header