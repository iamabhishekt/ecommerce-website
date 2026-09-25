import { CartItem } from "../../types"
import { fmt } from "../../utils/formatters"
import { useCart } from "../../context/CartContext"

interface CartSidebarProps {
  items?: CartItem[]
  onUpdate?: (id: string, qty: number) => void
  onClose?: () => void
  onCheckout: () => void
}

export function CartSidebar({
  items: propItems,
  onUpdate: propOnUpdate,
  onClose: propOnClose,
  onCheckout,
}: CartSidebarProps) {
  const cartContext = useCart()

  const items = propItems ?? cartContext.cart
  const onUpdate = propOnUpdate ?? cartContext.updateQuantity
  const onClose = propOnClose ?? cartContext.closeCart

  const subtotal = propItems
    ? items.reduce((s, i) => s + i.product.sellingPrice * i.quantity, 0)
    : cartContext.subtotal

  const shipping = propItems
    ? subtotal > 999
      ? 0
      : 79
    : cartContext.shippingCost

  const total = subtotal + shipping

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl text-[#1a1a1a]">Your Cart</h2>
            <p className="text-xs text-gray-400">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-16">
              <div className="text-5xl mb-3">🌿</div>
              <p className="font-display text-lg">Your cart is empty</p>
              <p className="text-sm mt-1">
                Browse our Ayurvedic range to get started.
              </p>
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: item.product.color }}
              >
                <span
                  className="text-xs font-bold text-center"
                  style={{
                    color: item.product.accentColor,
                    fontSize: "0.5rem",
                  }}
                >
                  {item.product.name.slice(0, 4)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-400">{item.product.size}</p>
                <p className="text-sm font-medium text-[#b8922a]">
                  {fmt(item.product.sellingPrice)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdate(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xs transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdate(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md bg-[#e8f5ec] hover:bg-[#d0ead5] flex items-center justify-center text-xs text-[#1a5c2e] transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-mono text-gray-500">
                  {fmt(item.product.sellingPrice * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 space-y-3">
            {shipping > 0 && (
              <div className="bg-[#fdf6e3] rounded-lg px-3 py-2 flex items-center gap-2">
                <span className="text-xs text-[#b8922a]">🚚</span>
                <span className="text-xs text-[#b8922a]">
                  Add {fmt(1000 - subtotal)} more for free shipping
                </span>
              </div>
            )}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-mono">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-mono">
                  {shipping === 0 ? (
                    <span className="text-[#1a5c2e]">Free</span>
                  ) : (
                    fmt(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-1 border-t border-gray-100">
                <span>Total</span>
                <span className="font-mono text-[#1a5c2e]">{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold hover:bg-[#2d7a42] transition-colors"
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
