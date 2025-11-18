import { useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'

const RouteLoadingOverlay = () => {
  const navigation = useNavigation()
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)
  const [instanceKey, setInstanceKey] = useState(0)
  const pendingTimer = useRef(null)

  useEffect(() => {
    if (navigation.state === 'loading') {
      if (pendingTimer.current) {
        clearTimeout(pendingTimer.current)
      }
      pendingTimer.current = setTimeout(() => {
        setActive(true)
        setReady(false)
        setInstanceKey((prev) => prev + 1)
      }, 120)
    } else {
      if (pendingTimer.current) {
        clearTimeout(pendingTimer.current)
        pendingTimer.current = null
      }
      if (active) {
        setReady(true)
      }
    }

    return () => {
      if (pendingTimer.current) {
        clearTimeout(pendingTimer.current)
        pendingTimer.current = null
      }
    }
  }, [navigation.state, active])

  const handleComplete = () => {
    setActive(false)
    setReady(false)
  }

  if (!active) {
    return null
  }

  return <LoadingScreen key={instanceKey} blocking isReady={ready} onComplete={handleComplete} />
}

export default RouteLoadingOverlay
