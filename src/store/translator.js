import {createContext, useContext, useEffect, useMemo, useState} from 'react';

const TranslatorContext = createContext()

export const TranslatorProvider = ({children}) => {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  const storageLang = window.localStorage.getItem('lang')
  const [translation, setTranslation] = useState(navLang)
  const [currentLang, setCurrentLang] = useState(storageLang ?? navLang)

  useEffect(() => {
    window.localStorage.setItem('lang', currentLang)
    import(`../dictionary/${currentLang}.json`).then((translation) => setTranslation(translation))
  }, [currentLang])

  const value = useMemo(() => ({translate: (key) => 
      translation[key], setLang: setCurrentLang}), [translation])

  return <TranslatorContext.Provider value={value}>{children}</TranslatorContext.Provider>
}

export const useTranslation = () => useContext(TranslatorContext)
