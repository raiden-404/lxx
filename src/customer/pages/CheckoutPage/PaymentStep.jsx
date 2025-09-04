import {  Loader2, Lock } from "lucide-react";
import { useState } from "react";

// SVG Icon Component for UPI
const UpiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-teal-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

// SVG Icon Component for COD
const CodIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Main PaymentStep Component
const PaymentStep = ({
  setStep,
  total,
  setPaymentMethod,
  handlePlaceOrder,
}) => {
  // State to track the selected payment method.
  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * Renders a single payment option block.
   * This component is self-contained within PaymentStep for simplicity.
   */
  const PaymentOption = ({
    id,
    title,
    subtitle,
    icon,
    description,
    buttonText,
    buttonColor,
  }) => {
    const isSelected = selectedOption === id;
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = (e) => {
      e.stopPropagation(); // Prevent the parent div's onClick from firing
      handlePlaceOrder();
      setIsLoading(true);
    };

    return (
      <div
        className={`
          border-2 rounded-xl p-4 md:p-6 cursor-pointer transition-all duration-1000 ease-in-out
          ${
            isSelected
              ? "border-teal-400 bg-teal-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-md"
          }
        `}
        onClick={() => {
          setSelectedOption((prev) => (prev === id ? null : id)),
            setPaymentMethod(id);
        }}
      >
        <div className="flex items-center space-x-4">
          {icon}
          <div>
            <div className="flex h-7 items-center gap-2">
              <h3 className="font-bold text-lg text-gray-800">{title}</h3>
              <div className="object-contain relative">
                <img
                  className=" h-6 rounded-full"
                  src="https://ecards.hypupad.com/wp-content/uploads/2021/01/payment-logo-icons-1024x272.png"
                  alt=""
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        {/* Expanded content with button - uses a smooth and slow transition */}
        <div
          className={`transition-all duration-1000 ease-in-out overflow-hidden ${
            isSelected ? "max-h-40 mt-6 pt-4 border-t" : "max-h-0"
          }`}
        >
          <p className="text-sm font-semibold text-gray-600 mb-4">
            {description}
          </p>
          <button
            disabled={isLoading}
            className={`
                w-full flex gap-3 disabled:cursor-not-allowed justify-center py-3 px-4 rounded-lg text-white font-semibold 
                
                ${buttonColor}
              `}
            onClick={handleButtonClick}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Lock size={22} />
                {buttonText}
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Step</h2>
      <div className="w-full max-w-mds md:p-8 space-y-6">
        <button
          onClick={() => setStep("Address")}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          &larr; Back to saved addresses
        </button>

        {/* UPI Full Payment Option */}
        <PaymentOption
          id="UPI"
          title="UPI"
          subtitle="Pay the complete amount now"
          icon={<UpiIcon />}
          description="Pay Full Payment Now to Get ₹20 OFF"
          buttonText={`Place Order & Paynow ₹${(total - 20).toFixed(2)}`}
          buttonColor="bg-green-600 hover:bg-green-700"
        />

        {/* UPI Partial Payment Option */}
        <PaymentOption
          id="UPI_COD"
          title="UPI + COD"
          subtitle="Pay an initial amount now"
          icon={<CodIcon />}
          description={`Pay 30% ( ₹${(0.3 * total).toFixed(2)
        } ) Now, Remaining( ₹${(0.7 * total).toFixed(2)} ) on COD.`}
          buttonText={`Place Order & Paynow ₹${(0.3 * total).toFixed(2)}`}
          buttonColor="bg-green-600 hover:bg-green-700"
        />
      </div>
    </div>
  );
};
export default PaymentStep;
