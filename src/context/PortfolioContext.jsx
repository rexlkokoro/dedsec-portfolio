import { createContext, useContext, useState, useCallback } from 'react'
import defaultData from '../data/portfolioData'

const STORAGE_KEY = 'portfolio_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return JSON.parse(raw)
  } catch {
    return defaultData
  }
}

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(loadData)

  const saveData = useCallback((newData) => {
    setData(newData)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    } catch {}
  }, [])

  const resetData = useCallback(() => {
    setData(defaultData)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, saveData, resetData, defaultData }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
