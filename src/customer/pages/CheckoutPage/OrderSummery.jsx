const OrderSummary = ({
  items,
  mrpTotal,
  subTotal,
  shipping,
  taxPercent,
  tax,
  total,
}) => {
  return (
    <div className="bg-gray-50 p-6 lg:p-8 rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4">
            <img
              src={item.productImage}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-grow w-[70%] h-[100%] flex text-sm flex-col sm:flex-row sm:justify-between">
              <div className="flex-grow w-[60%]">
                <p
                  className="font-semibold text-gray-800 line-clamp-2"
                  title={item.productName}
                >
                  {item.productName}
                </p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-800 flex items-center sm:text-right ps-3 pe-4 mt-2 sm:mt-0 flex-shrink-0 line-through decoration-2 decoration-gray-600 ">
                ₹{item.productMrp.toFixed(2)}&nbsp;
              </p>
              <p className="text-green-800 font-bold flex items-center sm:text-right mt-2 sm:mt-0 flex-shrink-0">
                ₹{item.productSellPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t font-bold border-gray-200 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-800">MRP Total</span>
          <span className="text-pink-800">₹{mrpTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800">Discount</span>
          <span className="text-green-700">
            - ₹{(mrpTotal - subTotal).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span>Subtotal</span>
          <span>₹{subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-800">
          <span>Shipping</span>
          {shipping <= 0 ? (
            <span className="text-green-700">FREE</span>
          ) : (
            <span>₹{shipping.toFixed(2)}</span>
          )}
        </div>
        <div className="flex justify-between text-gray-800">
          <span>GST {taxPercent.toFixed(2)}%</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span className="text-green-800">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;