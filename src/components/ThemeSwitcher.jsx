import { useTheme } from '../context/ThemeContext'

const options = [
  {
    id: 'midnight',
    label: 'Нощ',
    gradient: 'linear-gradient(135deg, #0a0814, #8be9fd)',
  },
  {
    id: 'rose',
    label: 'Розово',
    gradient: 'linear-gradient(135deg, #f49bcc, #a074d7)',
  },
  {
    id: 'peach',
    label: 'Праскова',
    gradient: 'linear-gradient(135deg, #ffb68a, #f17c5e)',
  },
]

const ThemeSwitcher = ({ layout = 'inline' }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={`flex ${layout === 'stack' ? 'flex-col gap-3' : 'items-center gap-3'}`}>
      {options.map((option) => (
        <button
          key={option.id}
          aria-pressed={theme === option.id}
          className="group flex flex-col items-center gap-1"
          onClick={() => setTheme(option.id)}
          type="button"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center">
            <span
              aria-hidden="true"
              className={`inline-block h-6 w-6 rounded-full border-2 transition duration-200 ${
                theme === option.id ? 'scale-110 border-white ring-2 ring-white/70' : 'border-white/40 group-hover:border-white'
              }`}
              style={{ background: option.gradient }}
            ></span>
          </span>
          <span className="sr-only">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
