import { Product } from "../../types"
import { fmt, discount } from "../../utils/formatters"
import { useCart } from "../../context/CartContext"

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
  onAdd?: () => void
}

export function ProductDetailModal({
  product,
  onClose,
  onAdd,
}: ProductDetailModalProps) {
  const { addToCart } = useCart()
  const disc = discount(product.mrp, product.sellingPrice)

  const handleAdd = () => {
    if (onAdd) {
      onAdd()
    } else {
      addToCart(product)
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-8 flex items-start justify-between"
          style={{
            background: `linear-gradient(145deg, ${product.color}88, ${product.color}cc)`,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              {product.featured && (
                <span className="text-xs bg-[#b8922a] text-white px-2 py-0.5 rounded-full font-semibold">
                  Bestseller
                </span>
              )}
              {disc > 0 && (
                <span className="text-xs bg-[#1a5c2e] text-white px-2 py-0.5 rounded-full font-semibold">
                  {disc}% OFF
                </span>
              )}
            </div>
            <div
              className="font-display text-4xl font-bold"
              style={{ color: product.accentColor }}
            >
              {product.name}
            </div>
            <div className="text-lg font-semibold text-gray-700 tracking-widest mt-1">
              {product.subtitle}
            </div>
            <div
              className="text-xl mt-1"
              style={{ color: product.accentColor, fontFamily: "serif" }}
            >
              {product.hindi}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-600 text-lg transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[#1a5c2e] text-sm uppercase tracking-wide mb-2">
              About this Formula
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Ayurvedic Proprietary Medicine · {product.size}
            </p>

            <div className="mt-4 p-4 bg-[#e8f5ec] rounded-xl">
              <div className="text-sm font-semibold text-[#1a5c2e] mb-2">
                Batch Information
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 font-mono">
                <span className="text-gray-400">Batch No.</span>
                <span>{product.batchNo}</span>
                <span className="text-gray-400">Mfg. Date</span>
                <span>{product.mfgDate}</span>
                <span className="text-gray-400">Expiry</span>
                <span>{product.expiry}</span>
                <span className="text-gray-400">Lic. No.</span>
                <span>{product.licNo}</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#fdf6e3] rounded-xl border border-[#b8922a]/20">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500">Selling Price</span>
                  <div className="font-display text-2xl text-[#b8922a]">
                    {fmt(product.sellingPrice)}
                  </div>
                </div>
                {disc > 0 && (
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through">
                      MRP {fmt(product.mrp)}
                    </span>
                    <div className="text-sm font-bold text-[#1a5c2e]">
                      Save {fmt(product.mrp - product.sellingPrice)}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Inclusive of all taxes (I.A.T.)
              </p>
              <p className="text-xs text-gray-400">
                Dosage: As directed by the physician.
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="mt-4 w-full py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#2d7a42] transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a5c2e] text-sm uppercase tracking-wide mb-2">
              Composition — Each 10 ml Contains
            </h3>
            <div className="space-y-1.5">
              {product.composition.map((c) => (
                <div
                  key={c.herb}
                  className="flex justify-between text-xs py-1.5 border-b border-gray-100"
                >
                  <span className="text-gray-700 italic">{c.herb}</span>
                  <span className="font-mono text-gray-500 tabular-nums">
                    {c.qty}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-xs py-1.5">
                <span className="text-gray-700 italic">
                  Flavored Syrupy Base
                </span>
                <span className="font-mono text-gray-500">q.s.</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400 space-y-0.5">
              <p>Storage: Store in a cool, dark &amp; dry place.</p>
              <p>Do not freeze.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
