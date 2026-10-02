// components/common/PageTransition.jsx
import { useEffect, useState } from 'react'

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    return () => setIsVisible(false)
  }, [])

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 300ms ease, transform 300ms ease'
    }}>
      {children}
    </div>
  )
}

export default PageTransition