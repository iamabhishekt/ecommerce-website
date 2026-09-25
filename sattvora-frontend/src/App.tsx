import { useState } from "react"
import { Order } from "./types"
import { ProductProvider, useProducts } from "./context/ProductContext"
import { CartProvider, useCart } from "./context/CartContext"
import { Storefront } from "./components/storefront/Storefront"
import { CartSidebar } from "./components/cart/CartSidebar"
import { CheckoutFlow } from "./components/checkout/CheckoutFlow"
import { OrderConfirmation } from "./components/order/OrderConfirmation"
import { AdminPanel } from "./components/admin/AdminPanel"

type AppView = "store" | "checkout" | "confirmation"

function AppContent() {
  const [view, setView] = useState<AppView>("store")
  const [order, setOrder] = useState<Order | null>(null)

  const { isCartOpen, setIsCartOpen, clearCart } = useCart()
  const { isAdminOpen, setIsAdminOpen } = useProducts()

  const handleOrderComplete = (newOrder: Order) => {
    setOrder(newOrder)
    clearCart()
    setView("confirmation")
  }

  const handleContinueShopping = () => {
    setOrder(null)
    setView("store")
  }

  if (view === "checkout") {
    return (
      <CheckoutFlow
        onBack={() => setView("store")}
        onComplete={handleOrderComplete}
      />
    )
  }

  if (view === "confirmation" && order) {
    return (
      <OrderConfirmation order={order} onContinue={handleContinueShopping} />
    )
  }

  return (
    <>
      <Storefront />

      {isCartOpen && (
        <CartSidebar
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false)
            setView("checkout")
          }}
        />
      )}

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </>
  )
}

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ProductProvider>
  )
}
