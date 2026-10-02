// components/layout/NavDrawer.jsx
import styled, { keyframes, css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiX, FiHome, FiBook, FiSettings, FiUser, 
  FiInfo, FiMail, FiChevronRight
} from 'react-icons/fi'
import { useEffect } from 'react'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;
  animation: ${props => props.$isOpen ? css`${fadeIn} 0.3s ease-out` : 'none'};
`

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background: #111;
  z-index: 2001;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 40px rgba(0, 0, 0, 0.6);
  border-right: 1px solid rgba(255, 215, 0, 0.1);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ffd700;
    border-radius: 2px;
  }
`

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
`

const DrawerLogo = styled(Link)`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;

  .logo-text {
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #888;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;
  }
`

const DrawerNav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DrawerSection = styled.div`
  margin-bottom: 8px;

  .section-title {
    padding: 12px 16px 8px;
    color: #555;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
`

const DrawerLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 10px;
  color: ${props => props.$active ? '#ffd700' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 15px;
  font-weight: 500;
  transition: all 0.25s ease;
  background: ${props => props.$active ? 'rgba(255, 215, 0, 0.12)' : 'transparent'};

  svg:first-child {
    font-size: 20px;
    flex-shrink: 0;
    color: ${props => props.$active ? '#ffd700' : '#666'};
  }

  .label {
    flex: 1;
  }

  .chevron {
    font-size: 16px;
    color: #444;
    opacity: 0;
    transition: all 0.25s ease;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.08);
    color: #ffd700;

    svg:first-child {
      color: #ffd700;
    }

    .chevron {
      opacity: 1;
      transform: translateX(4px);
    }
  }
`

const DrawerFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);

  .footer-text {
    color: #555;
    font-size: 12px;
    text-align: center;
  }
`

const NavDrawer = ({ isOpen, onClose }) => {
  const location = useLocation()

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const mainNav = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/library', label: 'Library', icon: FiBook },
  ]

  const secondaryNav = [
    { path: '/about', label: 'About', icon: FiInfo },
    { path: '/contact', label: 'Contact', icon: FiMail },
    { path: '/profile', label: 'Profile', icon: FiUser },
    { path: '/settings', label: 'Settings', icon: FiSettings },
  ]

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Drawer $isOpen={isOpen} role="dialog" aria-modal="true">
        <DrawerHeader>
          <DrawerLogo to="/">
            <span className="logo-text">N-MENASHE</span>
          </DrawerLogo>
          <CloseButton onClick={onClose} aria-label="Close menu">
            <FiX />
          </CloseButton>
        </DrawerHeader>

        <DrawerNav>
          <DrawerSection>
            <div className="section-title">Browse</div>
            {mainNav.map(item => {
              const Icon = item.icon
              return (
                <DrawerLink 
                  key={item.path} 
                  to={item.path}
                  $active={location.pathname === item.path}
                >
                  <Icon />
                  <span className="label">{item.label}</span>
                  <FiChevronRight className="chevron" />
                </DrawerLink>
              )
            })}
          </DrawerSection>

          <DrawerSection>
            <div className="section-title">More</div>
            {secondaryNav.map(item => {
              const Icon = item.icon
              return (
                <DrawerLink 
                  key={item.path} 
                  to={item.path}
                  $active={location.pathname === item.path}
                >
                  <Icon />
                  <span className="label">{item.label}</span>
                  <FiChevronRight className="chevron" />
                </DrawerLink>
              )
            })}
          </DrawerSection>
        </DrawerNav>

        <DrawerFooter>
          <div className="footer-text">N-MENASHE © 2025</div>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export default NavDrawer