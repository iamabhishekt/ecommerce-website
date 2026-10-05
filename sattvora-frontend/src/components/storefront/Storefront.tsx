import { useState } from "react"
import { Product, CartItem } from "../../types"
import { fmt, discount } from "../../utils/formatters"
import { Logo } from "../common/Logo"
import { MarqueeBar } from "../common/MarqueeBar"
import { ProductCard } from "./ProductCard"
import { ProductDetailModal } from "./ProductDetailModal"
import { useCart } from "../../context/CartContext"
import { useProducts } from "../../context/ProductContext"

const categoryIcons: Record<string, string> = {
  All: "🌿",
  "Liver Health": "🫀",
  "Women's Health": "🌸",
  Immunity: "🛡️",
  "Kidney Health": "💧",
  "Skin Health": "✨",
  "Brain Health": "🧠",
}

interface StorefrontProps {
  products?: Product[]
  cart?: CartItem[]
  onAdd?: (product: Product) => void
  onCartOpen?: () => void
  onAdminOpen?: () => void
}

export function Storefront({
  products: propProducts,
  cart: propCart,
  onAdd: propOnAdd,
  onCartOpen: propOnCartOpen,
  onAdminOpen: propOnAdminOpen,
}: StorefrontProps) {
  const { products: contextProducts, openAdmin } = useProducts()
  const { cart: contextCart, addToCart, openCart, totalItemsCount } = useCart()

  const products = propProducts ?? contextProducts
  const onAdd = propOnAdd ?? addToCart
  const onCartOpen = propOnCartOpen ?? openCart
  const onAdminOpen = propOnAdminOpen ?? openAdmin
  const cartCount = propCart
    ? propCart.reduce((s, i) => s + i.quantity, 0)
    : totalItemsCount

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [viewProduct, setViewProduct] = useState<Product | null>(null)

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ]

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch && p.inStock
  })

  const featured = products.filter((p) => p.featured && p.inStock)

  return (
    <div className="min-h-full bg-[#f8faf8]">
      {/* Marquee */}
      <MarqueeBar />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Logo size="md" />
          <div className="flex-1 max-w-sm mx-4">
            <input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5c2e]/25 focus:border-[#1a5c2e] bg-gray-50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onAdminOpen}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#b8922a] text-[#b8922a] hover:bg-[#fdf6e3] transition-colors font-medium hidden sm:block cursor-pointer"
            >
              Distributor Panel
            </button>
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a5c2e] text-white text-sm font-semibold hover:bg-[#2d7a42] transition-colors cursor-pointer"
            >
              <span>🛒</span>
              <span className="hidden sm:block">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#b8922a] text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — editorial split layout */}
      <div className="bg-[#1a5c2e] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left — 3 cols */}
          <div className="lg:col-span-3">
            <p className="text-[#6baa82] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Ayurvedic Proprietary Medicine · Sattvora Enterprises
            </p>
            <h1 className="font-display text-5xl sm:text-6xl leading-tight mb-4">
              Nature's Wisdom.
              <br />
              <span className="text-[#b8e0c0]">Modern Wellness.</span>
            </h1>
            <p className="text-[#a8d4b4] text-base max-w-md leading-relaxed mb-6">
              Time-tested Ayurvedic formulas crafted to support liver, kidney,
              skin, immunity, and women's health — all under one roof.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-xl bg-[#b8922a] text-white font-semibold hover:bg-[#d4a93c] transition-colors text-sm cursor-pointer"
              >
                Shop Now →
              </button>
              <button
                onClick={onAdminOpen}
                className="px-6 py-3 rounded-xl border border-white/30 text-white/80 hover:bg-white/10 transition-colors text-sm font-medium cursor-pointer"
              >
                Distributor Login
              </button>
            </div>
          </div>

          {/* Right — stats block */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {[
              {
                stat: "6+",
                label: "Formulations",
                sub: "Liver to Brain Health",
              },
              { stat: "2000+", label: "Customers", sub: "Pan-India" },
              { stat: "100%", label: "Ayurvedic", sub: "AYUSH Certified" },
              { stat: "₹449", label: "Starting at", sub: "Honest pricing" },
            ].map(({ stat, label, sub }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
              >
                <div className="font-display text-3xl text-[#b8e0c0]">
                  {stat}
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {label}
                </div>
                <div className="text-xs text-[#6baa82] mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured / Bestsellers strip */}
      {featured.length > 0 && (
        <div className="bg-[#fdf6e3] border-y border-[#b8922a]/20 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-[#b8922a]/20" />
              <p className="text-xs font-bold text-[#b8922a] tracking-[0.2em] uppercase">
                ⭐ Bestsellers
              </p>
              <div className="h-px flex-1 bg-[#b8922a]/20" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {featured.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#b8922a]/15 hover:border-[#b8922a]/40 cursor-pointer transition-all shadow-sm"
                  onClick={() => setViewProduct(p)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: p.color }}
                  >
                    <span
                      className="font-bold text-center"
                      style={{ color: p.accentColor, fontSize: "0.42rem" }}
                    >
                      {p.name}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <div className="ml-2 text-right">
                    <p className="text-sm font-bold text-[#b8922a] font-mono">
                      {fmt(p.sellingPrice)}
                    {/* </p>
                    {p.mrp !== p.sellingPrice && (
                      <p className="text-xs text-[#1a5c2e] font-medium">
                        {discount(p.mrp, p.sellingPrice)}% off
                      </p> 
                    )}  */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category filter + Products */}
      <div id="products" className="max-w-6xl mx-auto px-4 py-8">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                category === c
                  ? "bg-[#1a5c2e] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1a5c2e] hover:text-[#1a5c2e]"
              }`}
            >
              <span className="text-sm">{categoryIcons[c] || "🌱"}</span>
              {c}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl text-gray-800">
            {category === "All" ? "All Products" : category}
          </h2>
          <span className="text-sm text-gray-400">
            {filtered.length} products
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <p className="text-4xl mb-3">🌿</p>
            <p className="font-display text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={() => onAdd(p)}
                onView={() => setViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trust section */}
      <div className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#b8922a] tracking-[0.2em] uppercase mb-2">
              Why Choose Sattvora
            </p>
            <h2 className="font-display text-3xl text-gray-800">
              Ayurveda You Can Trust
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🌿",
                title: "Pure Ingredients",
                desc: "Carefully sourced herbs from trusted farms across India",
              },
              {
                icon: "🏭",
                title: "GMP Certified",
                desc: "Manufactured under strict quality standards by Malik Pharmaceuticals",
              },
              {
                icon: "✅",
                title: "AYUSH Certified",
                desc: "All formulations are approved and compliant with AYUSH standards",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Pan-India delivery in 3–5 business days with order tracking",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-5 rounded-2xl bg-[#f8faf8] border border-gray-100"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#1a5c2e] px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <Logo size="md" light />
            <div className="flex gap-6 text-xs text-[#6baa82]">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Shipping Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 text-center">
            <p className="text-xs text-[#6baa82]">
              Sattvora Enterprises · Distributed Ayurvedic Products by Malik
              Pharmaceuticals, Saharapur, U.P.
            </p>
            <p className="text-xs text-[#4d8a62] mt-1">
              Mfg. Lic. No.: A-4309/2011 · All products are Ayurvedic
              Proprietary Medicine · © 2025
            </p>
          </div>
        </div>
      </footer>

      {viewProduct && (
        <ProductDetailModal
          product={viewProduct}
          onClose={() => setViewProduct(null)}
          onAdd={() => {
            onAdd(viewProduct)
            setViewProduct(null)
          }}
        />
      )}
    </div>
  )
}

export default Storefront
