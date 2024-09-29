import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
   const navigate = useNavigate();
   const {currentUser}  = useSelector((state) => state.user);
   const [searchTerm ,setSearchTerm] = useState('');

const handleSubmit = (e)=>{
   e.preventDefault();
   const urlParams = new URLSearchParams(window.location.search);
   urlParams.set('searchTerm', searchTerm);
   // window.history.pushState({}, '', `?${urlParams.toString()}`)
   const searchQuery = urlParams.toString();
   console.log(searchQuery);
   navigate(`/search?${searchQuery}`)

};

useEffect(()=>{
   const urlParams = new URLSearchParams(location.search);
   const searchTermFromURL = urlParams.get('searchTerm');
   if(searchTermFromURL){
      setSearchTerm(searchTermFromURL);
   }
},[location.search])

  return (
    <header className='bg-slate-300 shadow-md max-w-full  p-3'>

     <div className='flex justify-between items-center'>
        <Link to='/'>
         <h1 className='text-slate-600 font-bold text-sm sm:text-xl'>Housify</h1>
         </Link>
     <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center'>
        <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <button>

        <FaSearch className='text-slate-600'/>
        </button>
     </form>
 <ul className='flex justify-around items-center gap-3  '>
    <Link to='/'>
    <li className='hidden px-2 py-1 sm:inline text-slate-700 hover:border-b-2 hover:cursor-pointer'>Home</li></Link>
    <Link to='/about'> <li className='hidden px-2 py-1 sm:inline text-slate-700 hover:border-b-2 hover:cursor-pointer'>About</li></Link>
    <Link to='/profile'>
    {currentUser?(
<img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />   ):(
      <li className='p-1 px-3 rounded-lg hover:bg-slate-700 hover:cursor-pointer bg-slate-900 text-slate-100'>Sign in</li>

   )}
    </Link>
 </ul>
     </div>
    </header>
  )
}

export default Header