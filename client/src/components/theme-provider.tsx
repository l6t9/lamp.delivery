import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import { applyTheme } from "@/lib/themes"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  colorSchemeKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorScheme: string
  setColorScheme: (scheme: string) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  colorScheme: "avatar",
  setColorScheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  colorSchemeKey = "vite-ui-colorscheme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => {
      try {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme
      } catch {
        return defaultTheme
      }
    }
  )
  const [colorScheme, setColorSchemeState] = useState<string>(
    () => {
      try {
        return localStorage.getItem(colorSchemeKey) || "avatar"
      } catch {
        return "avatar"
      }
    }
  )

  useLayoutEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      applyTheme(colorScheme, systemTheme === "dark")
      return
    }

    root.classList.add(theme)
    applyTheme(colorScheme, theme === "dark")
  }, [theme, colorScheme])

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch {
      // localStorage not available in this context
    }
    setThemeState(newTheme)
  }

  const setColorScheme = (scheme: string) => {
    try {
      localStorage.setItem(colorSchemeKey, scheme)
    } catch {
      // localStorage not available in this context
    }
    setColorSchemeState(scheme)
  }

  const value = {
    theme,
    setTheme,
    colorScheme,
    setColorScheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
