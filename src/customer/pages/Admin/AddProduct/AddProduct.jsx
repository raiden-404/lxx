import React, { useState } from "react";
import Cookies from "js-cookie";

// A simple component to display API feedback (success or error)
const ApiFeedback = ({ message, type }) => {
    if (!message) return null;

    const baseClasses = "p-4 mb-4 text-sm rounded-lg";
    const typeClasses = type === "success"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert">
            <span className="font-medium">{type === "success" ? "Success!" : "Error!"}</span> {message}
        </div>
    );
};


// AddProductForm component for adding new products
const AddProductForm = ({ onAddProduct, apiResult }) => {
    // State for each input field
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [mrp, setMrp] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [category, setCategory] = useState("");

    // --- DYNAMIC IMAGE STATE ---
    // State is now an array of objects to hold both URL and alt text for each image.
    const [images, setImages] = useState([{ imageUrl: '', altText: '' }]);

    // --- DYNAMIC IMAGE HANDLERS ---

    /**
     * Handles changes to the imageUrl or altText for a specific image.
     * @param {number} index - The index of the image in the `images` array.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleImageChange = (index, event) => {
        const newImages = [...images];
        newImages[index][event.target.name] = event.target.value;
        setImages(newImages);
    };

    /**
     * Adds a new, empty image object to the state, which renders a new set of input fields.
     */
    const addImageField = () => {
        setImages([...images, { imageUrl: '', altText: '' }]);
    };

    /**
     * Removes an image field from the form by its index.
     * @param {number} index - The index of the image to remove.
     */
    const removeImageField = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };


    // Define options for the Slug dropdown
    const slugOptions = [
        { value: "", label: "Select a slug" },
        { value: "greeting-cards", label: "Greeting Cards" },
        { value: "labels-stickers", label: "Labels & Stickers" },
        { value: "accessories", label: "Accessories" },
        { value: "photo-frames", label: "Photo Frames" },
        { value: "personalize-gifts", label: "Personalize Gifts" },
        { value: "printing-posters", label: "Printing & Posters" },
        { value: "new-arrivals", label: "New Arrivals" },
        { value: "children-items", label: "Children Items" },
    ];

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !slug || !description || !mrp || !sellingPrice || !category) {
            alert("Please fill in all required fields.");
            return;
        }

        if (parseFloat(sellingPrice) > parseFloat(mrp)) {
            alert("Selling Price cannot be greater than MRP.");
            return;
        }

        const parsedCategories = category
            .split(/\s+/)
            .map((cat) => cat.trim())
            .filter((cat) => cat !== "");

        // Filter out any image entries where the user left the URL blank.
        const validImages = images.filter(img => img.imageUrl.trim() !== '');

        // Create the final product object with the correctly formatted images array.
        const newProduct = {
            title,
            category: parsedCategories,
            slug,
            description,
            mrp: parseFloat(mrp),
            sellingPrice: parseFloat(sellingPrice),
            images: validImages, // The images state is already in the correct format!
        };

        onAddProduct(newProduct);

        // Clear form fields after submission
        setTitle("");
        setSlug("");
        setDescription("");
        setMrp("");
        setSellingPrice("");
        setCategory("");
        setImages([{ imageUrl: '', altText: '' }]); // Reset images to one empty field
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Add New Product
            </h2>
             {/* Display API error messages right above the form */}
            <ApiFeedback message={apiResult?.error} type="error" />
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields for Title, Slug, Description, MRP, Selling Price, Categories... */}
                {/* (These fields are unchanged from your original code) */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input type="text" id="title" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Wireless Gaming Mouse" required />
                </div>
                <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Product Slug <span className="text-red-500">*</span></label>
                    <select id="slug" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={slug} onChange={(e) => setSlug(e.target.value)} required>
                        {slugOptions.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.value === ""}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea id="description" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm resize-y" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Ergonomic design with customizable RGB lighting." required></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="mrp" className="block text-sm font-medium text-gray-700 mb-1">MRP ($) <span className="text-red-500">*</span></label>
                        <input type="number" id="mrp" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={mrp} onChange={(e) => setMrp(e.target.value)} placeholder="e.g., 49.99" min="0" step="0.01" required />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($) <span className="text-red-500">*</span></label>
                        <input type="number" id="sellingPrice" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="e.g., 39.99" min="0" step="0.01" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categories (space-separated) <span className="text-red-500">*</span></label>
                    <textarea id="category" rows="2" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm resize-y" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., electronics gadgets accessories" required></textarea>
                </div>

                {/* --- DYNAMIC IMAGE INPUT SECTION --- */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Product Images</label>
                    {images.map((image, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
                            {/* Remove button appears only if there's more than one image field */}
                            {images.length > 1 && (
                                <button type="button" onClick={() => removeImageField(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors">&times;</button>
                            )}
                            <input type="text" name="imageUrl" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={image.imageUrl} onChange={(e) => handleImageChange(index, e)} placeholder="Image URL" required={index === 0} />
                            <input type="text" name="altText" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" value={image.altText} onChange={(e) => handleImageChange(index, e)} placeholder="Image Alt Text (for accessibility)" required={index === 0} />
                        </div>
                    ))}
                    <button type="button" onClick={addImageField} className="w-full mt-2 py-2 px-4 border border-dashed rounded-md text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        Add Another Image
                    </button>
                </div>

                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out">
                    Add Product
                </button>
            </form>
        </div>
    );
};


// The main App component where the AddProductForm will be used.
const AddProduct = () => {
    // State to hold the result from the API call (can be {success: ...} or {error: ...})
    const [result, setResult] = useState(null);

    // Function to send data to the backend API endpoint
    const handleAddProduct = async (productData) => {
        const jwtToken = Cookies.get("jwtToken");

        if (!jwtToken) {
            setResult({ error: "Authentication error. Please log in again." });
            return;
        }

        try {
            const apiUri = "http://localhost:8080/admin/add-products";
            const response = await fetch(apiUri, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorResult = await response.json().catch(() => ({ message: "An unknown server error occurred." }));
                throw new Error(errorResult.message || `HTTP error! Status: ${response.status}`);
            }

            const successResult = await response.json();
            console.log("Success:", successResult);
            setResult({ success: "Product added successfully!" });

        } catch (error) {
            console.error("Failed to add product:", error);
            setResult({ error: error.message });
        } finally {
            // Clear the result message after 5 seconds
            setTimeout(() => {
                setResult(null);
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* This logic now shows a success message when `result.success` exists.
              Otherwise, it shows the form and passes any `result` (like an error) to it.
            */}
            {result?.success ? (
                 <div className="w-full max-w-2xl">
                    <ApiFeedback message={result.success} type="success" />
                 </div>
            ) : (
                <AddProductForm onAddProduct={handleAddProduct} apiResult={result} />
            )}
        </div>
    );
};

export default AddProduct;
