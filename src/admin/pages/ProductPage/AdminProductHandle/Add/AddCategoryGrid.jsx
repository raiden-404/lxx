import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// You can use an icon library like lucide-react for icons
const UploadCloudIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Main App Component
const AddCategoryGrid = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);


  //getting all the slugs from backend
  useEffect(() => {
    const fetchslugs = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/public/get-all-slugs`);
        if(!response.ok){
            throw new Error("Fail fetching slugs");
        }
        const result = await response.json();

        setCategoryOptions([...result]);
    }
    fetchslugs();
  },[]);


  // State for drag-and-drop UI
  const [isDragging, setIsDragging] = useState(false);

  // State for API submission status
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error

  // Hidden file input ref
  const fileInputRef = React.useRef(null);

  // --- Handlers ---

  // Handle file selection from the hidden input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Trigger the hidden file input
  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  // Remove the selected image
  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent triggering the upload area click
    setImage(null);
    setPreview(null);
    // Reset file input value to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Drag and Drop Handlers ---

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow drop
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  // --- API Submission ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const jwtToken = Cookies.get("jwtToken");

    if (jwtToken) {
      setStatus("uploading");
      // Create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("value", value);
      formData.append("image", image);

      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/set-category-grid`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          body: formData,
          // Don't set 'Content-Type': 'multipart/form-data'.
          // The browser will automatically set it with the correct boundary.
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        console.log("Success:", result);
        setStatus("success");
        // Reset the form here
        setName("");
        setDescription("");
        setImage(null);
        setPreview(null);
      } catch (error) {
        console.error("Error uploading data:", error);
        setStatus("error");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-50 text-center mb-2">
          Add Home Category Grid
        </h1>
        <span className="text-slate-300 text-center mb-8 flex items-center justify-center">
          New arrivals takes 2 grid <p className="text-red-600">*</p>
        </span>

        <form
          onSubmit={handleSubmit}
          className=" p-8 rounded-2xl shadow-lg shadow-gray-500 space-y-6"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Name<p className="inline-flex text-red-700">*</p>
            </label>
            <input
              type="text"
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a catchy title"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Description<p className="inline-flex text-red-700">*</p>
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your image"
              className="w-full px-4 py-2 bg-transparent border border-slate-300 rounded-lg focus:shadow-lg focus:shadow-gray-400 transition"
              required
            />
          </div>

          {/* Category field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Slug<span className="inline-flex text-red-700 ml-1">*</span>
            </label>
            <select
              id="category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full hover:bg-gray-500/20 px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition"
              required
            >
              {/* Default, disabled placeholder option */}
              <option value="" disabled className="bg-black hidden ">
                Select a Slug...
              </option>

              {/* Map over your array to create the options */}
              {categoryOptions.map((category, index) => (
                <option key={index} value={category} className="bg-black" >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Image<p className="inline-flex text-red-700">*</p>
            </label>
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleUploadAreaClick}
              className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                ${
                  isDragging
                    ? "border-gray-500 bg-indigo-50"
                    : "border-slate-300 bg-transparent hover:bg-gray-600/30"
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-black rounded-full p-1.5 shadow-md hover:bg-red-100 transition"
                    aria-label="Remove image"
                  >
                    <XIcon className="w-5 h-5 text-red-500" />
                  </button>
                </>
              ) : (
                <div className="text-center text-slate-400">
                  <UploadCloudIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-semibold">
                    <span className="text-white">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === "uploading"}
              className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:pink-indigo-500 disabled:bg-pink-300 disabled:cursor-not-allowed transition-all duration-300"
            >
              {status === "uploading" ? "Uploading..." : "Upload Post"}
            </button>
            {status === "success" && (
              <p className="text-green-600 mt-2 text-center">
                Upload successful!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2 text-center">
                Upload failed. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCategoryGrid;
