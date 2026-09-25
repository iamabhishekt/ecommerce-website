import { useState } from "react"
import { CartItem, ShippingInfo, Order } from "../../types"
import { fmt } from "../../utils/formatters"
import { Logo } from "../common/Logo"
import { useCart } from "../../context/CartContext"

const STEPS = ["Cart Review", "Shipping", "Payment", "Confirm"]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-[#1a5c2e] text-white"
                  : i === current
                    ? "bg-[#1a5c2e] text-white ring-4 ring-[#1a5c2e]/20"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs mt-1 hidden sm:block font-medium ${
                i === current
                  ? "text-[#1a5c2e]"
                  : i < current
                    ? "text-gray-500"
                    : "text-gray-300"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-8 sm:w-12 mx-1 mb-4 transition-all duration-500 ${
                i < current ? "bg-[#1a5c2e]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface CheckoutFlowProps {
  items?: CartItem[]
  onBack: () => void
  onComplete: (order: Order) => void
}

export function CheckoutFlow({
  items: propItems,
  onBack,
  onComplete,
}: CheckoutFlowProps) {
  const { cart: contextItems } = useCart()
  const items = propItems ?? contextItems

  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [cardNo, setCardNo] = useState("")
  const [cardExp, setCardExp] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const subtotal = items.reduce(
    (s, i) => s + i.product.sellingPrice * i.quantity,
    0,
  )
  const shippingCost = subtotal > 999 ? 0 : 79
  const total = subtotal + shippingCost
  const totalSavings = items.reduce(
    (s, i) => s + (i.product.mrp - i.product.sellingPrice) * i.quantity,
    0,
  )

  const handlePlaceOrder = () => {
    const order: Order = {
      id: "SV" + Date.now().toString().slice(-6),
      items: [...items],
      shipping,
      paymentMethod,
      subtotal,
      shippingCost,
      total,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: "Confirmed",
    }
    onComplete(order)
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5c2e]/25 focus:border-[#1a5c2e] transition-all bg-white placeholder:text-gray-300"
  const labelCls =
    "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide"

  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <StepIndicator current={step} />
          <button
            onClick={onBack}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ← Exit Checkout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Step Content */}
        <div className="lg:col-span-2">
          {/* Step 0: Cart Review */}
          {step === 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-display text-2xl text-gray-800 mb-1">
                Review Your Cart
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Step 1 of 4 · Confirm order items and quantities
              </p>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl items-center"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: item.product.color }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: item.product.accentColor }}
                      >
                        {item.product.name.slice(0, 5)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.product.subtitle} · {item.product.size}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        Batch: {item.product.batchNo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-[#1a5c2e]">
                        {fmt(item.product.sellingPrice * item.quantity)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity} × {fmt(item.product.sellingPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {shippingCost > 0 && (
                <div className="bg-[#fdf6e3] rounded-xl p-3.5 mb-6 flex items-center gap-3">
                  <span className="text-lg">🚚</span>
                  <div className="text-xs text-[#b8922a]">
                    <span className="font-semibold">
                      Standard Shipping: ₹79
                    </span>
                    <br />
                    Add {fmt(1000 - subtotal)} more to qualify for FREE
                    delivery.
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={onBack}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  ← Back to Store
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#2d7a42] transition-colors cursor-pointer"
                >
                  Continue to Shipping →
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Shipping Info */}
          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-display text-2xl text-gray-800 mb-1">
                Shipping Address
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Step 2 of 4 · Where should we send your Ayurvedic products?
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="e.g. Rahul Sharma"
                      value={shipping.name}
                      onChange={(e) =>
                        setShipping({ ...shipping, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <input
                      type="tel"
                      className={inputCls}
                      placeholder="10-digit mobile number"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Email Address *</label>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="order-updates@example.com"
                    value={shipping.email}
                    onChange={(e) =>
                      setShipping({ ...shipping, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className={labelCls}>Delivery Street Address *</label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="House/Flat No., Building, Street, Area"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>City *</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="e.g. Lucknow"
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>State *</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="e.g. Uttar Pradesh"
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({ ...shipping, state: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      className={inputCls}
                      placeholder="6-digit PIN"
                      value={shipping.pincode}
                      onChange={(e) =>
                        setShipping({ ...shipping, pincode: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={() => setStep(0)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  ← Back to Cart
                </button>
                <button
                  disabled={
                    !shipping.name ||
                    !shipping.phone ||
                    !shipping.address ||
                    !shipping.city ||
                    !shipping.pincode
                  }
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#2d7a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-display text-2xl text-gray-800 mb-1">
                Select Payment Method
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Step 3 of 4 · Choose your preferred secure payment mode
              </p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    id: "upi",
                    label: "UPI / QR Code",
                    icon: "📱",
                    sub: "Instant payment via GPay, PhonePe, Paytm, or BHIM",
                  },
                  {
                    id: "card",
                    label: "Credit / Debit Card",
                    icon: "💳",
                    sub: "Visa, MasterCard, RuPay, Maestro",
                  },
                  {
                    id: "cod",
                    label: "Cash on Delivery",
                    icon: "💵",
                    sub: "Pay with cash upon package receipt at your doorstep",
                  },
                  {
                    id: "netbanking",
                    label: "Net Banking",
                    icon: "🏦",
                    sub: "All major Indian banks supported",
                  },
                ].map(({ id, label, icon, sub }) => (
                  <label
                    key={id}
                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === id
                        ? "border-[#1a5c2e] bg-[#e8f5ec]/40 ring-1 ring-[#1a5c2e]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={() => setPaymentMethod(id)}
                      className="mt-1 accent-[#1a5c2e]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{icon}</span>
                        <span className="font-semibold text-sm text-gray-800">
                          {label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Conditional Payment Inputs */}
              {paymentMethod === "upi" && (
                <div className="p-4 bg-gray-50 rounded-xl mb-6">
                  <label className={labelCls}>Enter UPI ID / VPA</label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="username@okhdfcbank / mobile@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    A payment request will be sent to your UPI app.
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="p-4 bg-gray-50 rounded-xl space-y-3 mb-6">
                  <div>
                    <label className={labelCls}>Card Number</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="1234 5678 9012 3456"
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="MM/YY"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        className={inputCls}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  ← Back to Shipping
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#2d7a42] transition-colors cursor-pointer"
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation Summary */}
          {step === 3 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-display text-2xl text-gray-800 mb-1">
                Confirm &amp; Place Order
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Step 4 of 4 · Final review before dispatch
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Delivery Address
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {shipping.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {shipping.address}, {shipping.city}, {shipping.state} –{" "}
                    {shipping.pincode}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Phone: {shipping.phone} · Email: {shipping.email}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Payment Mode
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {paymentMethod === "cod"
                      ? "Cash on Delivery (Pay at Doorstep)"
                      : paymentMethod.toUpperCase()}
                  </p>
                </div>

                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                    Order Items ({items.length})
                  </p>
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm py-1.5 border-b border-gray-50"
                    >
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-mono font-medium">
                        {fmt(item.product.sellingPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 rounded-xl bg-[#1a5c2e] text-white font-bold hover:bg-[#2d7a42] transition-colors text-sm cursor-pointer"
                  >
                    Place Order · {fmt(total)}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-4">
            <h3 className="font-semibold text-sm text-gray-700 mb-3">
              Order Summary
            </h3>
            <div className="space-y-2 mb-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0"
                    style={{ background: item.product.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-600">
                    {fmt(item.product.sellingPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono">
                  {shippingCost === 0 ? (
                    <span className="text-[#1a5c2e] font-semibold">Free</span>
                  ) : (
                    fmt(shippingCost)
                  )}
                </span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[#1a5c2e]">
                  <span>You save</span>
                  <span className="font-mono font-semibold">
                    −{fmt(totalSavings)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-gray-800 pt-1.5 border-t border-gray-100">
                <span>Total</span>
                <span className="font-mono text-[#1a5c2e]">{fmt(total)}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#e8f5ec] rounded-xl">
              <p className="text-xs text-[#1a5c2e] font-medium">
                🌿 Ayurvedic Proprietary Medicine
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Mfg. by Malik Pharmaceuticals, U.P.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-gray-300 text-xs">
              <span>🔒 Secure</span>
              <span>·</span>
              <span>🚚 Fast Delivery</span>
              <span>·</span>
              <span>✅ AYUSH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutFlow
