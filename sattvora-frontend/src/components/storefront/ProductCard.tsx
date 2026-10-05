import { useState } from "react"
import { Product } from "../../types"
import { useCart } from "../../context/CartContext"

interface ProductCardProps {
  product: Product
  onAdd?: () => void
  onView?: () => void
}

export function ProductCard({ product, onAdd, onView }: ProductCardProps) {
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = () => {
    if (onAdd) {
      onAdd()
    } else {
      addToCart(product)
    }

    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group hover:-translate-y-0.5">
      {/* Visual band */}
      <div
        className="relative h-48 flex flex-col items-center justify-center cursor-pointer"
        style={{
          background: `linear-gradient(145deg, ${product.color}bb, ${product.color}ff)`,
        }}
        onClick={onView}
      >
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#b8922a] text-white">
              Bestseller
            </span>
          </div>
        )}

        <div className="text-center px-4">
          <div
            className="font-display text-3xl font-bold"
            style={{ color: product.accentColor }}
          >
            {product.name}
          </div>

          <div className="text-sm font-semibold text-gray-700 tracking-widest mt-0.5">
            {product.subtitle}
          </div>

          <div
            className="text-lg mt-1"
            style={{
              color: product.accentColor,
              fontFamily: "serif",
            }}
          >
            {product.hindi}
          </div>
        </div>

        {/* View details overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-all duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
          <span className="text-xs bg-white/90 text-gray-700 px-3 py-1 rounded-full font-medium">
            View Details →
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold text-[#1a5c2e] uppercase tracking-wide">
          {product.tagline}
        </p>

        <p className="text-xs text-gray-500 mt-1 leading-relaxed flex-1">
          {product.description.split(".")[0]}.
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-400">
              {product.size}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onView}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#1a5c2e] text-[#1a5c2e] hover:bg-[#e8f5ec] transition-colors"
            >
              Details
            </button>

            <button
              onClick={handleAdd}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200"
              style={{
                background: "#1a5c2e",
                color: "white",
                transform: added ? "scale(0.95)" : "scale(1)",
                opacity: added ? 0.85 : 1,
              }}
            >
              {added ? "✓ Added" : "+ Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard