export interface BrandColors {
  burntOrange: string;
  charcoal: string;
  midnight: string;
  sand: string;
}

export interface BrandFonts {
  heading: string;
  body: string;
  utility: string;
}

export interface Brand {
  colors: BrandColors;
  fonts: BrandFonts;
}

export const brand: Brand = {
  colors: {
    burntOrange: "#BF5700",
    charcoal: "#1A1A1A",
    midnight: "#0D0D0D",
    sand: "#F5F2EB",
  },
  fonts: {
    heading: "Oswald",
    body: "Cormorant Garamond",
    utility: "JetBrains Mono",
  },
} as const;
