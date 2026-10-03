import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiEye, FiVideo, FiFileText, FiUsers,
  FiTrendingUp, FiTrendingDown, FiPlus, FiClock,
  FiMoreHorizontal, FiEdit2, FiTrash2, FiArrowUpRight
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  animation: ${fadeIn} 0.4s ease-out;
`

// ── Page header ──────────────────────────────────────────────────
const PageHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h2 {
    color: #fff;
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 4px;
  }

  .sub {
    color: #666;
    font-size: 13px;
  }
`

const HeadActions = styled.div`
  display: flex;
  gap: 10px;
`

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.25s ease;

  svg { font-size: 15px; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  background: #141414;
  border: 1px solid #242424;
  color: #999;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.25s ease;

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.35);
  }
`

// ── Stat cards ───────────────────────────────────────────────────
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 22px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(255, 215, 0, 0.3);
    transform: translateY(-3px);
  }

  .stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .stat-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: rgba(255, 215, 0, 0.09);
    border: 1px solid rgba(255, 215, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-size: 20px;
  }

  .stat-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 700;
    background: ${props => props.$up ? 'rgba(81, 207, 102, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
    color: ${props => props.$up ? '#51cf66' : '#ff6b6b'};
    border: 1px solid ${props => props.$up ? 'rgba(81, 207, 102, 0.25)' : 'rgba(255, 107, 107, 0.25)'};

    svg { font-size: 11px; }
  }

  .stat-value {
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    color: #555;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }
`

// ── Chart + Top content ──────────────────────────────────────────
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const Panel = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 22px;
`

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h3 {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: '';
      width: 3px;
      height: 15px;
      background: #ffd700;
      border-radius: 2px;
    }
  }

  .panel-link {
    color: #555;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 3px;
    transition: color 0.25s ease;

    &:hover { color: #ffd700; }
  }
`

const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 190px;
  padding-top: 10px;

  @media (max-width: 560px) {
    gap: 6px;
  }
`

const BarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  justify-content: flex-end;

  .bar-value {
    color: ${props => props.$top ? '#ffd700' : '#444'};
    font-size: 10px;
    font-weight: 700;
    opacity: ${props => props.$top ? 1 : 0};
    transition: opacity 0.2s ease;
  }

  &:hover .bar-value { opacity: 1; }

  .bar {
    width: 100%;
    max-width: 42px;
    height: ${props => props.$h}%;
    min-height: 6px;
    border-radius: 8px 8px 4px 4px;
    background: ${props => props.$top
      ? 'linear-gradient(180deg, #ffd700, #b8860b)'
      : 'linear-gradient(180deg, #2a2a2a, #1c1c1c)'};
    transition: all 0.25s ease;
    cursor: pointer;
  }

  &:hover .bar {
    background: linear-gradient(180deg, #ffd700, #f5a623);
    transform: scaleY(1.02);
  }

  .bar-day {
    color: #444;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }
`

const TopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const TopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  transition: background 0.25s ease;
  cursor: pointer;

  &:hover { background: rgba(255, 255, 255, 0.02); }

  .rank {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: ${props => props.$gold ? 'linear-gradient(135deg, #ffd700, #f5a623)' : '#1a1a1a'};
    border: 1px solid ${props => props.$gold ? 'transparent' : '#242424'};
    color: ${props => props.$gold ? '#0a0a0a' : '#555'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .thumb {
    width: 62px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background: #1a1a1a;
    border: 1px solid #242424;
    overflow: hidden;
    flex-shrink: 0;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .info {
    flex: 1;
    min-width: 0;

    .title {
      color: #ddd;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .meta {
      color: #444;
      font-size: 11px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .views {
    color: #ffd700;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
`

// ── Recent table ─────────────────────────────────────────────────
const TableWrap = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;

  th {
    text-align: left;
    color: #444;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 14px;
    border-bottom: 1px solid #1e1e1e;
    white-space: nowrap;
  }

  td {
    padding: 13px 14px;
    border-bottom: 1px solid #161616;
    vertical-align: middle;
  }

  tbody tr {
    transition: background 0.2s ease;

    &:hover { background: rgba(255, 255, 255, 0.015); }
    &:last-child td { border-bottom: none; }
  }
`

const TableVideo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;

  .t-thumb {
    width: 74px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background: #1a1a1a;
    border: 1px solid #242424;
    overflow: hidden;
    flex-shrink: 0;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .t-title {
    color: #ddd;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  background: ${props => {
    if (props.$status === 'published') return 'rgba(81, 207, 102, 0.1)'
    if (props.$status === 'draft') return 'rgba(255, 215, 0, 0.1)'
    return 'rgba(255, 107, 107, 0.1)'
  }};
  color: ${props => {
    if (props.$status === 'published') return '#51cf66'
    if (props.$status === 'draft') return '#ffd700'
    return '#ff6b6b'
  }};
  border: 1px solid ${props => {
    if (props.$status === 'published') return 'rgba(81, 207, 102, 0.25)'
    if (props.$status === 'draft') return 'rgba(255, 215, 0, 0.25)'
    return 'rgba(255, 107, 107, 0.25)'
  }};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`

const RowActions = styled.div`
  display: flex;
  gap: 6px;

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

const formatViews = (n) => {
  if (!n) return '0'
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

// ── Sample data (replace with Supabase later) ────────────────────
const weeklyData = [
  { day: 'Mon', views: 4200 },
  { day: 'Tue', views: 5800 },
  { day: 'Wed', views: 3900 },
  { day: 'Thu', views: 7200 },
  { day: 'Fri', views: 8900 },
  { day: 'Sat', views: 12400 },
  { day: 'Sun', views: 6800 },
]

const topVideos = [
  { id: 'v3', title: 'Psalms of David', views: 32100, duration: '25:10', thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg' },
  { id: 'v4', title: 'Hebrew Reading Practice', views: 22150, duration: '15:45', thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg' },
  { id: 'v6', title: 'Understanding Prayer', views: 18700, duration: '19:55', thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg' },
  { id: 'v1', title: 'Introduction to Torah Study', views: 15420, duration: '12:34', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' },
  { id: 'v5', title: 'Jewish Art History', views: 12400, duration: '22:18', thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg' },
]

const recentVideos = [
  { id: 'v6', title: 'Understanding Prayer', category: 'Prayer', views: 18700, status: 'published', date: 'Oct 2, 2026', thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg' },
  { id: 'v5', title: 'Jewish Art History', category: 'Art', views: 12400, status: 'published', date: 'Sep 30, 2026', thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg' },
  { id: 'v4', title: 'Hebrew Reading Practice', category: 'Education', views: 22150, status: 'draft', date: 'Sep 28, 2026', thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg' },
  { id: 'v7', title: 'Shabbat Traditions', category: 'Torah', views: 0, status: 'draft', date: 'Sep 25, 2026', thumbnail: '' },
]

const Dashboard = () => {
  const maxViews = Math.max(...weeklyData.map(d => d.views))
  const peakDay = weeklyData.find(d => d.views === maxViews)?.day

  const stats = [
    { icon: FiEye, value: '84.2K', label: 'Total Views', trend: '+12.4%', up: true },
    { icon: FiVideo, value: '36', label: 'Videos', trend: '+3', up: true },
    { icon: FiFileText, value: '128', label: 'Posts', trend: '+8', up: true },
    { icon: FiUsers, value: '1,204', label: 'Users', trend: '-2.1%', up: false },
  ]

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Welcome back, Admin</h2>
          <div className="sub">Here's what's happening across your platform today.</div>
        </div>
        <HeadActions>
          <GhostBtn>Export Report</GhostBtn>
          <PrimaryBtn to="/admin/videos"><FiPlus /> Add Content</PrimaryBtn>
        </HeadActions>
      </PageHead>

      {/* Stats */}
      <StatsGrid>
        {stats.map(stat => (
          <StatCard key={stat.label} $up={stat.up}>
            <div className="stat-top">
              <div className="stat-icon"><stat.icon /></div>
              <span className="stat-trend">
                {stat.up ? <FiTrendingUp /> : <FiTrendingDown />}
                {stat.trend}
              </span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </StatCard>
        ))}
      </StatsGrid>

      {/* Chart + Top content */}
      <TwoCol>
        <Panel>
          <PanelHead>
            <h3>Weekly Views</h3>
            <Link className="panel-link" to="/admin/videos">
              Details <FiArrowUpRight />
            </Link>
          </PanelHead>
          <Chart>
            {weeklyData.map(d => (
              <BarCol
                key={d.day}
                $h={(d.views / maxViews) * 100}
                $top={d.day === peakDay}
              >
                <span className="bar-value">{formatViews(d.views)}</span>
                <div className="bar" />
                <span className="bar-day">{d.day}</span>
              </BarCol>
            ))}
          </Chart>
        </Panel>

        <Panel>
          <PanelHead>
            <h3>Top Content</h3>
            <Link className="panel-link" to="/admin/videos">
              All <FiArrowUpRight />
            </Link>
          </PanelHead>
          <TopList>
            {topVideos.map((v, i) => (
              <TopItem key={v.id} $gold={i < 3}>
                <span className="rank">{i + 1}</span>
                <div className="thumb">
                  {v.thumbnail && <img src={v.thumbnail} alt={v.title} loading="lazy" />}
                </div>
                <div className="info">
                  <div className="title">{v.title}</div>
                  <div className="meta"><FiClock /> {v.duration}</div>
                </div>
                <span className="views">{formatViews(v.views)}</span>
              </TopItem>
            ))}
          </TopList>
        </Panel>
      </TwoCol>

      {/* Recent content table */}
      <Panel>
        <PanelHead>
          <h3>Recent Content</h3>
          <Link className="panel-link" to="/admin/videos">
            Manage all <FiArrowUpRight />
          </Link>
        </PanelHead>
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>Video</th>
                <th>Category</th>
                <th>Views</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentVideos.map(v => (
                <tr key={v.id}>
                  <td>
                    <TableVideo>
                      <div className="t-thumb">
                        {v.thumbnail && <img src={v.thumbnail} alt={v.title} loading="lazy" />}
                      </div>
                      <span className="t-title">{v.title}</span>
                    </TableVideo>
                  </td>
                  <td>
                    <span style={{ color: '#888', fontSize: 13 }}>{v.category}</span>
                  </td>
                  <td>
                    <span style={{ color: '#ffd700', fontSize: 13, fontWeight: 700 }}>
                      {formatViews(v.views)}
                    </span>
                  </td>
                  <td>
                    <StatusBadge $status={v.status}>
                      {v.status === 'published' ? 'Published' : 'Draft'}
                    </StatusBadge>
                  </td>
                  <td>
                    <span style={{ color: '#555', fontSize: 12 }}>{v.date}</span>
                  </td>
                  <td>
                    <RowActions>
                      <button title="Edit"><FiEdit2 /></button>
                      <button className="danger" title="Delete"><FiTrash2 /></button>
                      <button title="More"><FiMoreHorizontal /></button>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </Panel>
    </PageWrapper>
  )
}

export default Dashboard