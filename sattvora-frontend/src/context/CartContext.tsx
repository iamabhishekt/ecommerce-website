import { createContext, useContext, ReactNode, useMemo, useState } from "react"
import { Product, CartItem } from "../types"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  openCart: () => void
  closeCart: () => void
  subtotal: number
  shippingCost: number
  total: number
  totalItemsCount: number
  freeShippingThreshold: number
  amountNeededForFreeShipping: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const FREE_SHIPPING_THRESHOLD = 999
const STANDARD_SHIPPING_COST = 79

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("sattvora_cart", [])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.sellingPrice * item.quantity,
      0,
    )
  }, [cart])

  const shippingCost =
    subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0
      ? 0
      : STANDARD_SHIPPING_COST
  const total = subtotal + shippingCost

  const totalItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD + 1 - subtotal,
  )

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
    subtotal,
    shippingCost,
    total,
    totalItemsCount,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
