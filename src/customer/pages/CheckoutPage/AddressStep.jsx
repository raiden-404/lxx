import { MapPinHouse, Pencil } from "lucide-react";


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

const AddressStep = ({
  formData,
  savedAddresses,
  handleChange,
  nextStep,
  isAddingNew,
  setIsAddingNew,
  handleUseCurrentLocation,
  handleEditAddress,
}) => {
  const { newAddress } = formData;
  const formIsValid =
    newAddress.email &&
    newAddress.fullName &&
    newAddress.address &&
    newAddress.city &&
    newAddress.zipCode;
  const canProceed = !isAddingNew || formIsValid;
  const AddressForm = () => (
    <div className="space-y-4 mt-4 animate-fade-in">
      <button
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center justify-center gap-2 text-pink-600 font-semibold border-2 border-pink-200 bg-pink-50 rounded-lg py-2.5 mb-2 hover:bg-pink-100 transition-colors"
      >
        <MapPinHouse />
        Use Current Location
      </button>
      <InputField
        name="email"
        value={newAddress.email}
        onChange={handleChange}
        label="Email Address"
        placeholder="you@example.com"
      />
      <InputField
        name="fullName"
        value={newAddress.fullName}
        onChange={handleChange}
        label="Full Name"
        placeholder="John Doe"
      />
      <InputField
        name="address"
        value={newAddress.address}
        onChange={handleChange}
        label="Address"
        placeholder="123 Main St"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="city"
          value={newAddress.city}
          onChange={handleChange}
          label="City"
          placeholder="Anytown"
        />
        <InputField
          name="zipCode"
          value={newAddress.zipCode}
          onChange={handleChange}
          label="ZIP Code"
          placeholder="12345"
        />
      </div>
      <InputField
        name="phone"
        value={newAddress.phone}
        onChange={handleChange}
        label="Phone (Optional)"
        placeholder="+1 (555) 123-4567"
      />
      {savedAddresses.length > 0 && (
        <button
          onClick={() => setIsAddingNew(false)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          &larr; Back to saved addresses
        </button>
      )}
    </div>
  );

  return (
    // <----Debugger------------------------------------------------------------------
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping Address
      </h2>

      {!isAddingNew ? (
        <div className="space-y-4">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex items-start p-4 border rounded-lg transition-all ${
                formData.selectedAddressId === addr.id
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300"
              }`}
            >
              <label className="flex-grow flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddressId"
                  value={addr.id}
                  checked={formData.selectedAddressId === addr.id}
                  onChange={handleChange}
                  className="h-5 w-5 mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{addr.fullName}</p>
                  <p className="text-sm text-gray-600">
                    {addr.address}, {addr.city}, {addr.zipCode}
                  </p>
                </div>
              </label>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAddress(addr.id);
                }}
                className="ml-4 p-2 text-gray-500 hover:text-blue-600"
              >
                <Pencil />
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full text-blue-600 font-semibold border-2 border-blue-500 rounded-lg py-2 mt-4 hover:bg-blue-50 transition-colors"
          >
            + Add a New Address
          </button>
        </div>
      ) : (
        <AddressForm />
      )}

      <button
        onClick={nextStep}
        disabled={!canProceed}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-8 hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>
    </div>
  );
};
export default AddressStep;