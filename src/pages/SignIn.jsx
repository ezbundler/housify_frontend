import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
const SignIn = () => {
const navigate  = useNavigate();
const dispatch = useDispatch(); 
const[formData ,setFormData] = useState({});
const {loading , error}  = useSelector((state) => state.user);



const handleChange =(e)=>{
  setFormData({
    ...formData ,
    [e.target.id]: e.target.value
  })

}

const handleSubmit =async(e)=>{
e.preventDefault();
console.log('the submit button is pressed');
try {
  dispatch(signInStart());
  console.log('abc entered into the data section')
  const response = await fetch('/api/auth/signin',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const data  = await response.json();
  console.log('hii',data);
  
  if(data.succes===false){
    
   dispatch(signInFailure(data.message));
    return;
  }
  
  console.log('hii data.message',data.message);
  

  dispatch(signInSuccess(data));
  navigate('/');
} catch (error) {
 
  
  
  // console.log('hii abc',error);
  dispatch(signInFailure(error.message));
}


}
console.log(formData);

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input onChange={handleChange} type="text" placeholder="email" className="border p-3 rounded-lg" id="email" />
        <input onChange={handleChange} type="text" placeholder="password" className="border p-3 rounded-lg" id="password" />
        
        <button disabled ={loading}className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 ">{loading?'Loading...':'sign in'}</button>
       
      </form>
      <div>{error&&<p className="text-red-700">{error}</p>}</div>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an account</p>
        <Link to={"/sign-up"}><span className="text-blue-700">Sign Up</span></Link>
      </div>
      
    </div>
  );
};

export default SignIn;
