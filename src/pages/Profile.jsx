import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useRef } from 'react'
import { app } from '../firebase'
const Profile = () => {
const fileRef =useRef(null)
  const {currentUser} =useSelector((state)=> state.user)
  const [file , setFile]= useState(undefined)
  const [filePercentage,setFilePercentage] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const[formData,setFormData] = useState({});
 
  
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
    




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar ? formData.avatar: currentUser.avatar} className='rounded-3xl h-24 w-24 object-cover cursor-pointer self-center' alt="profile pic" />
      <p className='text-center text-sm'>{fileUploadError? <span className='text-red-600 '>Error Image Upload (image must be less than 2mb)</span>:filePercentage>0 && filePercentage<100 ?<span className='text-slate-700'>{`Uploading ${filePercentage}`}</span>:filePercentage===100 ? <span className='text-green-600 '>Image Succesfully Uploaded</span>:'' }</p>
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