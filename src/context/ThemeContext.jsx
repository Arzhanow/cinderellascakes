import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'midnight',
  setTheme: () => {},
})

const THEME_KEY = 'cinderella-theme'
const themes = ['midnight', 'rose', 'peach']

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'midnight'
    return localStorage.getItem(THEME_KEY) || 'midnight'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme) => {
      if (themes.includes(nextTheme)) {
        setTheme(nextTheme)
      }
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
