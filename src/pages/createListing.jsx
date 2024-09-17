import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";
const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading,  setUploading] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
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
  const handleRemoveImage = (index)=>{
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i)=>i !== index),
    })

}
  return (
    <main className="p-3 max-w-4xl mx-auto">
      hello
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing{" "}
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" action="">
        <div className=" left-column flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg "
            id="name"
            maxLength={62}
            minLength={5}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg "
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg "
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
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
                id="bathroom"
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
                min={1}
                max={10}
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
                min={1}
                max={10}
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
              {uploading ? "uploading":  "Upload"}

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
                  onClick={()=>handleRemoveImage(index)}
                  className="text-red-600 border border-red-600 rounded-lg uppercase hover:bg-red-600 hover:text-white px-3 py-1 "
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
