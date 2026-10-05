import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiUserCheck,
  FiUserX, FiUsers, FiShield, FiUser
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.4s ease-out;
`

const PageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h2 { color: #fff; font-size: 22px; font-weight: 800; }
  .sub { color: #666; font-size: 13px; margin-top: 3px; }
`

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  svg { font-size: 15px; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 340px;

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
    padding: 11px 14px 11px 40px;
    background: #141414;
    border: 1px solid #242424;
    border-radius: 12px;
    color: #fff;
    font-size: 13px;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.4);
    }

    &::placeholder { color: #3a3a3a; }
  }
`

const StatsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  .stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 16px;
    background: #141414;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #888;
    font-size: 12px;
    font-weight: 600;

    b { color: #ffd700; }
    svg { color: #ffd700; font-size: 13px; }
  }
`

const Panel = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 12px;
`

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);

    .u-actions { opacity: 1; }
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
`

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0a0a0a;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  flex: 1;
  min-width: 140px;

  .u-name {
    color: #ddd;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .u-email {
    color: #555;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 13px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  background: ${p => p.$role === 'admin'
    ? 'rgba(255, 215, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.04)'};
  color: ${p => p.$role === 'admin' ? '#ffd700' : '#888'};
  border: 1px solid ${p => p.$role === 'admin'
    ? 'rgba(255, 215, 0, 0.3)'
    : '#262626'};
  flex-shrink: 0;

  svg { font-size: 11px; }
`

const UserStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.$active ? '#51cf66' : '#ff6b6b'};
  width: 70px;
  flex-shrink: 0;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
`

const JoinDate = styled.span`
  display: none;
  color: #444;
  font-size: 12px;
  width: 90px;
  text-align: right;
  flex-shrink: 0;

  @media (min-width: 800px) {
    display: block;
  }
`

const RowActions = styled.div`
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  @media (max-width: 700px) {
    opacity: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: #161616;
    border: 1px solid #242424;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #ffd700;
      border-color: rgba(255, 215, 0, 0.35);
    }

    &.danger:hover {
      color: #ff6b6b;
      border-color: rgba(255, 107, 107, 0.35);
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #3a3a3a;

  svg { font-size: 40px; margin-bottom: 12px; }
  p { font-size: 14px; }
`

const avatarColors = [
  'linear-gradient(135deg, #ffd700, #f5a623)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #f97316, #ea580c)',
  'linear-gradient(135deg, #ec4899, #db2777)',
]

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@nmenashe.com', role: 'admin', active: true, joined: 'Jan 12, 2026' },
  { id: 2, name: 'David Cohen', email: 'david@example.com', role: 'user', active: true, joined: 'Mar 4, 2026' },
  { id: 3, name: 'Sarah Levi', email: 'sarah.levi@example.com', role: 'user', active: true, joined: 'Apr 18, 2026' },
  { id: 4, name: 'Moshe Friedman', email: 'moshe.f@example.com', role: 'user', active: false, joined: 'Jun 2, 2026' },
  { id: 5, name: 'Rachel Goldberg', email: 'rachel.g@example.com', role: 'user', active: true, joined: 'Aug 21, 2026' },
  { id: 6, name: 'Yosef Adler', email: 'yosef.a@example.com', role: 'user', active: true, joined: 'Sep 9, 2026' },
]

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, active: !u.active } : u
    ))
  }

  const toggleRole = (id) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
        : u
    ))
  }

  const removeUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const admins = users.filter(u => u.role === 'admin').length
  const active = users.filter(u => u.active).length

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>User Management</h2>
          <div className="sub">Manage accounts, roles, and permissions</div>
        </div>
        <PrimaryBtn><FiPlus /> Invite User</PrimaryBtn>
      </PageHead>

      <FilterRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <StatsRow>
          <span className="stat-pill"><FiUsers /> <b>{users.length}</b> Total</span>
          <span className="stat-pill"><FiUserCheck /> <b>{active}</b> Active</span>
          <span className="stat-pill"><FiShield /> <b>{admins}</b> Admins</span>
        </StatsRow>
      </FilterRow>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState>
            <FiUsers />
            <p>No users found.</p>
          </EmptyState>
        ) : (
          filtered.map((user, i) => (
            <UserRow key={user.id}>
              <UserAvatar $color={avatarColors[i % avatarColors.length]}>
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </UserAvatar>
              <UserInfo>
                <div className="u-name">
                  {user.name}
                  <RoleBadge
                    $role={user.role}
                    onClick={() => toggleRole(user.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle role"
                  >
                    {user.role === 'admin' ? <FiShield /> : <FiUser />}
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </RoleBadge>
                </div>
                <div className="u-email">{user.email}</div>
              </UserInfo>
              <UserStatus $active={user.active}>
                {user.active ? 'Active' : 'Banned'}
              </UserStatus>
              <JoinDate>{user.joined}</JoinDate>
              <RowActions className="u-actions">
                <button title="Edit user"><FiEdit2 /></button>
                <button
                  title={user.active ? 'Ban user' : 'Unban user'}
                  onClick={() => toggleActive(user.id)}
                >
                  {user.active ? <FiUserX /> : <FiUserCheck />}
                </button>
                <button
                  className="danger"
                  title="Delete user"
                  onClick={() => removeUser(user.id)}
                >
                  <FiTrash2 />
                </button>
              </RowActions>
            </UserRow>
          ))
        )}
      </Panel>
    </PageWrapper>
  )
}

export default AdminUsers