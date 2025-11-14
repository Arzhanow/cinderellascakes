import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    const scrollWithOffset = (element) => {
      if (!element) return

      const styles = getComputedStyle(document.documentElement)
      const parsePixels = (value) => {
        const parsed = parseFloat(value)
        return Number.isNaN(parsed) ? 0 : parsed
      }

      const topbarHeight = parsePixels(styles.getPropertyValue('--topbar-height'))
      const navigationHeight = parsePixels(styles.getPropertyValue('--navigation-height'))
      const anchorPadding = parsePixels(styles.getPropertyValue('--anchor-padding'))
      const offset = topbarHeight + navigationHeight + anchorPadding
      const elementTop = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: Math.max(elementTop - offset, 0),
        behavior: 'smooth',
      })
    }

    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        scrollWithOffset(target)
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return null
}

export default ScrollToTop
