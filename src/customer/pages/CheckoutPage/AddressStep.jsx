import {
  Building,
  Ellipsis,
  House,
  Loader2,
  Mailbox,
  MapPinHouse,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

// --- Input Component ---
const InputField = ({ name, value, onChange, placeholder, label }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </div>
);

const AddressForm = ({ setIsAddNewAddress, savedAddress }) => {
  const [ loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const [countPin, setCountPin] = useState(0);

  //Input fields of Form
  const [name, setName] = useState(null);
  const [houseNoOrName, setHouseNoOrName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [phone, setPhone] = useState(null);
  const [state, setState] = useState("");
  const [zip, setZip] = useState(null);
  const [country] = useState("INDIA");
  const [addressType, setAddressType] = useState("RESIDENTIAL");

  //Address Type options
  const options = [
    { id: "RESIDENTIAL", icon: <House size={18} />, description: "Home" },
    { id: "BUSINESS", icon: <Building size={18} />, description: "Office" },
    { id: "MAILING", icon: <Mailbox size={18} />, description: "Gifting" },
    { id: "OTHER", icon: <Ellipsis size={18} />, description: "Other" },
  ];

  //Option for States
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];


  //Used to save address to backend 
  const saveAddressToBackend = async () => {
    setLoading(true);
    //Api end point for setting address
    const apiUri = `${import.meta.env.VITE_API_URL}/user/set-address`;
    //Jwt token
    const jwtToken = Cookies.get("jwtToken");

    if (
      jwtToken &&
      name &&
      houseNoOrName &&
      street &&
      city &&
      phone &&
      state &&
      zip &&
      country &&
      addressType
    ) {
      //Obj to send on api to save
      const address = {
        name: name,
        houseNoOrName: houseNoOrName,
        street: street,
        city: city,
        landmark: landmark,
        phone: phone,
        state: state,
        zip: zip,
        country: "INDIA",
        addressType: addressType,
      };

      //Fetch method - get response
      const response = await fetch(apiUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        setIsAddNewAddress(false);
      }
    } else {
      console.log("Fill all fields || Login ");
    }
    setLoading(false);
  };

  //Get latitude and longitude from browser and call for reverse decode
  const handleLocationDetect = () => {
    setLocationLoading(true);
    //When browser don't support navigation then show error and return
    if(!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLocationLoading(false);
      setTimeout(() => {setError('');return;},3000);
    }

    //Clear previous error and location
    setError('');

    //get latitude and longitude
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseCoordinates(latitude, longitude);
      },
      (err) => {
        //Handle common errors
        switch(err.code) {
          case err.PERMISSION_DENIED:
            setError('Grant Access to location');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Unknown Location');
            break;
          case err.TIMEOUT:
            setError('Request time out');
            break;
          default:
            setError('Unknown error ocurred');
            break;
        }
        setLocationLoading(false);
      }
    );
  };

  //take latitude and longitude and provide readable address
  const reverseCoordinates = async (latitude, longitude) => {
    try{
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const fetchedAddress = await data.address;
      //Setting values to variables
      setCity(fetchedAddress.city);
      setZip(fetchedAddress.postcode);
      setState(fetchedAddress.state);
      setStreet(fetchedAddress.county);
      setInvalid(false);
    } catch(e) {
      setError('Error fetching details, fill manually.');
    }
    setLocationLoading(false);
  };

  //Take pincode and give address based on it
  const addressBasedOnPincode = useCallback(async () => {
    try {
      setError('');
      const response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
      
      const data = await response.json();
      console.log(data)
      //Check for pincode status
      if(data && data[0].Status == 'Success') {
        const fetchedAd = data[0].PostOffice[0];
        
        //Setting values
        setState(fetchedAd.Circle);
        setCity(fetchedAd.Block);
        setStreet(fetchedAd.Block);
        setInvalid(false);
      } else {
        setInvalid(true);
        setError("Invalid pincode");
      }

    } catch(e) {
      console.log("error",e);
    }
  },[zip]);

  useEffect(() => {
    if(zip > 99999 && zip < 1000000) {
    addressBasedOnPincode();
    }
  },[countPin]);

  
  return (
    <div className="space-y-4 mt-4 animate-fade-in">
      <button
        onClick={handleLocationDetect}
        disabled={locationLoading}
        className="w-full flex disabled:cursor-not-allowed items-center justify-center gap-2 text-pink-600 font-semibold border-2 border-pink-200 bg-pink-50 rounded-lg py-2.5 mb-8 hover:bg-pink-100 transition-colors"
      >{locationLoading ? <div className="animate-spin"><Loader2 /></div> :
        <><MapPinHouse />
        Use Current Location</>}
      </button>

      {/* Name */}
      <div className="flex flex-col gap-8">
        <div className="relative">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="Name"
          />
          <label
            htmlFor="name"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            Name *
          </label>
        </div>

        {/* Phone number */}
        <div className="relative">
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="Phone"
          />
          <label
            htmlFor="phone"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            Contact Number *
          </label>
        </div>

        {/* For house no. or name */}
        <div className="relative">
          <input
            id="houseNo"
            type="text"
            value={houseNoOrName}
            onChange={(e) => setHouseNoOrName(e.target.value)}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="House no. / Building Name"
          />
          <label
            htmlFor="houseNo"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            House no. / Building Name *
          </label>
        </div>

        {/* Street */}
        <div className="relative">
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="Road name / Area / Colony"
          />
          <label
            htmlFor="street"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            Road name / Area / Colony *
          </label>
        </div>

        {/* Landmark */}
        <div className="relative">
          <input
            id="landmark"
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="Landmark"
          />
          <label
            htmlFor="landmark"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            Landmark (Optional)
          </label>
        </div>

        {/* City - Pin code */}
        <div className="flex justify-between">
          {/* City */}
          <div className="relative">
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
              placeholder="City"
            />
            <label
              htmlFor="city"
              className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
            >
              City *
            </label>
          </div>

          {/* Pincode */}
          <div className="relative">
            <input
              id="zip"
              type="text"
              value={zip}
              onChange={(e) => {setZip(e.target.value);setCountPin(countPin + 1)}}
              className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
              placeholder="Pincode"
            />
            <label
              htmlFor="zip"
              className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
            >
              Pincode *
            </label>
          </div>
        </div>

        {/* state - country */}

        {/* State */}
        <div className="relative">
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            // The `peer` and `required` attributes are key to the new logic
            className="peer h-10 w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 outline-none ring-0 transition-colors focus:border-pink-600"
            required // This makes the select invalid when the default empty option is selected
          >
            {/* This empty option is the "placeholder" */}
            <option value="" disabled hidden></option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <label
            htmlFor="state"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all
                   peer-invalid:top-2 peer-invalid:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            State *
          </label>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* country */}
        <div className="relative">
          <input
            id="country"
            type="text"
            value={country}
            className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-gray-900 placeholder-transparent outline-none ring-0 transition-colors focus:border-pink-600"
            placeholder="Country"
          />
          <label
            htmlFor="country"
            className="absolute left-1 -top-3.5 cursor-text text-xs text-gray-500 transition-all 
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-pink-600"
          >
            Country *
          </label>
        </div>

        {/* Address Type */}

        <div className="flex gap-2 flex-nowrap overflow-scroll">
          {options.map((option) => (
            <label
              key={option.id}
              htmlFor={option.id}
              className={`cursor-pointer flex items-center gap-1 justify-center rounded-full bg-pink-50 py-1 px-3 border-2 transition
              ${
                addressType === option.id
                  ? "border-pink-800 bg-pink-600 text-white"
                  : "border-pink-200"
              }`}
            >
              {option.icon} {option.description}
              <input
                type="radio"
                id={option.id}
                name="shape"
                value={option.id}
                checked={addressType === option.id}
                onChange={() => setAddressType(option.id)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {savedAddress.length > 0 && (
        <button
          onClick={() => setIsAddNewAddress(false)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          &larr; Back to saved addresses
        </button>
      )}
      <div className="text-red-600">{error}</div>
      <button
        disabled={loading || invalid}
        onClick={() => {
          saveAddressToBackend(), setIsAddNewAddress(false);
        }}
        className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg mt-8 hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >{loading ? <div className=" flex justify-center gap-2"><Loader2 className="animate-spin" />Saving Address</div> : 
        "Save Address" }
      </button>
    </div>
  );
};

const AddressStep = ({setStep, addressId, setAddressId}) => {
  const [savedAddress, setSavedAddress] = useState([]);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [loadAddress, setLoadAddress] = useState(0);

  
  //It fetch all saved address from server
  const fetchSavedAddresses = useCallback(async () => {
    //Api end point do get all saved address related to user
    const apiUri = `${import.meta.env.VITE_API_URL}/user/get-addresses`;

    //Jwt token
    const jwtToken = Cookies.get("jwtToken");

    if (jwtToken) {
      try {
        const response = await fetch(apiUri, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const result = await response.json();

        if(result) {
        setSavedAddress(result);
        }
      } catch (error) {
        console.log("Error while fetching saved addresse ", error);
      }
    }
  },[]);

  useEffect(() => {
    fetchSavedAddresses();
  }, [fetchSavedAddresses,loadAddress,isAddNewAddress]);

  useEffect(() => {
    if(savedAddress.length == 0) {
      setIsAddNewAddress(true);
    }
  },[savedAddress]);

  //Remove address from server
  const removeSavedAddress = async (addressId) => {
    const baseUri = `${import.meta.env.VITE_API_URL}/user/remove-address`;
    const queryUri = new URLSearchParams({id:addressId});
    const fullUri = `${baseUri}?${queryUri}`;
    const jwtToken = Cookies.get("jwtToken");
    if(jwtToken && addressId) {
      const response = await fetch(fullUri, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if(response.ok) {
        setLoadAddress(loadAddress+1);
      }
    }
  }
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping Address
      </h2>

      {savedAddress.length > 0 && !isAddNewAddress ? (
        <div className="space-y-4">
          {savedAddress.map((addr) => (
            <div
              key={addr.addressId}
              className={`flex items-start p-4 border rounded-lg transition-all ${
                addressId === addr.addressId
                  ? "border-pink-500 ring-2 ring-pink-500"
                  : "border-gray-300"
              }`}
            >
              <label className="flex-grow flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddressId"
                  value={addr.addressId}
                  onChange={() => setAddressId(addr.addressId)}
                  className="h-5 w-5 mt-1 hidden text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">
                    {addr.name} ({addr.phone})
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.houseNoOrName} / {addr.street} / {addr.city},{" "}
                    {addr.zip}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.state} / {addr.country}
                  </p>
                </div>
              </label>
              {addressId === addr.addressId ? (
                <div className="flex flex-col justify-between gap-5 items-end">
                  <button
                    className="text-gray-500 hover:text-pink-600"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                  onClick={() => (removeSavedAddress(addressId))} 
                  className="text-gray-600 hover:text-pink-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
          <button
            onClick={() => setIsAddNewAddress(true)}
            className="w-full text-pink-600 font-semibold border-2 border-pink-500 rounded-lg py-2 mt-4 hover:bg-pink-50 transition-colors"
          >
            + Add a New Address
          </button>
          <button
            onClick={() => setStep("Payment")}
            disabled={addressId === ''}
            className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg mt-8 hover:bg-pink-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        </div>
      ) : (
        <AddressForm
          setIsAddNewAddress={setIsAddNewAddress}
          savedAddress={savedAddress}
        />
      )}
    </div>
  );
};
export default AddressStep;
