export interface Theme {
  name: string;
  label: string;
  light: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    accent: string;
    "accent-foreground": string;
    muted: string;
    "muted-foreground": string;
    border: string;
    input: string;
    popover: string;
    "popover-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    accent: string;
    "accent-foreground": string;
    muted: string;
    "muted-foreground": string;
    border: string;
    input: string;
    popover: string;
    "popover-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    ring: string;
  };
}

export const themes: Record<string, Theme> = {
  avatar: {
    name: "avatar",
    label: "Night",
    light: {
      background: "313 52% 87%",
      foreground: "280 28% 27%",
      card: "313 52% 90%",
      "card-foreground": "280 28% 27%",
      primary: "280 20% 58%",
      "primary-foreground": "313 52% 90%",
      secondary: "313 43% 78%",
      "secondary-foreground": "280 28% 27%",
      accent: "280 20% 66%",
      "accent-foreground": "280 28% 27%",
      muted: "280 25% 80%",
      "muted-foreground": "280 15% 45%",
      border: "280 20% 85%",
      input: "313 43% 85%",
      popover: "313 52% 90%",
      "popover-foreground": "280 28% 27%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "313 52% 90%",
      ring: "280 20% 58%",
    },
    dark: {
      background: "280 15% 11%",
      foreground: "313 52% 87%",
      card: "280 25% 18%",
      "card-foreground": "313 52% 87%",
      primary: "280 20% 62%",
      "primary-foreground": "280 15% 11%",
      secondary: "313 43% 75%",
      "secondary-foreground": "280 15% 11%",
      accent: "280 18% 51%",
      "accent-foreground": "313 52% 87%",
      muted: "280 20% 30%",
      "muted-foreground": "280 15% 75%",
      border: "280 20% 22%",
      input: "280 20% 20%",
      popover: "280 15% 11%",
      "popover-foreground": "313 52% 87%",
      destructive: "0 80% 56%",
      "destructive-foreground": "313 52% 87%",
      ring: "280 20% 62%",
    },
  },
  rain: {
    name: "rain",
    label: "Rain",
    light: {
      background: "210 25% 88%",
      foreground: "210 15% 15%",
      card: "210 25% 92%",
      "card-foreground": "210 15% 15%",
      primary: "223 35% 55%",
      "primary-foreground": "210 25% 92%",
      secondary: "195 50% 65%",
      "secondary-foreground": "210 15% 15%",
      accent: "223 40% 65%",
      "accent-foreground": "210 15% 15%",
      muted: "210 20% 82%",
      "muted-foreground": "210 15% 45%",
      border: "210 20% 85%",
      input: "210 20% 88%",
      popover: "210 25% 92%",
      "popover-foreground": "210 15% 15%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 25% 92%",
      ring: "223 35% 55%",
    },
    dark: {
      background: "210 20% 8%",
      foreground: "210 8% 92%",
      card: "210 22% 13%",
      "card-foreground": "210 8% 92%",
      primary: "223 35% 58%",
      "primary-foreground": "210 20% 8%",
      secondary: "195 50% 70%",
      "secondary-foreground": "210 20% 8%",
      accent: "223 40% 68%",
      "accent-foreground": "210 8% 92%",
      muted: "210 18% 26%",
      "muted-foreground": "210 15% 75%",
      border: "210 18% 20%",
      input: "210 18% 18%",
      popover: "210 20% 8%",
      "popover-foreground": "210 8% 92%",
      destructive: "0 80% 56%",
      "destructive-foreground": "210 8% 92%",
      ring: "223 35% 58%",
    },
  },
  pyon: {
    name: "pyon",
    label: "Pyon",
    light: {
      background: "320 35% 86%",
      foreground: "320 20% 20%",
      card: "320 40% 92%",
      "card-foreground": "320 20% 20%",
      primary: "320 45% 52%",
      "primary-foreground": "320 40% 92%",
      secondary: "320 40% 68%",
      "secondary-foreground": "320 20% 20%",
      accent: "320 45% 62%",
      "accent-foreground": "320 20% 20%",
      muted: "320 30% 80%",
      "muted-foreground": "320 15% 40%",
      border: "320 30% 84%",
      input: "320 35% 87%",
      popover: "320 40% 92%",
      "popover-foreground": "320 20% 20%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "320 40% 92%",
      ring: "320 45% 52%",
    },
    dark: {
      background: "320 30% 12%",
      foreground: "320 35% 88%",
      card: "320 35% 20%",
      "card-foreground": "320 35% 88%",
      primary: "320 45% 60%",
      "primary-foreground": "320 30% 12%",
      secondary: "320 40% 70%",
      "secondary-foreground": "320 30% 12%",
      accent: "320 45% 68%",
      "accent-foreground": "320 35% 88%",
      muted: "320 30% 32%",
      "muted-foreground": "320 15% 75%",
      border: "320 30% 26%",
      input: "320 30% 22%",
      popover: "320 30% 12%",
      "popover-foreground": "320 35% 88%",
      destructive: "0 80% 56%",
      "destructive-foreground": "320 35% 88%",
      ring: "320 45% 60%",
    },
  },
};

export function applyTheme(themeKey: string, isDark: boolean) {
  const theme = themes[themeKey] || themes.avatar;
  const mode = isDark ? theme.dark : theme.light;

  const root = document.documentElement;
  
  // Set all CSS variables
  Object.entries(mode).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Set gradient colors based on theme
  const primaryColor = mode.primary;
  const secondaryColor = mode.secondary;
  root.style.setProperty('--gradient-color-1', `hsl(${primaryColor})`);
  root.style.setProperty('--gradient-color-2', `hsl(${secondaryColor})`);
}
