import { useState, useCallback } from 'react'

const LANGUAGES = ['bg', 'en']

const useToggleLanguage = (defaultLang = 'bg') => {
  const [language, setLanguage] = useState(defaultLang)

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === LANGUAGES[0] ? LANGUAGES[1] : LANGUAGES[0]))
  }, [])

  return { language, toggleLanguage }
}

export default useToggleLanguage
