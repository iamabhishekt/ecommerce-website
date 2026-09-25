import { Order } from "../../types"
import { fmt } from "../../utils/formatters"

interface OrderConfirmationProps {
  order: Order
  onContinue: () => void
}

export function OrderConfirmation({
  order,
  onContinue,
}: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        <div className="w-20 h-20 rounded-full bg-[#e8f5ec] flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="font-display text-3xl text-[#1a5c2e] mb-1">
          Order Confirmed!
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for choosing Sattvora Enterprises
        </p>

        <div className="bg-[#fdf6e3] rounded-xl p-4 mb-4 text-left space-y-2">
          {[
            { label: "Order ID", value: `#${order.id}`, mono: true },
            { label: "Date", value: order.date },
            { label: "Total", value: fmt(order.total), mono: true },
            {
              label: "Payment",
              value:
                order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod.toUpperCase(),
            },
          ].map(({ label, value, mono }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-400">{label}</span>
              <span
                className={`font-semibold ${
                  mono ? "font-mono text-[#1a5c2e]" : ""
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-[#e8f5ec] rounded-xl p-4 text-left mb-6">
          <p className="text-xs font-bold text-[#1a5c2e] mb-1 uppercase tracking-wide">
            Delivering to
          </p>
          <p className="text-sm font-semibold">{order.shipping.name}</p>
          <p className="text-xs text-gray-500">
            {order.shipping.address}, {order.shipping.city}
          </p>
        </div>

        <div className="text-sm text-gray-400 mb-6">
          Estimated delivery:{" "}
          <strong className="text-gray-600">3–5 business days</strong>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-xl bg-[#1a5c2e] text-white font-semibold hover:bg-[#2d7a42] transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation
