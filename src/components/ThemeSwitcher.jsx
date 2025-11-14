import { useTheme } from '../context/ThemeContext'

const options = [
  { id: 'midnight', label: 'Нощ' },
  { id: 'rose', label: 'Розово' },
  { id: 'peach', label: 'Праскова' },
]

const ThemeSwitcher = ({ layout = 'inline' }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={`rounded-full border border-white/15 bg-white/5 px-3 py-1 ${
        layout === 'stack' ? 'flex flex-col gap-2' : 'flex items-center gap-2'
      }`}
    >
      {options.map((option) => (
        <button
          key={option.id}
          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] transition ${
            theme === option.id ? 'bg-white text-brand-night' : 'text-white/70 hover:text-white'
          }`}
          onClick={() => setTheme(option.id)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
