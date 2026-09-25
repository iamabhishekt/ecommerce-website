const TRUST_ITEMS = [
  "🌿 100% Ayurvedic Proprietary Medicine",
  "🚚 Free Delivery on Orders above ₹999",
  "⭐ 2,000+ Happy Customers",
  "🏭 Manufactured by Malik Pharmaceuticals, U.P.",
  "✅ AYUSH Certified Formulations",
  "🔒 Secure Checkout · Cash on Delivery Available",
  "📦 3–5 Day Pan-India Delivery",
]

export function MarqueeBar() {
  return (
    <div className="bg-[#1a5c2e] text-white py-2 overflow-hidden relative">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: "marquee 32s linear infinite" }}
      >
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
          <span
            key={i}
            className="text-xs font-medium tracking-wide text-[#b8e0c0] flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default MarqueeBar
