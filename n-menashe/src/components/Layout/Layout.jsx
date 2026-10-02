// components/layout/Layout.jsx
import { useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import NavDrawer from './NavDrawer'
import FloatingNavbar from './FloatingNavbar'

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`

const MainContent = styled.main`
  flex: 1;
  padding: 100px 20px 120px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 80px 16px 100px;
  }

  @media (max-width: 480px) {
    padding: 70px 12px 90px;
  }
`

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <LayoutWrapper>
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <NavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <MainContent>{children}</MainContent>
      <FloatingNavbar />
    </LayoutWrapper>
  )
}

export default Layout