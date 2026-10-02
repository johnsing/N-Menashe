// components/layout/Header.jsx
import styled, { keyframes } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiHome, FiBook, FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  animation: ${slideDown} 0.5s ease-out;
  transition: all 0.3s ease;

  &.scrolled {
    background: rgba(10, 10, 10, 0.98);
    border-bottom-color: rgba(255, 215, 0, 0.2);
  }
`

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    height: 56px;
    padding: 0 12px;
  }
`

const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-size: 22px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  flex-shrink: 0;

  .logo-text {
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    letter-spacing: 1px;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 50px;
  color: ${props => props.$active ? '#ffd700' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'rgba(255, 215, 0, 0.1)' : 'transparent'};

  &:hover {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.08);
  }

  svg {
    font-size: 16px;
  }
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Header = ({ onMenuClick }) => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/library', label: 'Library', icon: FiBook },
  ]

  return (
    <HeaderWrapper className={isScrolled ? 'scrolled' : ''}>
      <HeaderContent>
        <MenuButton onClick={onMenuClick} aria-label="Open menu">
          <FiMenu />
        </MenuButton>

        <Logo to="/">
          <span className="logo-text">N-MENASHE</span>
        </Logo>

        <DesktopNav>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <NavLink key={item.path} to={item.path} $active={isActive}>
                <Icon />
                {item.label}
              </NavLink>
            )
          })}
        </DesktopNav>

        <SearchButton aria-label="Search">
          <FiSearch />
        </SearchButton>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default Header