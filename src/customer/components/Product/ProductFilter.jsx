// src/components/ProductFilter.jsx
import { useState, useEffect, useRef } from 'react';

const ProductFilter = ({ setShowFilter }) => {
  const [activeTab, setActiveTab] = useState('brand');
  const [minPrice, setMinPrice] = useState(300);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [minDeliveryTime, setMinDeliveryTime] = useState(30);
  const [condition, setCondition] = useState('all');
  const [colors, setColors] = useState({
    blue: false,
    gray: false,
    green: true,
    pink: false,
    red: true
  });
  const [rating, setRating] = useState(3);
  const [weight, setWeight] = useState('1-1.5');
  const [deliveryType, setDeliveryType] = useState('usa');
  
  const modalRef = useRef(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowFilter]);
  
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setShowFilter(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setShowFilter]);
  
  const handleColorChange = (color) => {
    setColors(prev => ({
      ...prev,
      [color]: !prev[color]
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically apply the filters
    console.log('Filters applied');
    setShowFilter(false);
  };
  
  const handleReset = () => {
    setMinPrice(300);
    setMaxPrice(3500);
    setMinDeliveryTime(30);
    setCondition('all');
    setColors({
      blue: false,
      gray: false,
      green: true,
      pink: false,
      red: true
    });
    setRating(3);
    setWeight('1-1.5');
    setDeliveryType('usa');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal header */}
        <div className="flex items-start justify-between rounded-t p-4 md:p-5 border-b">
          <h3 className="text-lg font-normal text-gray-500">Filters</h3>
          <button 
            type="button" 
            onClick={() => setShowFilter(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        {/* Modal body */}
        <div className="p-4 md:p-5">
          <div className="mb-4 border-b border-gray-200">
            <ul className="-mb-px flex flex-wrap text-center text-sm font-medium" role="tablist">
              <li className="mr-1" role="presentation">
                <button
                  className={`inline-block pb-2 pr-1 ${
                    activeTab === 'brand' 
                      ? 'text-pink-600 border-b-2 border-pink-600' 
                      : 'text-gray-500 hover:text-gray-600'
                  }`}
                  onClick={() => setActiveTab('brand')}
                  role="tab"
                >
                  Brand
                </button>
              </li>
              <li className="mr-1" role="presentation">
                <button
                  className={`inline-block px-2 pb-2 ${
                    activeTab === 'advanced' 
                      ? 'text-pink-600 border-b-2 border-pink-600' 
                      : 'text-gray-500 hover:text-gray-600'
                  }`}
                  onClick={() => setActiveTab('advanced')}
                  role="tab"
                >
                  Advanced Filters
                </button>
              </li>
            </ul>
          </div>
          
          {/* Brand Tab Content */}
          {activeTab === 'brand' && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3" role="tabpanel">
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">A</h5>
                {['Apple (56)', 'Asus (97)', 'Acer (234)', 'Allview (45)', 'Atari (176)', 'AMD (49)', 'Aruba (16)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">B</h5>
                {['Beats (56)', 'Bose (97)', 'BenQ (45)', 'Bosch (176)', 'Brother (176)', 'Biostar (49)', 'Braun (16)', 'Blaupunkt (45)', 'BenQ (23)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">C</h5>
                {['Canon (49)', 'Cisco (97)', 'Cowon (234)', 'Clevo (45)', 'Corsair (15)', 'CSL (49)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">D</h5>
                {['Dell (56)', 'Dogfish (24)', 'Dyson (234)', 'Dobe (5)', 'Digitus (1)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">E</h5>
                {['Emetec (56)', 'Extreme (10)', 'Elgato (234)', 'Emerson (45)', 'EMI (176)', 'Fugoo (49)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h5 className="text-lg font-medium uppercase text-black">F</h5>
                {['Fujitsu (97)', 'Fitbit (56)', 'Foxconn (234)', 'Floston (45)'].map(brand => (
                  <div key={brand} className="flex items-center">
                    <input 
                      id={brand.split(' ')[0].toLowerCase()} 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                    />
                    <label htmlFor={brand.split(' ')[0].toLowerCase()} className="ml-2 text-sm font-medium text-gray-900">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Advanced Filters Tab Content */}
          {activeTab === 'advanced' && (
            <div className="space-y-4" role="tabpanel">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="min-price" className="block text-sm font-medium text-gray-900">
                      Min Price (${minPrice})
                    </label>
                    <input 
                      id="min-price" 
                      type="range" 
                      min="0" 
                      max="7000" 
                      value={minPrice} 
                      step="1" 
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="max-price" className="block text-sm font-medium text-gray-900">
                      Max Price (${maxPrice})
                    </label>
                    <input 
                      id="max-price" 
                      type="range" 
                      min="0" 
                      max="7000" 
                      value={maxPrice} 
                      step="1" 
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200" 
                    />
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-between space-x-2">
                    <input 
                      type="number" 
                      id="min-price-input" 
                      value={minPrice} 
                      min="0" 
                      max="7000" 
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500" 
                    />
                    
                    <div className="shrink-0 text-sm font-medium">to</div>
                    
                    <input 
                      type="number" 
                      id="max-price-input" 
                      value={maxPrice} 
                      min="0" 
                      max="7000" 
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="min-delivery-time" className="block text-sm font-medium text-gray-900">
                      Min Delivery Time (Days) ({minDeliveryTime})
                    </label>
                    <input 
                      id="min-delivery-time" 
                      type="range" 
                      min="3" 
                      max="50" 
                      value={minDeliveryTime} 
                      step="1" 
                      onChange={(e) => setMinDeliveryTime(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200" 
                    />
                  </div>
                  
                  <input 
                    type="number" 
                    id="min-delivery-time-input" 
                    value={minDeliveryTime} 
                    min="3" 
                    max="50" 
                    onChange={(e) => setMinDeliveryTime(Number(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500" 
                  />
                </div>
              </div>
              
              <div>
                <h6 className="mb-2 text-sm font-medium text-black">Condition</h6>
                <ul className="flex w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
                  {['all', 'new', 'used'].map((cond) => (
                    <li key={cond} className="w-full border-r border-gray-200">
                      <div className="flex items-center pl-3">
                        <input 
                          id={`condition-${cond}`} 
                          type="radio" 
                          name="condition" 
                          checked={condition === cond}
                          onChange={() => setCondition(cond)}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                        />
                        <label 
                          htmlFor={`condition-${cond}`} 
                          className="ml-2 w-full py-3 text-sm font-medium text-gray-900 capitalize"
                        >
                          {cond}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <h6 className="mb-2 text-sm font-medium text-black">Colour</h6>
                  <div className="space-y-2">
                    {[
                      { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
                      { id: 'gray', name: 'Gray', color: 'bg-gray-400' },
                      { id: 'green', name: 'Green', color: 'bg-green-400' },
                      { id: 'pink', name: 'Pink', color: 'bg-pink-400' },
                      { id: 'red', name: 'Red', color: 'bg-red-500' }
                    ].map((color) => (
                      <div key={color.id} className="flex items-center">
                        <input 
                          id={color.id} 
                          type="checkbox" 
                          checked={colors[color.id]}
                          onChange={() => handleColorChange(color.id)}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                        />
                        <label htmlFor={color.id} className="ml-2 flex items-center text-sm font-medium text-gray-900">
                          <div className={`mr-2 h-3.5 w-3.5 rounded-full ${color.color}`}></div>
                          {color.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h6 className="mb-2 text-sm font-medium text-black">Rating</h6>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center">
                        <input 
                          id={`${stars}-stars`} 
                          type="radio" 
                          name="rating" 
                          checked={rating === stars}
                          onChange={() => setRating(stars)}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                        />
                        <label htmlFor={`${stars}-stars`} className="ml-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`h-5 w-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h6 className="mb-2 text-sm font-medium text-black">Weight</h6>
                  <div className="space-y-2">
                    {[
                      { id: 'under-1-kg', name: 'Under 1 kg' },
                      { id: '1-1-5-kg', name: '1-1,5 kg' },
                      { id: '1-5-2-kg', name: '1,5-2 kg' },
                      { id: '2-5-3-kg', name: '2,5-3 kg' },
                      { id: 'over-3-kg', name: 'Over 3 kg' }
                    ].map((weightOpt) => (
                      <div key={weightOpt.id} className="flex items-center">
                        <input 
                          id={weightOpt.id} 
                          type="checkbox" 
                          checked={weight === weightOpt.id}
                          onChange={() => setWeight(weightOpt.id)}
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-600 focus:ring-2 focus:ring-pink-500" 
                        />
                        <label htmlFor={weightOpt.id} className="ml-2 text-sm font-medium text-gray-900">
                          {weightOpt.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h6 className="mb-2 text-sm font-medium text-black">Delivery type</h6>
                <ul className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'usa', name: 'USA', desc: 'Delivery only for USA' },
                    { id: 'europe', name: 'Europe', desc: 'Delivery only for Europe' },
                    { id: 'asia', name: 'Asia', desc: 'Delivery only for Asia' },
                    { id: 'australia', name: 'Australia', desc: 'Delivery only for Australia' }
                  ].map((delivery) => (
                    <li key={delivery.id}>
                      <input 
                        type="radio" 
                        id={`delivery-${delivery.id}`} 
                        name="delivery" 
                        checked={deliveryType === delivery.id}
                        onChange={() => setDeliveryType(delivery.id)}
                        className="peer hidden" 
                      />
                      <label 
                        htmlFor={`delivery-${delivery.id}`} 
                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-pink-600 peer-checked:text-pink-600 md:p-3"
                      >
                        <div className="block">
                          <div className="w-full text-lg font-semibold">{delivery.name}</div>
                          <div className="w-full text-sm">{delivery.desc}</div>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal footer */}
        <div className="flex items-center space-x-4 rounded-b p-4 md:p-5 border-t">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="rounded-lg bg-pink-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Show 50 results
          </button>
          <button 
            type="reset" 
            onClick={handleReset}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;