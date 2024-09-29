import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const[landlord, setLandlord] =useState(null);
    const [error,setError]= useState(false);
    const[message,setMessage] = useState('');


    useEffect(()=>{
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                console.log('data',data);
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }


        fetchLandlord();
    },[listing.userRef])

const onchange = (e)=>{
    setMessage(e.target.value)
}

    console.log("listing,",listing)
  return (
    <>{landlord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span>for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea className='w-full border p-3 rounded-lg  ' name="message" id="message" rows={2} value={message} onChange={onchange}></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>Send Message</Link>
       
        </div>
    )}</>
  )
}

export default Contact