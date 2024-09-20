import React, { useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useRef } from 'react'
import { updateUserStart, updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutFailure,signOutStart,signOutsuccess } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import { app } from '../firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { data } from 'autoprefixer'
const Profile = () => {
const fileRef =useRef(null)
  const {currentUser,loading,error} =useSelector((state)=> state.user)
  const [file,setFile]= useState(undefined)
  const [filePercentage,setFilePercentage] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const[formData,setFormData] = useState({});
  const [listings,setListings]  = useState([]);

  const [showListingsError , setShowListingsError] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
   if (file) {
    handleFileUpload(file);
   } 
  },[file]);

const handleFileUpload = (file)=>{
  const storage =getStorage(app);
  const fileName= new Date().getTime()+file.name;
  const storageRef = ref(storage,  fileName);
  const uploadTask = uploadBytesResumable(storageRef , file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      
      setFilePercentage(Math.round(progress));

      
    },
    (error)=>{
      setFileUploadError(true);
    },
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setFormData({...formData, avatar: downloadURL})
  );
}
)
}

const handleChange =(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value });
}
 
const handleSubmit=async (e)=>{
  e.preventDefault();
  console.log("abc",currentUser);
  try {
   dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData),
    })
    const data = await res.json();
    if(data.success===false){
      dispatch(updateUserFailure(data.message));
    }

    dispatch(updateUserSuccess(data));
    toast.success('user updated succesfully!')
    alert('user updated')

    
  } catch (error) {
  dispatch(updateUserFailure(error.message));  
  }
}
const handleDeleteUser =async()=>{

  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
     
    })
    const data  = await res.json();
if(data.success===false){
  dispatch(deleteUserFailure(data.message));
}
dispatch(deleteUserSuccess(data));
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut =  async () => {
  try {
    dispatch(signOutStart());
    const resp = await fetch('/api/auth/signOut');
    const data = await resp.json();
    if(data.success===false){
      dispatch(signOutFailure(data.message));
      return;
    }
dispatch(signOutsuccess(data));
  } catch (error) {
    dispatch(signOutFailure(error.message));
  }
}

const handleShowListing =async()=>{
try {
  setShowListingsError(false);
  const res = await fetch(`/api/user/listings/${currentUser._id}`);
  const  data = await res.json();
  if(data.success===false){
setShowListingsError(true)
return;
  }
  // dispatch(showListingSuccess(data.listings));
setListings(data);

} catch (error) {
  setShowListingsError(true);
}
}
console.log(listings);


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar ? formData.avatar: currentUser.avatar} className='rounded-3xl h-24 w-24 object-cover cursor-pointer self-center' alt="profile pic" />
      <p className='text-center text-sm'>{fileUploadError? <span className='text-red-600 '>Error Image Upload (image must be less than 2mb)</span>:filePercentage>0 && filePercentage<100 ?<span className='text-slate-700'>{`Uploading ${filePercentage}`}</span>:filePercentage===100 ? <span className='text-green-600 '>Image Succesfully Uploaded</span>:'' }</p>
      <input type='text' onChange={handleChange} defaultValue={currentUser.username} placeholder='username' className='border p-3 rounded-lg' id='username'></input>
      <input type='text' defaultValue={currentUser.email} placeholder='email' className='border p-3 rounded-lg' id='email'></input>
      <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password'></input>
      <button className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-70'>{loading?  'Loading...': 'Update'}</button>
<Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90' to={"/create-listing"}>create listing </Link>

    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete account
        </span>
      <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out
        </span>
        </div>
        <button className='text-green-700 w-full' onClick={handleShowListing}>Show listings</button>
        {showListingsError&& <p className='text-red-600 text-center'>Error fetching listings</p>}

{listings && 
listings.length > 0 && 
<div className='flex flex-col gap-4'>
  <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>


 { listings.map((listing)=>(
  
    <div className='gap-4 border rounded-lg p-3 flex justify-between items-center' key={listing._id} >
      <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain'/>
     
      </Link>
      <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold hover:underline truncate flex-1'>
      <p className=''>{listing.name}</p>
  
      </Link>
      <div className='flex flex-col items-center'>
  <button className='text-red-700 uppercase'>Delete</button>
  <button className='text-green-700 uppercase'>Edit</button>
      </div>
      
    </div>
  ))}

</div>}
    </div>
  )
}

export default Profile