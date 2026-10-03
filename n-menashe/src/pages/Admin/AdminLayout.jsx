import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import {
  FiGrid, FiVideo, FiMusic, FiFileText, FiBook,
  FiUsers, FiSettings, FiLogOut, FiMenu, FiX,
  FiSearch, FiBell, FiChevronDown, FiExternalLink
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
`

// ── Sidebar ──────────────────────────────────────────────────────
const Sidebar = styled.aside`
  width: 250px;
  background: #0f0f0f;
  border-right: 1px solid #1f1f1f;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  transition: transform 0.3s ease;

  &.closed {
    transform: translateX(-100%);
  }

  @media (min-width: 1024px) {
    transform: none !important;
  }
`

const SidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 190;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease;

  @media (min-width: 1024px) {
    display: none;
  }
`

const SidebarHeader = styled.div`
  padding: 22px 20px;
  border-bottom: 1px solid #1f1f1f;
  display: flex;
  align-items: center;
  gap: 10px;

  .admin-logo {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffd700, #f5a623);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-weight: 900;
    font-size: 15px;
    flex-shrink: 0;
  }

  .admin-titles {
    min-width: 0;

    .t1 {
      color: #fff;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .t2 {
      color: #555;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
  }
`

const NavSection = styled.nav`
  flex: 1;
  padding: 18px 12px;
  overflow-y: auto;

  .nav-label {
    color: #3a3a3a;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 14px 12px 8px;
  }
`

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  color: #888;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 3px;
  position: relative;
  transition: all 0.25s ease;

  svg { font-size: 17px; flex-shrink: 0; }

  .nav-badge {
    margin-left: auto;
    padding: 2px 8px;
    background: rgba(255, 215, 0, 0.12);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 50px;
    color: #ffd700;
    font-size: 10px;
    font-weight: 700;
  }

  &:hover {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.05);
  }

  &.active {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.09);
    font-weight: 600;

    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: linear-gradient(180deg, #ffd700, #f5a623);
    }
  }
`

const SidebarFooter = styled.div`
  padding: 14px 12px;
  border-top: 1px solid #1f1f1f;

  .back-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 12px;
    color: #666;
    font-size: 13px;
    transition: all 0.25s ease;

    svg { font-size: 15px; }

    &:hover {
      color: #ffd700;
      background: rgba(255, 215, 0, 0.05);
    }
  }
`

// ── Main area ────────────────────────────────────────────────────
const MainArea = styled.div`
  flex: 1;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (min-width: 1024px) {
    margin-left: 250px;
  }
`

const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid #1c1c1c;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const Hamburger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #141414;
  border: 1px solid #242424;
  color: #888;
  font-size: 19px;
  transition: all 0.25s ease;

  &:hover { color: #ffd700; }

  @media (min-width: 1024px) {
    display: none;
  }
`

const PageTitle = styled.h1`
  color: #fff;
  font-size: 19px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TopbarSearch = styled.div`
  position: relative;
  flex: 1;
  max-width: 380px;
  margin-left: auto;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #444;
    font-size: 15px;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 10px 14px 10px 40px;
    background: #141414;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #fff;
    font-size: 13px;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.4);
    }

    &::placeholder { color: #3a3a3a; }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const IconPill = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #141414;
  border: 1px solid #242424;
  color: #888;
  font-size: 17px;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover { color: #ffd700; }

  .dot {
    position: absolute;
    top: 9px;
    right: 10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ffd700;
    border: 2px solid #0a0a0a;
  }
`

const AdminChip = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px 5px 5px;
  border-radius: 50px;
  background: #141414;
  border: 1px solid #242424;
  transition: border-color 0.25s ease;
  flex-shrink: 0;

  &:hover { border-color: rgba(255, 215, 0, 0.35); }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd700, #f5a623);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-size: 12px;
    font-weight: 800;
  }

  .chip-info {
    text-align: left;

    .n { color: #fff; font-size: 12px; font-weight: 700; line-height: 1.2; }
    .r { color: #555; font-size: 10px; line-height: 1.2; }
  }

  svg { color: #555; font-size: 14px; }

  @media (max-width: 560px) {
    .chip-info, > svg { display: none; }
    padding: 5px;
  }
`

const Content = styled.main`
  flex: 1;
  padding: 26px;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { to: '/admin', icon: FiGrid, label: 'Dashboard', end: true },
    { to: '/admin/videos', icon: FiVideo, label: 'Videos' },
    { to: '/admin/audio', icon: FiMusic, label: 'Audio' },
    { to: '/admin/posts', icon: FiFileText, label: 'Posts', badge: '12' },
    { to: '/admin/library', icon: FiBook, label: 'Library' },
    { to: '/admin/users', icon: FiUsers, label: 'Users' },
    { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ]

  const closeAndGo = (path) => {
    setSidebarOpen(false)
    navigate(path)
  }

  return (
    <LayoutWrapper>
      <SidebarOverlay
        $visible={sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar className={sidebarOpen ? 'open' : 'closed'}>
        <SidebarHeader>
          <div className="admin-logo">N</div>
          <div className="admin-titles">
            <div className="t1">N-MENASHE</div>
            <div className="t2">Admin Panel</div>
          </div>
        </SidebarHeader>

        <NavSection>
          <div className="nav-label">Main Menu</div>
          {navItems.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon />
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </NavItem>
          ))}
        </NavSection>

        <SidebarFooter>
          <Link className="back-link" to="/" onClick={() => setSidebarOpen(false)}>
            <FiExternalLink /> Back to Website
          </Link>
          <button className="back-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <FiLogOut /> Sign Out
          </button>
        </SidebarFooter>
      </Sidebar>

      <MainArea>
        <Topbar>
          <Hamburger onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <FiMenu />
          </Hamburger>
          <PageTitle>Dashboard</PageTitle>

          <TopbarSearch>
            <FiSearch />
            <input type="text" placeholder="Search content, users..." />
          </TopbarSearch>

          <IconPill title="Notifications">
            <FiBell />
            <span className="dot" />
          </IconPill>

          <AdminChip>
            <div className="avatar">A</div>
            <div className="chip-info">
              <div className="n">Admin</div>
              <div className="r">Super Admin</div>
            </div>
            <FiChevronDown />
          </AdminChip>
        </Topbar>

        <Content>
          <Outlet />
        </Content>
      </MainArea>
    </LayoutWrapper>
  )
}

export default AdminLayout