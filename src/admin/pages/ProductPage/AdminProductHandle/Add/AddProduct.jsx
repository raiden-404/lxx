import { useState, useCallback, useRef } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

// --- Reusable Icons (from your code) ---
const UploadCloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /> <path d="M12 12v9" /> <path d="m16 16-4-4-4 4" /> </svg>
);
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

// --- Reusable Image Upload Component ---
// To handle both the featured image and the list of other images without repeating code.
const ImageUploadBox = ({ imageFile, onFileChange, onRemove }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation();};

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileChange({ target: { files: [file] } });
        }
    }, [onFileChange]);

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-gray-500 bg-gray-700' : 'border-slate-300 bg-transparent hover:bg-gray-600/30'}`}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                className="hidden"
            />
            {imageFile?.preview ? (
                <>
                    <img src={imageFile.preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="absolute top-2 right-2 bg-black rounded-full p-1.5 shadow-md hover:bg-red-100 transition"
                        aria-label="Remove image"
                    >
                        <XIcon className="w-5 h-5 text-red-500" />
                    </button>
                </>
            ) : (
                <div className="text-center text-slate-400">
                    <UploadCloudIcon className="mx-auto h-12 w-12" />
                    <p className="mt-2 font-semibold"><span className="text-white">Click to upload</span> or drag and drop</p>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                </div>
            )}
        </div>
    );
};


// --- Main Add Product Component ---
const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    slug: '',
    categories: '', // Using a comma-separated string for simplicity
    description: '',
    mrp: '',
    sellingPrice: '',
  });

  const [featuredImage, setFeaturedImage] = useState({ file: null, preview: '' });
  const [otherImages, setOtherImages] = useState([]); // Array to hold other images
  
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct(prev => ({ ...prev, [id]: value }));
  };
  
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImage({ file: null, preview: '' });
  };
  
  const handleOtherImageChange = (e, index) => {
    const file = e.target.files[0];
    if(file) {
        const newImages = [...otherImages];
        newImages[index] = { file, preview: URL.createObjectURL(file) };
        setOtherImages(newImages);
    }
  };

  const handleRemoveOtherImage = (index) => {
    setOtherImages(otherImages.filter((_, i) => i !== index));
  };

  const addImageField = () => {
    setOtherImages([...otherImages, { file: null, preview: '' }]);
  };

  // --- API Submission ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title || !product.sellingPrice || !featuredImage.file) {
      alert('Please fill in Title, Selling Price, and add a Featured Image.');
      return;
    }
    
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
        navigate("/login");
        return;
    }
    
    setStatus('uploading');
    
    const formData = new FormData();
    // Append all text fields
    formData.append('title', product.title);
    formData.append('slug', product.slug);
    formData.append('category', product.categories); // Adjust key as per your backend
    formData.append('description', product.description);
    formData.append('sellingPrice', product.sellingPrice); // Adjust key
    formData.append('mrp', product.mrp);
    
    // Append featured image
    formData.append('featuredImage', featuredImage.file);
    
    // Append list of other images
    otherImages.forEach(img => {
        if(img.file) {
            formData.append('images', img.file); // Same key for all other images
        }
    });

    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/add-products`,{
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });

      if(!response.ok) {
        throw new Error("Error adding product",response.statusText);
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      // Optionally reset form here
    } catch (error) {
      console.error('Error uploading data:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center font-sans p-4 text-white">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-50 text-center mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl shadow-lg shadow-gray-500 space-y-6">
          
          {/* --- Text & Number Fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Title<span className='inline-flex text-red-700 ml-1'>*</span></label>
              <input type="text" id="title" value={product.title} onChange={handleInputChange} placeholder="Product Name" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" required />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-1">Slug</label>
              <input type="text" id="slug" value={product.slug} onChange={handleInputChange} placeholder="product-name-slug" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" />
            </div>
            <div>
              <label htmlFor="mrp" className="block text-sm font-medium text-slate-300 mb-1">MRP</label>
              <input type="number" id="mrp" value={product.mrp} onChange={handleInputChange} placeholder="e.g., 999" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" />
            </div>
            <div>
              <label htmlFor="sellingPrice" className="block text-sm font-medium text-slate-300 mb-1">Selling Price<span className='inline-flex text-red-700 ml-1'>*</span></label>
              <input type="number" id="sellingPrice" value={product.sellingPrice} onChange={handleInputChange} placeholder="e.g., 699" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" required />
            </div>
          </div>
          
          <div>
              <label htmlFor="categories" className="block text-sm font-medium text-slate-300 mb-1">Categories</label>
              <input type="text" id="categories" value={product.categories} onChange={handleInputChange} placeholder="e.g., electronics, audio, headphones" className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-transparent focus:shadow-lg focus:shadow-gray-400 outline-none transition" />
              <p className="text-xs text-slate-400 mt-1">Enter categories separated by commas.</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea id="description" value={product.description} onChange={handleInputChange} rows="4" placeholder="Describe the product..." className="w-full px-4 py-2 bg-transparent border border-slate-300 rounded-lg focus:shadow-lg focus:shadow-gray-400 transition"></textarea>
          </div>

          {/* --- Featured Image --- */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Featured Image<span className='inline-flex text-red-700 ml-1'>*</span></label>
            <ImageUploadBox imageFile={featuredImage} onFileChange={handleFeaturedImageChange} onRemove={handleRemoveFeaturedImage} />
          </div>

          {/* --- Other Images --- */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Other Images</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherImages.map((img, index) => (
                    <ImageUploadBox
                        key={index}
                        imageFile={img}
                        onFileChange={(e) => handleOtherImageChange(e, index)}
                        onRemove={() => handleRemoveOtherImage(index)}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={addImageField}
                className="mt-4 w-full border-2 border-dashed border-slate-300 text-slate-300 font-bold py-2 px-4 rounded-lg hover:bg-gray-600/30 transition"
            >
                + Add More Image
            </button>
          </div>

          {/* --- Submit Button --- */}
          <div>
            <button type="submit" disabled={status === 'uploading'} className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed transition-all duration-300">
              {status === 'uploading' ? 'Uploading Product...' : 'Add Product'}
            </button>
            {status === 'success' && <p className="text-green-600 mt-2 text-center">Product added successfully!</p>}
            {status === 'error' && <p className="text-red-600 mt-2 text-center">Upload failed. Please try again.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;