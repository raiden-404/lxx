import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


// --- Reusable Icons ---
const UploadCloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /> <path d="M12 12v9" /> <path d="m16 16-4-4-4 4" /> </svg>
);
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

// --- Reusable Image Upload Component ---
const ImageUploadBox = ({ imageFile, onFileChange, onRemove }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation();};
    const handleDrop = useCallback((e) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileChange({ target: { files: [file] } });
        }
    }, [onFileChange]);

    return (
        <div onClick={() => fileInputRef.current.click()} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnter={handleDragEnter}
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-gray-500 bg-gray-700' : 'border-slate-300 bg-transparent hover:bg-gray-600/30'}`}>
            <input type="file" ref={fileInputRef} onChange={onFileChange} accept="image/*" className="hidden"/>
            {imageFile?.preview ? (
                <>
                    <img src={imageFile.preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="absolute top-2 right-2 bg-black rounded-full p-1.5 shadow-md hover:bg-red-100 transition" aria-label="Remove image">
                        <XIcon className="w-5 h-5 text-red-500" />
                    </button>
                </>
            ) : (
                <div className="text-center text-slate-400">
                    <UploadCloudIcon className="mx-auto h-12 w-12" />
                    <p className="mt-2 font-semibold"><span className="text-white">Click to upload</span> or drag and drop</p>
                </div>
            )}
        </div>
    );
};

// --- Main Add Collection Component ---
const AddNavbar = () => {

    const [slugValues, setSlugValues] = useState([]);

  useEffect(() => {
    const fetchSlugsList = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/public/get-all-slugs`);

        if(!response.ok) {
            throw new Error("Error fetching slugs list");
        }

        const result = await response.json();
        setSlugValues([...result]);
    }

    fetchSlugsList();
  },[]);


  const [title, setTitle] = useState('');
  const [slugs, setSlugs] = useState([
      { name: '', value: '' }, { name: '', value: '' }, { name: '', value: '' }
  ]);
  const [featured, setFeatured] = useState([
      { name: '', value: '', image: { file: null, preview: '' } },
      { name: '', value: '', image: { file: null, preview: '' } }
  ]);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  // --- Handlers ---
  const handleSlugChange = (index, field, value) => {
      const newSlugs = [...slugs];
      newSlugs[index][field] = value;
      setSlugs(newSlugs);
  };

  const handleFeaturedChange = (index, field, value) => {
      const newFeatured = [...featured];
      newFeatured[index][field] = value;
      setFeatured(newFeatured);
  };

  const handleFeaturedImageChange = (e, index) => {
      const file = e.target.files[0];
      if (file) {
          const newFeatured = [...featured];
          newFeatured[index].image = { file, preview: URL.createObjectURL(file) };
          setFeatured(newFeatured);
      }
  };

  const handleRemoveFeaturedImage = (index) => {
      const newFeatured = [...featured];
      newFeatured[index].image = { file: null, preview: '' };
      setFeatured(newFeatured);
  };

  // --- API Submission ---
  const handleSubmit = async (e) => {
      e.preventDefault();
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) { navigate("/login"); return; }

      setStatus('uploading');
      
      // 1. Prepare the JSON data structure
      const collectionData = {
          title: title,
          position: 1, // Fixed position
          slugs: slugs.map((slug, index) => ({ ...slug, position: index + 1 })),
          featured: featured.map((item, index) => ({
              name: item.name,
              value: item.value,
              position: index + 1,
          })),
      };

      // 2. Create FormData
      const formData = new FormData();
      formData.append('collectionData', JSON.stringify(collectionData));
      console.log(formData.get("collectionData"))
      // 3. Append featured images
      featured.forEach(item => {
          if (item.image.file) {
              formData.append('featuredImages', item.image.file);
          }
      });

      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/set-navbar-lists`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            body: formData,
          });

          if(!response.ok) {
            throw new Error("Error saving navbar");
          }

          setStatus('success');

      } catch (error) {
          console.error('Error uploading data:', error);
          setStatus('error');
      }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center font-sans p-4 text-white">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-50 text-center mb-8">Add New Collection</h1>
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl shadow-lg shadow-gray-500 space-y-8">
          
          {/* --- Title --- */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title<span className='inline-flex text-red-700 ml-1'>*</span></label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Collection" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" required />
          </div>

          {/* --- Slugs Section --- */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-600 pb-2">Slugs</h2>
            {slugs.map((slug, index) => (
              <div key={index} className="p-4 border border-slate-700 rounded-lg space-y-4">
                <p className="font-bold text-slate-400">Slug {index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                    <input type="text" value={slug.name} onChange={(e) => handleSlugChange(index, 'name', e.target.value)} placeholder="Display Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Value</label>
                    <select value={slug.value} onChange={(e) => handleSlugChange(index, 'value', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-800 text-white outline-none transition" required>
                      {slugValues.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Featured Section --- */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-600 pb-2">Featured Items</h2>
            {featured.map((item, index) => (
              <div key={index} className="p-4 border border-slate-700 rounded-lg space-y-4">
                <p className="font-bold text-slate-400">Featured Item {index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                    <input type="text" value={item.name} onChange={(e) => handleFeaturedChange(index, 'name', e.target.value)} placeholder="Display Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Value</label>
                    <select value={item.value} onChange={(e) => handleFeaturedChange(index, 'value', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-800 text-white outline-none transition" required>
                      {slugValues.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Image</label>
                    <ImageUploadBox imageFile={item.image} onFileChange={(e) => handleFeaturedImageChange(e, index)} onRemove={() => handleRemoveFeaturedImage(index)} />
                </div>
              </div>
            ))}
          </div>

          {/* --- Submit Button --- */}
          <div>
            <button type="submit" disabled={status === 'uploading'} className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed transition-all duration-300">
              {status === 'uploading' ? 'Uploading Collection...' : 'Add Collection'}
            </button>
            {status === 'success' && <p className="text-green-600 mt-2 text-center">Collection added successfully!</p>}
            {status === 'error' && <p className="text-red-600 mt-2 text-center">Upload failed. Please try again.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNavbar;
