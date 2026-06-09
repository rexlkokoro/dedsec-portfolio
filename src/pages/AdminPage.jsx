import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'dedsec'

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function Input({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs text-[#B3E10D]/70 uppercase tracking-widest">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#0f0f0d] border border-[#B3E10D]/30 rounded px-3 py-2 text-sm text-[#CECECE] placeholder-[#555] focus:outline-none focus:border-[#B3E10D] transition-colors"
      />
    </div>
  )
}

function Textarea({ label, value, onChange, rows = 4, placeholder = '' }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs text-[#B3E10D]/70 uppercase tracking-widest">{label}</label>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="bg-[#0f0f0d] border border-[#B3E10D]/30 rounded px-3 py-2 text-sm text-[#CECECE] placeholder-[#555] focus:outline-none focus:border-[#B3E10D] transition-colors resize-y"
      />
    </div>
  )
}

function SectionCard({ title, children }) {
  return (
    <div className="border border-[#B3E10D]/20 rounded-lg bg-[#1a1a17] p-7 space-y-6">
      <h3 className="text-[#B3E10D] font-bold text-sm uppercase tracking-widest border-b border-[#B3E10D]/20 pb-3 mb-2">{title}</h3>
      {children}
    </div>
  )
}

function BtnAdd({ onClick, label = 'Add' }) {
  return (
    <button
      onClick={onClick}
      className="text-xs border border-[#B3E10D]/50 text-[#B3E10D] px-4 py-2 rounded hover:bg-[#B3E10D]/10 transition-colors"
    >
      + {label}
    </button>
  )
}

function BtnRemove({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-xs border border-red-500/40 text-red-400 px-3 py-2 rounded hover:bg-red-500/10 transition-colors"
    >
      ✕
    </button>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroEditor({ hero, onChange }) {
  const set = (key, val) => onChange({ ...hero, [key]: val })

  const setRole = (i, val) => {
    const roles = [...hero.roles]
    roles[i] = val
    set('roles', roles)
  }
  const addRole = () => set('roles', [...hero.roles, ''])
  const removeRole = (i) => set('roles', hero.roles.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-6">
      <SectionCard title="Hero">
        <div className="grid sm:grid-cols-2 gap-6">
          <Input label="Identity Name" value={hero.identityName} onChange={v => set('identityName', v)} />
          <Input label="Real Name" value={hero.realName} onChange={v => set('realName', v)} />
        </div>
        <Textarea label="Subtitle" value={hero.subtitle} onChange={v => set('subtitle', v)} rows={2} />
        <Input label="Image URL / Path" value={hero.imageSrc} onChange={v => set('imageSrc', v)} placeholder="/assets/reaper.png" />
        <Input label="Image Alt Text" value={hero.imageAlt} onChange={v => set('imageAlt', v)} />

        <div className="space-y-3">
          <label className="text-xs text-[#B3E10D]/70 uppercase tracking-widest">Rotating Roles</label>
          {hero.roles.map((r, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={r}
                onChange={e => setRole(i, e.target.value)}
                placeholder="e.g. a Developer."
                className="flex-1 bg-[#0f0f0d] border border-[#B3E10D]/30 rounded px-3 py-1.5 text-sm text-[#CECECE] placeholder-[#555] focus:outline-none focus:border-[#B3E10D] transition-colors"
              />
              <BtnRemove onClick={() => removeRole(i)} />
            </div>
          ))}
          <BtnAdd onClick={addRole} label="Role" />
        </div>
      </SectionCard>
    </div>
  )
}

// ─── About Section ───────────────────────────────────────────────────────────
function AboutEditor({ about, onChange }) {
  const set = (key, val) => onChange({ ...about, [key]: val })

  const setSummary = (i, val) => {
    const s = [...about.summaries]
    s[i] = val
    set('summaries', s)
  }
  const addSummary = () => set('summaries', [...about.summaries, ''])
  const removeSummary = (i) => set('summaries', about.summaries.filter((_, idx) => idx !== i))

  const setStackTitle = (si, val) => {
    const s = about.stacks.map((stack, idx) => idx === si ? { ...stack, title: val } : stack)
    set('stacks', s)
  }
  const setStackItems = (si, val) => {
    const items = val.split(',').map(s => s.trim()).filter(Boolean)
    const s = about.stacks.map((stack, idx) => idx === si ? { ...stack, items } : stack)
    set('stacks', s)
  }
  const addStack = () => set('stacks', [...about.stacks, { id: uid(), title: '', items: [] }])
  const removeStack = (si) => set('stacks', about.stacks.filter((_, idx) => idx !== si))

  return (
    <div className="space-y-6">
      <SectionCard title="About — Heading">
        <Input label="Heading / Tagline" value={about.heading} onChange={v => set('heading', v)} />
      </SectionCard>

      <SectionCard title="Professional Summary Paragraphs">
        {about.summaries.map((s, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1">
              <Textarea
                label={`Paragraph ${i + 1}`}
                value={s}
                onChange={v => setSummary(i, v)}
                rows={3}
              />
            </div>
            <button onClick={() => removeSummary(i)} className="mt-7 text-xs border border-red-500/40 text-red-400 px-3 py-2 rounded hover:bg-red-500/10 transition-colors">✕</button>
          </div>
        ))}
        <BtnAdd onClick={addSummary} label="Paragraph" />
      </SectionCard>

      <SectionCard title="Tech Stack Tiles">
        {about.stacks.map((stack, si) => (
          <div key={stack.id} className="border border-[#B3E10D]/10 rounded p-5 space-y-3 bg-[#0f0f0d]">
            <div className="flex gap-3 items-center">
              <input
                value={stack.title}
                onChange={e => setStackTitle(si, e.target.value)}
                placeholder="Category title"
                className="flex-1 bg-[#171714] border border-[#B3E10D]/20 rounded px-3 py-1.5 text-sm text-[#CECECE] placeholder-[#555] focus:outline-none focus:border-[#B3E10D] transition-colors"
              />
              <BtnRemove onClick={() => removeStack(si)} />
            </div>
            <input
              value={stack.items.join(', ')}
              onChange={e => setStackItems(si, e.target.value)}
              placeholder="HTML, CSS, JavaScript (comma-separated)"
              className="w-full bg-[#171714] border border-[#B3E10D]/20 rounded px-3 py-1.5 text-sm text-[#CECECE] placeholder-[#555] focus:outline-none focus:border-[#B3E10D] transition-colors"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {stack.items.map(t => (
                <span key={t} className="px-2 py-0.5 text-xs border border-[#B3E10D]/30 rounded text-[#B3E10D]/80">{t}</span>
              ))}
            </div>
          </div>
        ))}
        <BtnAdd onClick={addStack} label="Tech Stack Tile" />
      </SectionCard>
    </div>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────
function ProjectsEditor({ projects, onChange }) {
  const setField = (i, key, val) => {
    const p = projects.map((proj, idx) => idx === i ? { ...proj, [key]: val } : proj)
    onChange(p)
  }
  const setTags = (i, val) => {
    const tags = val.split(',').map(s => s.trim()).filter(Boolean)
    setField(i, 'tags', tags)
  }
  const addProject = () => onChange([...projects, { id: uid(), title: '', desc: '', tags: [], link: '' }])
  const removeProject = (i) => onChange(projects.filter((_, idx) => idx !== i))

  return (
    <SectionCard title="Projects">
      {projects.map((p, i) => (
        <div key={p.id} className="border border-[#B3E10D]/10 rounded p-6 space-y-5 bg-[#0f0f0d]">
          <div className="flex justify-between items-center">
            <span className="text-[#B3E10D]/60 text-xs uppercase">Project #{i + 1}</span>
            <BtnRemove onClick={() => removeProject(i)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Title" value={p.title} onChange={v => setField(i, 'title', v)} />
            <Input label="Link (optional)" value={p.link} onChange={v => setField(i, 'link', v)} placeholder="https://..." />
          </div>
          <Textarea label="Description" value={p.desc} onChange={v => setField(i, 'desc', v)} rows={3} />
          <div>
            <Input label="Tags (comma-separated)" value={p.tags.join(', ')} onChange={v => setTags(i, v)} placeholder="React, Python, API" />
            <div className="flex flex-wrap gap-2 mt-3">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-0.5 text-xs border border-[#B3E10D]/30 rounded text-[#B3E10D]/80">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <BtnAdd onClick={addProject} label="Project" />
    </SectionCard>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactEditor({ contact, onChange }) {
  const setField = (i, key, val) => {
    const links = contact.links.map((l, idx) => idx === i ? { ...l, [key]: val } : l)
    onChange({ ...contact, links })
  }
  const addLink = () => onChange({ ...contact, links: [...contact.links, { id: uid(), label: '', href: '' }] })
  const removeLink = (i) => onChange({ ...contact, links: contact.links.filter((_, idx) => idx !== i) })

  return (
    <SectionCard title="Contact Links">
      {contact.links.map((l, i) => (
        <div key={l.id} className="flex gap-4 items-end">
          <div className="w-40 shrink-0">
            <Input label="Label" value={l.label} onChange={v => setField(i, 'label', v)} placeholder="GitHub" />
          </div>
          <div className="flex-1">
            <Input label="URL / mailto" value={l.href} onChange={v => setField(i, 'href', v)} placeholder="https://... or mailto:..." />
          </div>
          <BtnRemove onClick={() => removeLink(i)} />
        </div>
      ))}
      <BtnAdd onClick={addLink} label="Link" />
    </SectionCard>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
const TABS = ['Hero', 'About', 'Projects', 'Contact']

export default function AdminPage() {
  const navigate = useNavigate()
  const { data, saveData, resetData, defaultData, loading } = usePortfolio()

  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)

  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(data)))
  const [activeTab, setActiveTab] = useState('Hero')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const syncedRemote = useRef(false)

  useEffect(() => {
    if (!loading && !syncedRemote.current) {
      syncedRemote.current = true
      setDraft(JSON.parse(JSON.stringify(data)))
    }
  }, [loading, data])

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  const handleSave = useCallback(async () => {
    setSaving(true)
    setSaveError(false)
    try {
      await saveData(draft)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setSaveError(true)
      setTimeout(() => setSaveError(false), 3000)
    } finally {
      setSaving(false)
    }
  }, [draft, saveData])

  const handleReset = async () => {
    if (!window.confirm('Reset all portfolio content to defaults? This cannot be undone.')) return
    setSaving(true)
    setSaveError(false)
    try {
      await resetData()
      setDraft(JSON.parse(JSON.stringify(defaultData)))
      setSaved(false)
    } catch {
      setSaveError(true)
      setTimeout(() => setSaveError(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center font-mono">
        <div className="w-full max-w-sm bg-[#1a1a17] border border-[#B3E10D]/30 rounded-xl p-8 space-y-5 shadow-[0_0_40px_rgba(179,225,13,0.08)]">
          <div className="text-center space-y-1">
            <div className="text-[#B3E10D] text-xl font-bold tracking-widest">ADMIN ACCESS</div>
            <div className="text-[#555] text-xs">DedSec Portfolio Control Panel</div>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(false) }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className={`w-full bg-[#0f0f0d] border rounded px-4 py-2.5 text-sm text-[#CECECE] placeholder-[#444] focus:outline-none transition-colors ${pwError ? 'border-red-500' : 'border-[#B3E10D]/30 focus:border-[#B3E10D]'}`}
            />
            {pwError && <div className="text-red-400 text-xs">ACCESS DENIED — incorrect password</div>}
            <button
              onClick={handleLogin}
              className="w-full border border-[#B3E10D] text-[#B3E10D] py-2.5 rounded text-sm uppercase tracking-widest hover:bg-[#B3E10D]/10 transition-colors"
            >
              Authenticate
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full text-[#555] text-xs hover:text-[#888] transition-colors"
          >
            ← Back to portfolio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#171717] text-[#CECECE] font-mono">
      <header className="sticky top-0 z-50 bg-[#0f0f0d] border-b border-[#B3E10D]/20 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-[#B3E10D] font-bold tracking-widest text-sm">DEDSEC ADMIN</span>
          <div className="flex gap-2">
            {TABS.map(tab => {
              const tabCls = activeTab === tab
                ? 'px-4 py-2 text-xs rounded transition-colors bg-[#B3E10D]/15 text-[#B3E10D] border border-[#B3E10D]/40'
                : 'px-4 py-2 text-xs rounded transition-colors text-[#888] hover:text-[#CECECE]'
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} className={tabCls}>
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {saving && <span className="text-[#B3E10D]/60 text-xs animate-pulse">⟳ SYNCING...</span>}
          {saved && !saving && <span className="text-[#B3E10D] text-xs animate-pulse">✓ SAVED</span>}
          {saveError && <span className="text-red-400 text-xs">✕ SYNC FAILED</span>}
          <button
            onClick={handleReset}
            className="text-xs border border-red-500/40 text-red-400 px-4 py-2 rounded hover:bg-red-500/10 transition-colors"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs border border-[#B3E10D] text-[#B3E10D] px-5 py-2 rounded hover:bg-[#B3E10D]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#555] hover:text-[#888] transition-colors px-2"
          >
            ← Portfolio
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {activeTab === 'Hero' && (
          <HeroEditor hero={draft.hero} onChange={v => setDraft(d => ({ ...d, hero: v }))} />
        )}
        {activeTab === 'About' && (
          <AboutEditor about={draft.about} onChange={v => setDraft(d => ({ ...d, about: v }))} />
        )}
        {activeTab === 'Projects' && (
          <ProjectsEditor projects={draft.projects} onChange={v => setDraft(d => ({ ...d, projects: v }))} />
        )}
        {activeTab === 'Contact' && (
          <ContactEditor contact={draft.contact} onChange={v => setDraft(d => ({ ...d, contact: v }))} />
        )}

        <div className="pt-6 flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="text-xs border border-red-500/40 text-red-400 px-5 py-2.5 rounded hover:bg-red-500/10 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-[#B3E10D] text-[#B3E10D] px-8 py-2.5 rounded text-sm uppercase tracking-widest hover:bg-[#B3E10D]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
