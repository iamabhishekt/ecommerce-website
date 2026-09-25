import logoImg from "../../imports/image-7.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  light?: boolean
}

export function Logo({ size = "md", light = false }: LogoProps) {
  const sizes = { sm: "h-8", md: "h-10", lg: "h-14" }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizes[size]} aspect-square overflow-hidden rounded-sm flex-shrink-0`}
        style={{ background: "#fff" }}
      >
        <img
          src={logoImg}
          alt="Sattvora Enterprises"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 38%",
            transform: "scale(1.15)",
            transformOrigin: "center 38%",
          }}
        />
      </div>
      <div className={size === "lg" ? "block" : "hidden sm:block"}>
        <div
          className="font-display font-bold leading-none"
          style={{
            fontSize: size === "lg" ? "1.5rem" : "1.1rem",
            color: light ? "#fff" : "#1a5c2e",
          }}
        >
          SATTVORA
        </div>
        <div
          className="tracking-[0.18em] font-medium"
          style={{
            fontSize: size === "lg" ? "0.7rem" : "0.55rem",
            color: light ? "#b8e0c0" : "#b8922a",
          }}
        >
          ENTERPRISES
        </div>
      </div>
    </div>
  )
}

export default Logo
