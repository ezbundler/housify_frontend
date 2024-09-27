import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
const Listings = () => {

    const params = useParams();
    const [listing, setListings] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setLoading(true)
                const response = await fetch(`/api/listing/${params.listingId}`)
                const data = response.json();
                if(data.success===false){
                    console.log(data.message);
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
           
        }
        fetchListing();
    })
  return (
    <>
    <div>{listing ? listing: "no listing"}</div>
    </>  
  )
}

export default Listings