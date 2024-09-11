import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const SignIn = () => {
const navigate  = useNavigate();

const[formData ,setFormData] = useState({});
const[signUpError ,setSignUpError] = useState('');
const [loading ,setLoading] = useState(false);


const handleChange =(e)=>{
  setFormData({
    ...formData ,
    [e.target.id]: e.target.value
  })

}

const handleSubmit =async(e)=>{
e.preventDefault();
setLoading(true);
try {
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
    
    setLoading(false);
    setSignUpError(data.message);
    return;
  }
  
  console.log('hii data.message',data.message);
  console.log('hii data.message 2',signUpError);

  setLoading(false);
  setSignUpError('');
  navigate('/');
} catch (error) {
 
  setSignUpError(error.message);
  console.log('hii abc',signUpError);
  // console.log('hii abc',error);
  setLoading(false);
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
      <div>{signUpError&&<p className="text-red-700">{signUpError}</p>}</div>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an account</p>
        <Link to={"/sign-up"}><span className="text-blue-700">Sign Up</span></Link>
      </div>
      
    </div>
  );
};

export default SignIn;
