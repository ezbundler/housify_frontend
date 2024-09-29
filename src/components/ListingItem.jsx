import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'
import cardImg from '../assets/dreamHouse.jpeg'

const ListingItem = ({ listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'><Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]?listing.imageUrls[0]:{cardImg}} alt="Listing Cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
            <div className='flex itemcenter gap-1'>
                <MdLocationOn className='text-green-700 h-4 w-4'/>
<p className='truncate text-sm text-slate-600'>{listing.address}</p>
            </div>
            <p className='text-sm text-slate-500 line-clamp-2'>{listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold'>
                {listing.offer? `₹${listing.discountPrice.toLocaleString('en-US')}`:`₹${listing.regularPrice.toLocaleString('en-US')}`}{listing.type==='rent' && '/Month'}
            </p>
            <div className=' text-slate-700 flex gap-3'>
                <div className='font-bold text-xs'>
                    {listing.bedrooms > 1 ?`${listing.bedrooms} Rooms`:`${listing.bedrooms} Room`}
                </div>
                <div className='font-bold text-xs'>
                    {listing.bathrooms > 1 ?`${listing.bathrooms} Bathrooms`:`${listing.bathrooms} Bathroom`}
                </div>
               
            </div>
        </div>
        
        </Link></div>
  )
}

export default ListingItem