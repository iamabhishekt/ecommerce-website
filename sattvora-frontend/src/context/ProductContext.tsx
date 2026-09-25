import { createContext, useContext, ReactNode, useState } from "react"
import { Product } from "../types"
import { initialProducts } from "../data"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface ProductContextType {
  products: Product[]
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  isAdminOpen: boolean
  setIsAdminOpen: (open: boolean) => void
  openAdmin: () => void
  closeAdmin: () => void
  updateProduct: (updated: Product) => void
  addProduct: (product: Product) => void
  getProductById: (id: string) => Product | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "sattvora_products",
    initialProducts,
  )
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated)
    }
  }

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct])
  }

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id)
  }

  const openAdmin = () => setIsAdminOpen(true)
  const closeAdmin = () => setIsAdminOpen(false)

  const value = {
    products,
    selectedProduct,
    setSelectedProduct,
    isAdminOpen,
    setIsAdminOpen,
    openAdmin,
    closeAdmin,
    updateProduct,
    addProduct,
    getProductById,
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export function useProducts(): ProductContextType {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
