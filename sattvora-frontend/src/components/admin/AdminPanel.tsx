import { useState } from "react"
import { Product } from "../../types"
import { fmt } from "../../utils/formatters"
import { Logo } from "../common/Logo"
import { useProducts } from "../../context/ProductContext"

interface AdminPanelProps {
  products?: Product[]
  onUpdate?: (product: Product) => void
  onAdd?: (product: Product) => void
  onClose?: () => void
}

export function AdminPanel({
  products: propProducts,
  onUpdate: propOnUpdate,
  onAdd: propOnAddProduct,
  onClose: propOnClose,
}: AdminPanelProps) {
  const contextProducts = useProducts()
  const products = propProducts ?? contextProducts.products
  const onUpdate = propOnUpdate ?? contextProducts.updateProduct
  const onAddProduct = propOnAddProduct ?? contextProducts.addProduct
  const onClose = propOnClose ?? contextProducts.closeAdmin

  const [tab, setTab] = useState<"products" | "add">("products")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    subtitle: "SYRUP",
    hindi: "",
    tagline: "",
    description: "",
    size: "500 ml",
    mrp: 0,
    costPrice: 0,
    markup: 20,
    sellingPrice: 0,
    category: "",
    color: "#e8f5ec",
    accentColor: "#1a5c2e",
    batchNo: "",
    mfgDate: "",
    expiry: "3 Yrs. from mfg.",
    licNo: "A-4309/2011",
    composition: [],
    inStock: true,
    featured: false,
  })

  const totalProfit = products.reduce(
    (s, p) => s + (p.sellingPrice - p.costPrice),
    0,
  )
  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a5c2e]/25 focus:border-[#1a5c2e] bg-white"

  const EditRow = ({ product }: { product: Product }) => {
    const [local, setLocal] = useState({ ...product })
    const computedSell = Math.round(local.costPrice * (1 + local.markup / 100))

    return (
      <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex-shrink-0"
              style={{ background: local.color }}
            />
            <div>
              <p className="font-semibold text-sm">{local.name}</p>
              <p className="text-xs text-gray-400">{local.category}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <input
            type="number"
            value={local.costPrice}
            onChange={(e) =>
              setLocal({ ...local, costPrice: Number(e.target.value) })
            }
            className="w-24 px-2 py-1 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1a5c2e]"
          />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={local.markup}
              onChange={(e) =>
                setLocal({ ...local, markup: Number(e.target.value) })
              }
              className="w-16 px-2 py-1 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1a5c2e]"
            />
            <span className="text-xs text-gray-400">%</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <input
            type="number"
            value={local.mrp}
            onChange={(e) =>
              setLocal({ ...local, mrp: Number(e.target.value) })
            }
            className="w-24 px-2 py-1 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1a5c2e]"
          />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={local.sellingPrice}
              onChange={(e) =>
                setLocal({ ...local, sellingPrice: Number(e.target.value) })
              }
              className="w-24 px-2 py-1 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#1a5c2e]"
              placeholder={String(computedSell)}
            />
            <button
              onClick={() => setLocal({ ...local, sellingPrice: computedSell })}
              className="text-xs text-[#1a5c2e] hover:underline whitespace-nowrap cursor-pointer"
            >
              auto
            </button>
          </div>
        </td>
        <td className="px-4 py-3">
          <div
            className={`text-sm font-mono font-semibold ${
              local.sellingPrice - local.costPrice > 0
                ? "text-[#1a5c2e]"
                : "text-red-500"
            }`}
          >
            {fmt(local.sellingPrice - local.costPrice)}
          </div>
          <div className="text-xs text-gray-400">
            {local.costPrice > 0
              ? (
                  ((local.sellingPrice - local.costPrice) / local.costPrice) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate({ ...local })}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#1a5c2e] text-white hover:bg-[#2d7a42] transition-colors font-medium cursor-pointer"
            >
              Save
            </button>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={local.inStock}
                onChange={(e) => {
                  const u = { ...local, inStock: e.target.checked }
                  setLocal(u)
                  onUpdate(u)
                }}
                className="accent-[#1a5c2e]"
              />
              <span className="text-xs text-gray-500">Stock</span>
            </label>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f8faf8] overflow-y-auto">
      <div className="bg-[#1a5c2e] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" light />
          <div className="h-6 w-px bg-white/30" />
          <span className="font-semibold text-sm">Distributor Panel</span>
        </div>
        <button
          onClick={onClose}
          className="text-sm text-white/70 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          ← Back to Store
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Products",
              value: products.length,
              sub: `${products.filter((p) => p.inStock).length} in stock`,
            },
            {
              label: "Avg. Markup",
              value: `${(products.reduce((s, p) => s + p.markup, 0) / products.length).toFixed(1)}%`,
              sub: "across all products",
            },
            {
              label: "Total MRP Value",
              value: fmt(products.reduce((s, p) => s + p.mrp, 0)),
              sub: "per unit combined",
            },
            {
              label: "Total Profit/Unit",
              value: fmt(totalProfit),
              sub: `on ${fmt(products.reduce((s, p) => s + p.costPrice, 0))} cost`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="font-display text-2xl text-[#1a5c2e] mt-0.5">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {(["products", "add"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                tab === t
                  ? "bg-[#1a5c2e] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#1a5c2e]"
              }`}
            >
              {t === "products" ? "Manage Products" : "+ Add New Product"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">
                Product Pricing &amp; Management
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Edit cost price, markup %, MRP, and selling price. Profit is
                calculated automatically.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Cost Price</th>
                    <th className="px-4 py-3 text-left">Markup</th>
                    <th className="px-4 py-3 text-left">MRP</th>
                    <th className="px-4 py-3 text-left">Sell Price</th>
                    <th className="px-4 py-3 text-left">Profit</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <EditRow key={p.id} product={p} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "add" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              Add New Product
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  label: "Product Name",
                  key: "name",
                  placeholder: "LIVLIK-DS",
                },
                { label: "Subtitle", key: "subtitle", placeholder: "SYRUP" },
                {
                  label: "Hindi Name",
                  key: "hindi",
                  placeholder: "लिवलिक सीरप",
                },
                {
                  label: "Category",
                  key: "category",
                  placeholder: "Liver Health",
                },
                {
                  label: "Tagline",
                  key: "tagline",
                  placeholder: "Comprehensive Liver Health Formula",
                },
                { label: "Size", key: "size", placeholder: "500 ml" },
                { label: "Batch No.", key: "batchNo", placeholder: "MP 302" },
                { label: "Mfg. Date", key: "mfgDate", placeholder: "JUN-29" },
                {
                  label: "License No.",
                  key: "licNo",
                  placeholder: "A-4309/2011",
                },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {label}
                  </label>
                  <input
                    className={inputCls}
                    placeholder={placeholder}
                    value={
                      (newProduct as Record<string, unknown>)[key] as string ||
                      ""
                    }
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
              {[
                { label: "Cost Price (₹)", key: "costPrice" },
                { label: "Markup %", key: "markup" },
                { label: "MRP (₹)", key: "mrp" },
                { label: "Selling Price (₹)", key: "sellingPrice" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    className={inputCls}
                    value={
                      (newProduct as Record<string, unknown>)[key] as number ||
                      ""
                    }
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        [key]: Number(e.target.value),
                      })
                    }
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Card Color
                </label>
                <input
                  type="color"
                  value={newProduct.color || "#e8f5ec"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, color: e.target.value })
                  }
                  className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Accent Color
                </label>
                <input
                  type="color"
                  value={newProduct.accentColor || "#1a5c2e"}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      accentColor: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Description
              </label>
              <textarea
                className={`${inputCls} resize-none h-20`}
                placeholder="Product description..."
                value={newProduct.description || ""}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            {newProduct.costPrice !== undefined &&
            newProduct.sellingPrice !== undefined &&
            newProduct.costPrice > 0 &&
            newProduct.sellingPrice > 0 ? (
              <div className="mt-4 p-3 bg-[#e8f5ec] rounded-xl text-sm text-[#1a5c2e]">
                Profit:{' '}
                <strong>
                  {fmt(
                    Number(newProduct.sellingPrice) - Number(newProduct.costPrice)
                  )}
                </strong>{' '}
                (
                {(
                  ((Number(newProduct.sellingPrice) -
                    Number(newProduct.costPrice)) /
                    Number(newProduct.costPrice)) *
                  100
                ).toFixed(1)}
                % margin)
              </div>
            ) : (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-400">
                Enter cost price and selling price to see profit
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  if (!newProduct.name || !newProduct.costPrice) return
                  const product: Product = {
                    id:
                      newProduct.name!.toLowerCase().replace(/\s+/g, "-") +
                      "-" +
                      Date.now(),
                    name: newProduct.name || "",
                    subtitle: newProduct.subtitle || "SYRUP",
                    hindi: newProduct.hindi || "",
                    tagline: newProduct.tagline || "",
                    description: newProduct.description || "",
                    size: newProduct.size || "500 ml",
                    mrp: newProduct.mrp as number || 0,
                    costPrice: newProduct.costPrice as number || 0,
                    markup: newProduct.markup as number || 20,
                    sellingPrice: newProduct.sellingPrice as number || 0,
                    category: newProduct.category || "General",
                    color: newProduct.color || "#e8f5ec",
                    accentColor: newProduct.accentColor || "#1a5c2e",
                    batchNo: newProduct.batchNo || "",
                    mfgDate: newProduct.mfgDate || "",
                    expiry: newProduct.expiry || "3 Yrs. from mfg.",
                    licNo: newProduct.licNo || "A-4309/2011",
                    composition: [],
                    inStock: true,
                    featured: false,
                  }
                  onAddProduct(product)
                  setTab("products")
                }}
                className="px-6 py-3 rounded-xl bg-[#1a5c2e] text-white font-semibold text-sm hover:bg-[#2d7a42] transition-colors cursor-pointer"
              >
                Add Product
              </button>
              <button
                onClick={() => setTab("products")}
                className="px-6 py-3 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
