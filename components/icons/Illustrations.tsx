// Lightweight inline SVG placeholders in the Fresh Fields palette.
// Swap the <img>/<Image> usage sites for real photography later — see README.

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration of fresh vegetables"
    >
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c3f21" />
          <stop offset="100%" stopColor="#3a7d42" />
        </linearGradient>
        <linearGradient id="heroLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8bc34a" />
          <stop offset="100%" stopColor="#549425" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#heroBg)" />
      <circle cx="150" cy="120" r="220" fill="#ffffff" opacity="0.04" />
      <circle cx="1080" cy="600" r="260" fill="#ffffff" opacity="0.05" />
      <g opacity="0.9">
        <ellipse cx="420" cy="430" rx="260" ry="150" fill="url(#heroLeaf)" />
        <path
          d="M420 300 C 460 340, 460 400, 420 440 C 380 400, 380 340, 420 300 Z"
          fill="#eef6ee"
          opacity="0.15"
        />
        <ellipse cx="700" cy="410" rx="150" ry="130" fill="#ff9e2c" />
        <ellipse cx="850" cy="460" rx="90" ry="80" fill="#e53935" />
        <path d="M850 380 q20 -30 45 -20 q-10 30 -45 20 Z" fill="#549425" />
      </g>
    </svg>
  );
}

export function StoryIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration of the Fresh Fields storefront"
    >
      <defs>
        <linearGradient id="storyBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d7ead8" />
          <stop offset="100%" stopColor="#b0d5b2" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#storyBg)" />
      <rect x="120" y="220" width="560" height="280" rx="12" fill="#faf8f2" />
      <rect x="150" y="260" width="180" height="180" rx="8" fill="#3a7d42" />
      <rect x="350" y="260" width="300" height="60" rx="6" fill="#82ba86" />
      <rect x="350" y="340" width="240" height="24" rx="6" fill="#b0d5b2" />
      <rect x="350" y="380" width="200" height="24" rx="6" fill="#b0d5b2" />
      <circle cx="240" cy="350" r="46" fill="#ff9e2c" />
      <rect x="120" y="500" width="560" height="16" fill="#245029" />
    </svg>
  );
}

export function BannerIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration of a delivery crate of vegetables"
    >
      <defs>
        <linearGradient id="bannerBg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#245029" />
          <stop offset="100%" stopColor="#579a5e" />
        </linearGradient>
      </defs>
      <rect width="1200" height="400" fill="url(#bannerBg)" />
      <g opacity="0.95">
        <rect x="470" y="200" width="260" height="140" rx="10" fill="#f5810a" />
        <rect x="470" y="200" width="260" height="24" fill="#c96706" />
        <circle cx="540" cy="190" r="34" fill="#e53935" />
        <circle cx="600" cy="180" r="40" fill="#8bc34a" />
        <circle cx="660" cy="195" r="30" fill="#ffb84d" />
      </g>
    </svg>
  );
}

const categoryPalette: Record<string, [string, string]> = {
  leafy: ["#8bc34a", "#3a7d42"],
  root: ["#ffb84d", "#f5810a"],
  vegetable: ["#6cb32e", "#245029"],
  default: ["#82ba86", "#3a7d42"],
};

export function VegPlaceholder({
  category = "default",
  className = "",
}: {
  category?: string;
  className?: string;
}) {
  const [from, to] = categoryPalette[category] ?? categoryPalette.default;
  return (
    <svg viewBox="0 0 300 240" className={className} role="presentation">
      <defs>
        <linearGradient id={`veg-${category}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill={`url(#veg-${category})`} opacity="0.16" />
      <circle cx="150" cy="120" r="58" fill={`url(#veg-${category})`} />
      <path
        d="M150 62 C 168 78, 172 100, 158 118 C 144 100, 148 78, 150 62 Z"
        fill="#eef6ee"
        opacity="0.35"
      />
    </svg>
  );
}
