import { useState } from "react";
import { Mail, Phone, LoaderCircle, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";

// You can replace this with your actual logo
const Logo = () => (
  <svg
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="text-pink-600"
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
  </svg>
);

// Google Icon Component
const GoogleIcon = () => (
  <svg
  className="w-5 h-5"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M47.532 24.552c0-1.656-.144-3.264-.42-4.8H24.012v9.024h13.188c-.564 2.904-2.16 5.4-4.668 7.032v5.856h7.536c4.416-4.08 6.96-10.044 6.96-17.112z"
      fill="#4285F4"
      />
    <path
      d="M24.012 48c6.48 0 11.928-2.136 15.9-5.724l-7.536-5.856c-2.16 1.452-4.92 2.316-8.364 2.316-6.42 0-11.856-4.32-13.788-10.152h-7.764v6.036C6.156 41.208 14.46 48 24.012 48z"
      fill="#34A853"
      />
    <path
      d="M10.224 28.704c-.384-.948-.6-2.004-.6-3.108s.216-2.16.6-3.108V16.452H2.46C.936 19.428 0 22.956 0 25.6c0 2.64.936 6.168 2.46 9.144l7.764-6.036z"
      fill="#FBBC05"
      />
    <path
      d="M24.012 9.48c3.492 0 6.564 1.2 9.024 3.6l6.708-6.708C35.928 2.22 30.492 0 24.012 0 14.46 0 6.156 6.792 2.46 16.452l7.764 6.036C12.156 13.8 17.592 9.48 24.012 9.48z"
      fill="#EA4335"
      />
  </svg>
);

const LoginPage = () => {
  const [step, setStep] = useState("identifier"); // 'identifier' or 'otp'
  const [loginMethod, setLoginMethod] = useState("phone"); // 'phone' or 'email'
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Basic validation
    if (loginMethod === "phone" && !/^\d{10}$/.test(identifier)) {
      setError("Please enter a valid 10-digit phone number.");
      setIsLoading(false);
      return;
    }
    if (loginMethod === "email" && !/\S+@\S+\.\S+/.test(identifier)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    // Simulate API call to send OTP

    if (loginMethod === "phone") {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login/num`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: identifier,
        }),
      });

      if (!response.ok) {
        setError("Invalid phone number");
        setIsLoading(false);
        return;
      }
      const result = await response.text();
      console.log(result);
    }
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep("otp");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    //Api call - send number and otp and set received jwt token
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login/num/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: identifier,
        otp: otp,
      }),
    });

    const result = await response.text();
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (result == "Invalid OTP") {
        setError("Invalid OTP. Please try again.");
      } else {
        
        //As Token recevied then store the token in cookies
        //Then fetch user detail from that token
        
        //Store token into cookie
        Cookies.set("jwtToken",result,{expires: 7});

        //Navigate to Home page for better userExperience
        window.location.href="/";
      }
      setIsLoading(false);
    };

  const toggleLoginMethod = () => {
    setIdentifier("");
    setError("");
    setLoginMethod((prev) => (prev === "phone" ? "email" : "phone"));
  };

  const goBack = () => {
    setStep("identifier");
    setOtp("");
    setError("");
  };

  const renderIdentifierStep = () => (
    <>
      <h1 className="text-2xl xl:text-2xl md:text-3xl font-extrabold text-center">
        Login
      </h1>
      <div className="w-full flex-1 mt-8">
        <form onSubmit={handleSendOtp} className="mx-auto max-w-xs">
          {error && (
            <p className="text-sm text-red-600 text-center mb-4">{error}</p>
          )}
          <div className="relative">
            {loginMethod === "phone" ? (
              <Phone className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
            ) : (
              <Mail className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
            )}
            <input
              className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-pink-500"
              type={loginMethod === "phone" ? "tel" : "email"}
              placeholder={
                loginMethod === "phone" ? "Phone Number" : "Email Address"
              }
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            onClick={toggleLoginMethod}
            className="mt-3 text-xs text-pink-600 hover:text-pink-800 font-semibold"
          >
            Login with {loginMethod === "phone" ? "Email" : "Phone"} instead
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-pink-300"
          >
            {isLoading ? (
              <LoaderCircle className="w-6 h-6 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="my-8 border-b text-center">
          <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
            Or
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() =>
              (window.location.href =
                `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`)
            }
            disabled={isLoading}
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-white border border-gray-400 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline disabled:opacity-50"
          >
            <GoogleIcon />
            <span className="ml-4">Sign In with Google</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderOtpStep = () => (
    <>
      <button
        onClick={goBack}
        className="flex items-center text-sm font-medium text-gray-600 hover:text-pink-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
      <h1 className="text-2xl xl:text-3xl font-extrabold">
        Verify your {loginMethod}
      </h1>
      <p className="text-center text-sm text-gray-600 mt-4">
        Enter the 6-digit code sent to <br />
        <span className="font-semibold">{identifier}</span>
      </p>
      <div className="w-full flex-1 mt-8">
        <form onSubmit={handleVerifyOtp} className="mx-auto max-w-xs">
          {error && (
            <p className="text-sm text-red-600 text-center mb-4">{error}</p>
          )}
          <input
            className="w-full px-3 py-3 rounded-lg border-2 border-gray-200 outline-none focus:border-pink-500 text-center tracking-[1em]"
            type="text"
            maxLength="6"
            placeholder="••••••"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-pink-300"
          >
            {isLoading ? (
              <LoaderCircle className="w-6 h-6 animate-spin" />
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-600">
          <span>Didn't receive code? </span>
          <button
            onClick={handleSendOtp}
            className="font-semibold text-pink-600 hover:text-pink-800"
          >
            Resend
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 overflow-hidden sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gray-500 text-center hidden lg:flex">
          <div
            className="w-full bg-cover aspect-[6:8] bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/djiseih2h/image/upload/v1765183990/Gemini_Generated_Image_p9el73p9el73p9el_n9qfjg.png)",
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 md:w-8/12 sm:p-12">
          <div className="flex items-center">
            <Logo />
            <div className="ml-3 font-medium text-xl">Laxmi Customize</div>
          </div>
          <div className="mt-12 flex flex-col items-center">
            {step === "identifier" ? renderIdentifierStep() : renderOtpStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
