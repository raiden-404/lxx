import React, { useState, useMemo, useEffect } from "react";
import OrderSummary from "./OrderSummery";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCheckout,
  updateCheckout,
} from "../../../features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { Check, CircleCheckBig } from "lucide-react";
import AddressStep from "./AddressStep";

// --- Helper Components & Data ---

// Placeholder for icons and logos
const Icon = ({ name, className }) => {
  const icons = {
    user: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    ),
    mail: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
    edit: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    ),
    location: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </>
    ),
    gps: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a9.95 9.95 0 00-9.95 9.95c0 1.45.32 2.84.9 4.1L12 22l8.05-5.95a9.95 9.95 0 00.9-4.1A9.95 9.95 0 0012 2zm0 4.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"
      />
    ),
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
      />
    ),
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    ),
    lock: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    ),
    paytm: (
      <path d="M11.05.942H1.46v15.11h9.59V.942zM4.14 13.37H2.23v-1.7h1.91v1.7zm0-3.35H2.23v-1.7h1.91v1.7zm0-3.36H2.23V4.96h1.91v1.7zm3.33 6.71H5.56V3.26h1.91v10.12zm0-4.71H5.56V6.96h1.91v1.7zm3.34 4.71H8.9v-1.7h1.91v1.7zm0-3.35H8.9v-1.7h1.91v1.7zm0-3.36H8.9V4.96h1.91v1.7z" />
    ),
    phonepe: (
      <path d="M11.977 6.068c0 3.34-2.24 6.05-5.002 6.05-2.763 0-5.003-2.71-5.003-6.05S4.212 0 6.975 0c2.76 0 5.002 2.71 5.002 6.05zm-1.54.004c0-2.34-1.24-4.24-2.77-4.24-1.532 0-2.772 1.9-2.772 4.24s1.24 4.24 2.771 4.24c1.53 0 2.77-1.9 2.77-4.24zM13.896 15.002H12.18V1.1h1.716v13.902z" />
    ),
    gpay: (
      <path d="M11.45 6.88c0 2.37-1.23 3.5-3.04 3.5-1.82 0-2.92-1.1-2.92-2.77V4.3h7.6v1.16h-6.08v1.3c0 .8.46 1.25 1.3 1.25.75 0 1.3-.4 1.3-1.34h1.84zm-6.17.96h2.95c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H5.28c-.3 0-.5.2-.5.5s.2.5.5.5zM15.42 6.88c0 2.37-1.23 3.5-3.04 3.5-1.82 0-2.92-1.1-2.92-2.77V4.3h7.6v1.16h-6.08v1.3c0 .8.46 1.25 1.3 1.25.75 0 1.3-.4 1.3-1.34h1.84z" />
    ),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

// Mock cart and address data
const initialCartItems = [
  {
    id: 1,
    name: "Eco-friendly Reusable Water Bottle for Everyday Use",
    price: 25.0,
    quantity: 2,
    image: "https://placehold.co/80x80/a7f3d0/14532d?text=Bottle",
  },
  {
    id: 2,
    name: "Organic Cotton Tote Bag with Custom Print",
    price: 18.5,
    quantity: 1,
    image: "https://placehold.co/80x80/bae6fd/0c4a6e?text=Bag",
  },
];

const mockSavedAddresses = [
  {
    id: "addr1",
    fullName: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    zipCode: "12345",
    isDefault: true,
    email: "john.doe@example.com",
    phone: "111-222-3333",
  },
  {
    id: "addr2",
    fullName: "Jane Smith",
    address: "456 Oak Ave",
    city: "Someville",
    zipCode: "67890",
    isDefault: false,
    email: "jane.smith@example.com",
    phone: "444-555-6666",
  },
];

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

// --- Step Components ---

