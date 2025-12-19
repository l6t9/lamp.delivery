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
      secondary: "223 40% 60%",
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
      secondary: "223 40% 62%",
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
      background: "262 28% 85%",
      foreground: "262 20% 25%",
      card: "262 28% 90%",
      "card-foreground": "262 20% 25%",
      primary: "262 35% 58%",
      "primary-foreground": "262 28% 90%",
      secondary: "262 30% 68%",
      "secondary-foreground": "262 20% 25%",
      accent: "262 35% 65%",
      "accent-foreground": "262 20% 25%",
      muted: "262 25% 80%",
      "muted-foreground": "262 15% 45%",
      border: "262 25% 83%",
      input: "262 25% 86%",
      popover: "262 28% 90%",
      "popover-foreground": "262 20% 25%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "262 28% 90%",
      ring: "262 35% 58%",
    },
    dark: {
      background: "268 25% 10%",
      foreground: "262 28% 88%",
      card: "268 25% 16%",
      "card-foreground": "262 28% 88%",
      primary: "262 35% 62%",
      "primary-foreground": "268 25% 10%",
      secondary: "262 30% 70%",
      "secondary-foreground": "268 25% 10%",
      accent: "262 35% 68%",
      "accent-foreground": "262 28% 88%",
      muted: "268 25% 28%",
      "muted-foreground": "262 15% 75%",
      border: "268 25% 22%",
      input: "268 25% 20%",
      popover: "268 25% 10%",
      "popover-foreground": "262 28% 88%",
      destructive: "0 80% 56%",
      "destructive-foreground": "262 28% 88%",
      ring: "262 35% 62%",
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
