// components/layout/FloatingNavbar.jsx
import styled, { keyframes } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaVideo, FaMusic, FaNewspaper, FaPlusCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const slideUp = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(30px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
`

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`

const NavWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  padding: 0 16px;
  animation: ${slideUp} 0.5s ease-out;
  transition: transform 0.35s ease, opacity 0.35s ease;

  &.hidden {
    transform: translateX(-50%) translateY(120px);
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    bottom: 16px;
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    bottom: 12px;
    padding: 0 8px;
  }
`

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 2px;
  background: rgba(20, 20, 20, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 50px;
  padding: 6px 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  animation: ${floatAnimation} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    padding: 5px 8px;
  }

  @media (max-width: 480px) {
    padding: 4px 6px;
  }
`

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 30px;
  color: ${props => props.$active ? '#ffd700' : '#666'};
  transition: all 0.25s ease;
  position: relative;

  svg {
    font-size: 18px;
  }

  .label {
    font-size: 9px;
    font-weight: 600;
    margin-top: 2px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  &:hover {
    color: #ffd700;
    transform: translateY(-3px);
  }

  ${props => props.$active && `
    background: rgba(255, 215, 0, 0.12);

    &::after {
      content: '';
      position: absolute;
      bottom: 3px;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 2px;
      background: #ffd700;
      border-radius: 2px;
    }
  `}

  @media (max-width: 768px) {
    padding: 5px 10px;
    svg { font-size: 16px; }
    .label { font-size: 8px; }
  }

  @media (max-width: 480px) {
    padding: 5px 8px;
    svg { font-size: 15px; }
    .label { display: none; }
  }
`

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 4px;
`

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 20px;
  margin-left: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  }

  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    font-size: 17px;
  }
`

const FloatingNavbar = () => {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsVisible(!(y > lastScrollY && y > 200))
      setLastScrollY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/library', icon: FaBook, label: 'Library' },
    { path: '/videos', icon: FaVideo, label: 'Videos' },
    { path: '/audio', icon: FaMusic, label: 'Audio' },
    { path: '/feed', icon: FaNewspaper, label: 'Feed' },
  ]

  return (
    <NavWrapper className={isVisible ? '' : 'hidden'}>
      <NavContainer>
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavItem key={item.path} to={item.path} $active={isActive}>
              <Icon />
            </NavItem>
          )
        })}
        <Divider />
        <CreateButton to="/create" title="Create">
          <FaPlusCircle />
        </CreateButton>
      </NavContainer>
    </NavWrapper>
  )
}

export default FloatingNavbar