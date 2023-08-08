"use client"

import * as React from "react"

type Language = "en" | "id"

type LanguageContextProps = {
  lang: Language
  setLang: React.Dispatch<React.SetStateAction<Language>>
}

const LanguageContext = React.createContext<LanguageContextProps | null>(null)

export function LanguageProvider({children, language = "en"}: {children: React.ReactNode, language: Language}){
  const [lang, setLang] = React.useState<Language>(language)

  const value = React.useMemo(() => ({
    lang, 
    setLang
  }), [lang, setLang])


  return <LanguageContext.Provider value={value}>
    {children}
  </LanguageContext.Provider>
}

export function useLanguage(){
  const context = React.useContext(LanguageContext)

  if(!context){
    throw new Error("must be used inside lang provider component")
  }

  return context
}