import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import defaultData from '../data/portfolioData'

const STORAGE_KEY = 'portfolio_data'
const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    return JSON.parse(raw)
  } catch {
    return defaultData
  }
}

async function fetchRemoteData() {
  const res = await fetch(`${BIN_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY },
  })
  if (!res.ok) throw new Error('Failed to fetch')
  const json = await res.json()
  return json.record
}

async function pushRemoteData(newData) {
  const res = await fetch(BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY,
    },
    body: JSON.stringify(newData),
  })
  if (!res.ok) throw new Error('Failed to save')
}

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(loadLocalData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRemoteData()
      .then(remote => {
        setData(remote)
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(remote)) } catch {}
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const saveData = useCallback(async (newData) => {
    setData(newData)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newData)) } catch {}
    await pushRemoteData(newData)
  }, [])

  const resetData = useCallback(async () => {
    setData(defaultData)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    await pushRemoteData(defaultData)
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, saveData, resetData, defaultData, loading }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