const PaymentStep = ({ formData, handleChange, nextStep, prevStep }) => {
  const { paymentMethod, upiProvider } = formData;
  const canProceed =
    paymentMethod === "cod" || (paymentMethod === "upi" && upiProvider);

  const UpiOption = ({ provider, current, onChange }) => {
    const logos = {
      paytm: <Icon name="paytm" className="w-14 h-6 fill-current" />,
      phonepe: <Icon name="phonepe" className="w-14 h-6 fill-current" />,
      gpay: <Icon name="gpay" className="w-14 h-6 fill-current" />,
    };
    return (
      <label
        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
          current === provider
            ? "border-blue-500 ring-2 ring-blue-500"
            : "border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="upiProvider"
          value={provider}
          checked={current === provider}
          onChange={handleChange}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
        />
        <div className="ml-4 flex-grow text-gray-700">{logos[provider]}</div>
      </label>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      <div className="space-y-4">
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 font-semibold text-gray-800">UPI</span>
          </label>
          {paymentMethod === "upi" && (
            <div className="mt-4 pl-8 space-y-3 animate-fade-in-slow">
              <UpiOption
                provider="gpay"
                current={upiProvider}
                onChange={handleChange}
              />
              <UpiOption
                provider="phonepe"
                current={upiProvider}
                onChange={handleChange}
              />
              <UpiOption
                provider="paytm"
                current={upiProvider}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <label className="flex items-center p-4 border rounded-lg cursor-pointer transition-all border-gray-300">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-3 font-semibold text-gray-800">
            Cash on Delivery (COD)
          </span>
        </label>
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-900 font-semibold"
        >
          &larr; Back to Address
        </button>
        <button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>
    </div>
  );
};

const ReviewStep = ({
  formData,
  savedAddresses,
  isAddingNew,
  prevStep,
  handleSubmit,
  total,
}) => {
  const displayAddress = isAddingNew
    ? formData.newAddress
    : savedAddresses.find((addr) => addr.id === formData.selectedAddressId);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Review Your Order
      </h2>
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-2">
            Shipping To
          </h3>
          {displayAddress && (
            <>
              <p className="text-gray-600">{displayAddress.fullName}</p>
              <p className="text-gray-600">
                {displayAddress.address}, {displayAddress.city},{" "}
                {displayAddress.zipCode}
              </p>
              <p className="text-gray-600">{displayAddress.email}</p>
            </>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-2">
            Payment Method
          </h3>
          <p className="text-gray-600 capitalize">
            {formData.paymentMethod === "cod"
              ? "Cash on Delivery"
              : `UPI via ${formData.upiProvider}`}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
        <button
          onClick={prevStep}
          className="text-gray-600 hover:text-gray-900 font-semibold text-center"
        >
          &larr; Back to Payment
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Icon name="lock" className="w-5 h-5" />
          <span>Place Order & Pay ${total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

//This return the progress bar above the checkout component
const CheckoutProgressBar = ({ currentStep }) => {
  //All three steps writen
  const steps = ["Address", "Payment", "Review"];
  //Getting our current step and use it for style
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {/* Map over each steps and style css based on current step */}
        {steps.map((step, index) => (
          //Using React.Fragment to return multiple div in single return
          //work same as <></> but it doesn't interfear with css
          //use here to give different div for other step and other div for current step
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center w-20 sm:w-24">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  // Colored round circle for all step before current steps
                  index <= currentStepIndex
                    ? "bg-pink-200 text-gray-600"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {/* ✔️ for all steps before current step else the index no */}
                {index < currentStepIndex ? (
                  //   <Icon name="check" className="w-6 h-6" />
                  <CircleCheckBig stroke="#C7246B" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>
              {/* Also its name get colored based on current step */}
              <p
                className={`mt-2 text-xs sm:text-sm font-semibold ${
                  index <= currentStepIndex ? "text-pink-600" : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>
            {/* Line for all step except last one - colord based on current step */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 rounded-xl mx-1 sm:mx-1 transition-all duration-500 ${
                  index < currentStepIndex ? "bg-pink-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const SuccessMessage = ({ onReset }) => (
  <div className="text-center p-10 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
      <Icon name="check" className="w-10 h-10 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold text-green-800 mt-6">
      Order Placed Successfully!
    </h2>
    <p className="text-gray-600 mt-2">
      Thank you for your purchase. A confirmation email has been sent.
    </p>
    <button
      onClick={onReset}
      className="mt-8 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Start a New Order
    </button>
  </div>
);

// --- Main App Component ---

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState("Address"); // Address, Payment, Review
  const [cartItems] = useState(initialCartItems);
  const [savedAddresses] = useState(mockSavedAddresses);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(
    savedAddresses.length === 0
  );
  //Product details
  const [products, setProducts] = useState(null);

  //Saved Addresses
  const [addresses, setAddresses] = useState(null);

  const item = useSelector((state) => state.checkout.items);

  //This method is used to fetch item details(price, img) from backend based on checkout slice items
  const fetchProducts = async () => {
    //Api to get items details
    const apiUri = "http://localhost:8080/user/get-checkout-items";

    //Jwt token for auth perpose
    const jwtToken = Cookies.get("jwtToken");

    //checking if user has jwt token and also there is some item in checkout
    if (jwtToken && item.length > 0) {
      try {
        //Getting array of obj(productId,quantity) from checkout slice
        const itemsArray = item.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        //Making API call on backend
        const response = await fetch(apiUri, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(itemsArray),
        });

        const result = await response.json();

        setProducts(result);
      } catch (error) {
        console.log("error fetching checkout items : ", error);
      }
    } else {
      console.log("Add products to checkout");
    }
  };

  //This method fetch all the saved address from backend
  const fetchAddress = async () => {
    //Jwt Token for Auth perpose
    const jwtToken = Cookies.get("jwtToken");

    //Api endpoint for getting addresses
    const apiUri = "http://localhost:8080/user/get-addresses";

    //Getting response from backend - fetch method
    const response = await fetch(apiUri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const result = await response.json();

    setAddresses(result);
  };

  useEffect(() => {
    fetchProducts();
    fetchAddress();
  }, []);

  useEffect(() => {
    console.log("Ye details checkout ka hai backend se ", products);
    console.log("Or ye rha address ", addresses);
  });

  const initialFormData = {
    selectedAddressId:
      savedAddresses.find((a) => a.isDefault)?.id ||
      (savedAddresses.length > 0 ? savedAddresses[0].id : ""),
    newAddress: {
      email: "",
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
    paymentMethod: "upi", // upi, cod
    upiProvider: "gpay", // gpay, phonepe, paytm
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      ["email", "fullName", "address", "city", "zipCode", "phone"].includes(
        name
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        newAddress: { ...prev.newAddress, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Fetched position:", position);
          // In a real application, you would use a reverse geocoding API
          // to convert lat/lon to a physical address.
          // For this demo, we'll use a mock address based on the persona.
          setFormData((prev) => ({
            ...prev,
            newAddress: {
              ...prev.newAddress,
              address: "NH 30, Near Collectorate",
              city: "Bhabua",
              zipCode: "821101",
            },
          }));
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Could not retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleEditAddress = (addressId) => {
    const addressToEdit = savedAddresses.find((addr) => addr.id === addressId);
    if (addressToEdit) {
      setFormData((prev) => ({
        ...prev,
        newAddress: { ...addressToEdit },
      }));
      setIsAddingNewAddress(true);
    }
  };

  const nextStep = () => {
    const steps = ["Address", "Payment", "Review"];
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex < steps.length - 1) {
      // If adding a new address, add it to the list (for demo purposes)
      if (isAddingNewAddress) {
        const finalAddress = {
          ...formData.newAddress,
          id: `addr${Date.now()}`, // a simple unique id
        };
        // In a real app, you would save this to your backend/state management
        console.log("Saving new address:", finalAddress);
      }
      setStep(steps[currentStepIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = ["Address", "Payment", "Review"];
    const currentStepIndex = steps.indexOf(step);
    if (currentStepIndex > 0) {
      setStep(steps[currentStepIndex - 1]);
    }
  };

  const handleSubmit = () => {
    const finalData = {
      paymentMethod: formData.paymentMethod,
      upiProvider:
        formData.paymentMethod === "upi" ? formData.upiProvider : null,
      shippingAddress: isAddingNewAddress
        ? formData.newAddress
        : savedAddresses.find((a) => a.id === formData.selectedAddressId),
    };
    console.log("Order Submitted:", finalData);
    setOrderPlaced(true);
  };

  //This method handle the click on button(Start new order) of success page
  //clear the checkout slice and navigate to home page
  const handleReset = () => {
    dispatch(clearCheckout());
    navigate("/");
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const shippingCost = 5.0; // Fixed shipping cost
  const total = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  //It Handles all the step (Addrees, payment mode, review checkout)
  //Replace the component based on the step
  //it is a function having switch case which call component based on step. like when step = address , then its case "address" matches then i render address component
  const renderStep = () => {
    switch (step) {
      case "Address":
        return (
          <AddressStep
            formData={formData}
            savedAddresses={savedAddresses}
            handleChange={handleChange}
            nextStep={nextStep}
            isAddingNew={isAddingNewAddress}
            setIsAddingNew={setIsAddingNewAddress}
            handleUseCurrentLocation={handleUseCurrentLocation}
            handleEditAddress={handleEditAddress}
          />
        );
      case "Payment":
        return (
          <PaymentStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case "Review":
        return (
          <ReviewStep
            formData={formData}
            savedAddresses={savedAddresses}
            isAddingNew={isAddingNewAddress}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            total={total}
          />
        );
      default:
        return null;
    }
  };

  //Here Main component returning JSX start
  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {orderPlaced ? (
          <SuccessMessage onReset={handleReset} />
        ) : (
          <>
            <div className="max-w-xl mx-auto mb-8">
              <CheckoutProgressBar currentStep={step} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md lg:order-1">
                {/* <----- Dibbugger is Here ------------------------------------------------------------------------------------------------------------------ */}
                {renderStep()}
              </div>
              <div className="lg:sticky top-8 self-start">
                {products === null ? (
                  <>Fetching Product Details...</>
                ) : (
                  <OrderSummary
                    items={products.items}
                    mrpTotal={products.mrpTotal}
                    subTotal={products.subTotal}
                    shipping={products.shipping}
                    taxPercent={products.taxPercent}
                    tax={products.tax}
                    total={products.total}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CheckoutPage;
