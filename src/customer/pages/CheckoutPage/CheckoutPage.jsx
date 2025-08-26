import React, { useState, useEffect, useCallback } from "react";
import OrderSummary from "./OrderSummery";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearCheckout } from "../../../features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { Check, CircleCheckBig } from "lucide-react";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";

//This return the progress bar above the checkout component
const CheckoutProgressBar = ({ currentStep }) => {
  //All three steps writen
  const steps = ["Address", "Payment"];
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

const SuccessMessage = ({ onReset }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/my-orders");
    },2000);
  },[navigate]);
  return (
    <div className="text-center p-10 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
      <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
        <Check size={43} stroke="green" />
      </div>
      <h2 className="text-2xl font-bold text-green-800 mt-6">
        Order Placed Successfully!
      </h2>
      <p className="text-gray-600 mt-2">
        Thank you for your purchase. A confirmation email has been sent.
      </p>
      <button
        onClick={onReset}
        className="mt-8 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
      >
        Start a New Order
      </button>
    </div>
  );
};

// --- Main App Component ---

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState("Address"); // Address, Payment
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = useSelector((state) => state.user.items);

  //Product details
  const [products, setProducts] = useState(null);

  //Saved Addresses

  const item = useSelector((state) => state.checkout.items);

  //This method is used to fetch item details(price, img) from backend based on checkout slice items
  const fetchProducts = useCallback(async () => {
    //Api to get items details
    const apiUri = `${import.meta.env.VITE_API_URL}/user/get-checkout-items`;

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
  }, [item, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //This method handle the click on button(Start new order) of success page
  //clear the checkout slice and navigate to home page
  const handleReset = () => {
    dispatch(clearCheckout());
    navigate("/");
  };

  //This method handles last payment method - create and send order obj to backend to countinue with order and payment
  const handlePlaceOrder = async () => {
    if (products.items.length > 0 && addressId && paymentMethod) {
      const jwtToken = Cookies.get("jwtToken");
      if (jwtToken) {
        try {
          //Api to create order
          const apiUri = `${import.meta.env.VITE_API_URL}/user/create-order`;

          //Data Obj to send
          const order = {
            items: products.items.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
            addressId: addressId,
            paymentMethod: paymentMethod,
          };

          const response = await fetch(apiUri, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken},`,
            },
            body: JSON.stringify(order),
          });

          //When server not provide ok response
          if (!response.ok) {
            throw new Error("Failed to create order");
          }

          const paymentData = await response.json();

          //Function to handle razorpay checkout
          openRazorPayCheckout(paymentData);
        } catch (error) {
          console.log("Login First :", error);
        }
      }
    } else {
      console.log("Missing some data");
    }
  };

  //Razorpay checkout handle function
  const openRazorPayCheckout = (paymentData) => {
    const options = {
      key: paymentData.keyId, //Razorpay public key from backend
      amount: paymentData.amount, //Amount in paisa
      currency: paymentData.currency,
      name: "Laxmi Customize",
      description: `Order ID: ${paymentData.orderId}`, //Local order id
      order_id: paymentData.razorpayOrderId, //The Razorpay order ID

      //This Handler function is called after successful payment
      handler: function (response) {
        //Call method the verify it on backend
        verifyPaymentOnBackend(response);
      },
      prefill: {
        //Auto fill user data
        name: user.fullName,
        email: user.email,
        contact: 9341558261,
      },
      notes: {
        local_order_id: paymentData.orderId,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log("Payment Failed", response.error);
      alert(`Payment Failed: ${response.error.description}`);
    });

    rzp.open();
  };

  //This method take the signature, order id and client id
  //send to backend api to varify the transaction and update the order
  const verifyPaymentOnBackend = async (paymentData) => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment varification failed");
      }
      setIsOrderPlaced(true);
    } catch (error) {
      console.log("Varification Api called failed :", error);
    }
  };

  //It Handles all the step (Addrees, payment mode, review checkout)
  //Replace the component based on the step
  //it is a function having switch case which call component based on step. like when step = address , then its case "address" matches then i render address component
  const renderStep = () => {
    switch (step) {
      case "Address":
        return (
          <AddressStep
            setStep={setStep}
            addressId={addressId}
            setAddressId={setAddressId}
          />
        );
      case "Payment":
        return (
          <PaymentStep
            setStep={setStep}
            total={products.total}
            setPaymentMethod={setPaymentMethod}
            handlePlaceOrder={handlePlaceOrder}
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
        {isOrderPlaced ? (
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
