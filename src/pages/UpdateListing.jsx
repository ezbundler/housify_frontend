import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import React, { useEffect, useState } from "react";
  import { app } from "../firebase";
  import { useSelector } from "react-redux";
  import { useNavigate,useParams } from "react-router-dom";
  const UpdateListing = () => {
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const[submitError, setSubmitError] = useState(false);
    const [submitLoading, setSubmitLoading]=useState(false);
  const {currentUser} =useSelector(state => state.user)
  const navigate = useNavigate();
  const  params = useParams();

  
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const ListingId = params.ListingId;
        const res = await fetch(`/api/listing/get/${ListingId}`);

        // Check if the response is okay
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("data", data);

        if (data.success === false) {
          console.error(data.message);
          return; // Exit if the fetch was unsuccessful
        }

        setFormData(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
}, [params.ListingId]);


    const [formData, setFormData] = useState({
      imageUrls: [],
      name: "",
      address: "",
      description: "",
      regularPrice: 0,
      discountPrice: 0,
      offer: false,
      parking: false,
      furnished: false,
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
    });
    console.log(formData);
    const handleImageSubmit = (e) => {
      setUploading(true);
      setImageUploadError(false);
      if (files.length > 0 && files.length < 7 && formData.imageUrls.length < 7) {
        console.log(files);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((error) => {
            setImageUploadError("image upload failed(2mb per image)", error);
          });
      } else {
        setUploading(false);
        setImageUploadError("Please select 1-6 images");
      }
    };



  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progress} done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };
  
    const handleChange = (e) => {
      if (e.target.id === "sale" || e.target.id === "rent") {
        setFormData({
          ...formData,
          type: e.target.id,
        });
      }
      if (
        e.target.id === "parking" ||
        e.target.id === "furnished" ||
        e.target.id === "offer"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
      }
  
      if (
        e.target.type === "number" ||
        e.target.type === "text" ||
        e.target.type === "textarea"
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };
  
  
    const handleSubmit  = async(e) => {
      e.preventDefault();
      try {
          setSubmitLoading(true);
          setSubmitError(false);
  const res = await fetch(`/api/listing/update/${params.ListingId}`,{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
      }),
  })
  const data = await res.json();
  setSubmitLoading(false);
  if(data.success === false){
      setSubmitError(data.message);
      console.log(data.message)
  }
  
   navigate(`/listing/${data._id}`)   
  } catch (error) {
          setSubmitError(error.message)
          console.log(error.message);
          
          setSubmitLoading(false);
      }
    }
  
  
    return (
      <main className="p-3 max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-semibold text-center my-7">
          Update listing{" "}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" action="">
          <div className=" left-column flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="name"
              onChange={handleChange}
              value={formData.name}
              className="border p-3 rounded-lg "
              id="name"
              maxLength={62}
              minLength={5}
              required
            />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Description"
              className="border p-3 rounded-lg "
              id="description"
              value={formData.description}
              required
            />
            <input
              type="text"
              onChange={handleChange}
              value={formData.address}
              placeholder="Address"
              className="border p-3 rounded-lg "
              id="address"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  className="w-5"
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                  id="rent"
                  className="w-5"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  checked={formData.parking}
                  type="checkbox"
                  id="parking"
                  className="w-5"
                />
                <span>Parking Spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={formData.furnished}
                  id="furnished"
                  className="w-5"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  id="offer"
                  className="w-5"
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  onChange={handleChange}
                  value={formData.bedrooms}
                  min={1}
                  max={10}
                  required
                  className=" p-3 border border-gray-300 rounded-lg"
                />
                <p>Bedroom</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  onChange={handleChange}
                  value={formData.bathrooms}
                  min={1}
                  max={10}
                  required
                  className=" p-3 border border-gray-300 rounded-lg"
                />
                <p>Bathroom</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min={5000}
                  max={10000000}
                  onChange={handleChange}
                  value={formData.regularPrice}
                  required
                  className=" p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-xs">(₹/Month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={5000}
                  max={10000000}
                  onChange={handleChange}
                  value={formData.discountPrice}
                  required
                  className=" p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">(₹/Month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rigth-column flex flex-1 flex-col gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                the first image will cover the 6(max 6 images)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <p className="text-red-700">{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between items-center p-3 border"
                >
                  <img
                    src={url}
                    alt="listing images"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 border border-red-600 rounded-lg uppercase hover:bg-red-600 hover:text-white px-3 py-1 "
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
              {submitLoading?  "Updateing ...." : "Update listing"}
  
            </button>
            {submitError &&  <p className="text-red-700">{submitError}</p>}
  
          </div>
        </form>
      </main>
    );
  };
  
  export default UpdateListing;
  