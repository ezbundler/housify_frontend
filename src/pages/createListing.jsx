import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>hello
        <h1 className='text-3xl font-semibold text-center my-7'>Create a listing </h1> 
        <form className='flex flex-col sm:flex-row' action="">
<div className='flex flex-col gap-4 flex-1'>
    <input type="text" placeholder='name' className='border p-3 rounded-lg ' id='name' maxLength={62} minLength={5} required />
    <input type="text" placeholder='Description' className='border p-3 rounded-lg ' id='description' required />
    <input type="text" placeholder='Address' className='border p-3 rounded-lg ' id='address' required />
    <div className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
            <input type="checkbox" id='sale' className='w-5' />
            <span>Sell</span>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" id='rent' className='w-5' />
            <span>Rent</span>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" id='parking' className='w-5' />
            <span>Parking Spot</span>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" id='furnished' className='w-5' />
            <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
            <input type="checkbox" id='offer' className='w-5' />
            <span>Offer</span>
        </div>
    </div>
    <div className='flex items-center gap-2'>
<input type="number" id='bedroom' min={1} max={10} required  className=' p-3 border border-gray-300 rounded-lg'/>
<p>Bedroom</p>
    </div>
    <div className='flex items-center gap-2'>
<input type="number" id='bathroom' min={1} max={10} required className=' p-3 border border-gray-300 rounded-lg' />
<p>Bathroom</p>
    </div>
    <div className='flex items-center gap-2'>
<input type="number" id='regularPrice' min={1} max={10} required  className=' p-3 border border-gray-300 rounded-lg'/>
<p>Regular Price</p>
    </div>
    <div className='flex items-center gap-2'>
<input type="number" id='discountPrice' min={1} max={10} required  className=' p-3 border border-gray-300 rounded-lg'/>
<p>Discounted Price</p>
    </div>
    
</div>
        </form>
        
        
        
        </main>
  


)
}

export default CreateListing;