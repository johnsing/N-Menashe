import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiMusic,
  FiPlay, FiClock
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

const TrackRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);

    .t-actions { opacity: 1; }
  }

  .t-num {
    width: 30px;
    color: #3a3a3a;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    flex-shrink: 0;
  }

  .t-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255, 215, 0, 0.08);
    border: 1px solid rgba(255, 215, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-size: 17px;
    flex-shrink: 0;
  }

  .t-info {
    flex: 1;
    min-width: 0;

    .t-title {
      color: #ddd;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .t-artist {
      color: #555;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .t-cat {
    display: none;
    padding: 4px 12px;
    background: #161616;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #888;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;

    @media (min-width: 700px) {
      display: inline-flex;
    }
  }

  .t-plays {
    display: none;
    color: #ffd700;
    font-size: 12px;
    font-weight: 700;
    width: 60px;
    text-align: right;
    flex-shrink: 0;

    @media (min-width: 560px) {
      display: block;
    }
  }

  .t-dur {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #555;
    font-size: 12px;
    width: 52px;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .t-actions {
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
      font-size: 13px;
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
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #3a3a3a;

  svg { font-size: 40px; margin-bottom: 12px; }
  p { font-size: 14px; }
`

const formatPlays = (n) => {
  if (!n) return '0'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

const initialTracks = [
  { id: 1, title: 'Shalom Aleichem', artist: 'Traditional', category: 'Shabbat', plays: 15400, duration: '4:32' },
  { id: 2, title: 'Avinu Malkeinu', artist: 'High Holidays Collection', category: 'Prayer', plays: 23800, duration: '6:15' },
  { id: 3, title: 'Shir Hashirim — Instrumental', artist: 'N-Menashe Ensemble', category: 'Inspiration', plays: 41200, duration: '8:04' },
  { id: 4, title: 'Erev Shel Shoshanim', artist: 'Traditional', category: 'Israeli', plays: 18900, duration: '3:48' },
  { id: 5, title: 'Yerushalayim Shel Zahav', artist: 'Naomi Shemer', category: 'Israeli', plays: 52300, duration: '5:21' },
  { id: 6, title: 'Hatikvah', artist: 'Traditional', category: 'Israeli', plays: 67800, duration: '3:05' },
]

const AdminAudio = () => {
  const [tracks, setTracks] = useState(initialTracks)
  const [search, setSearch] = useState('')

  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.artist.toLowerCase().includes(search.toLowerCase())
  )

  const totalPlays = tracks.reduce((sum, t) => sum + t.plays, 0)

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Audio Management</h2>
          <div className="sub">Manage tracks, playlists, and audio content</div>
        </div>
        <PrimaryBtn><FiPlus /> Add Track</PrimaryBtn>
      </PageHead>

      <FilterRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search tracks or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <StatsRow>
          <span className="stat-pill"><FiMusic /> <b>{tracks.length}</b> Tracks</span>
          <span className="stat-pill"><FiPlay /> <b>{formatPlays(totalPlays)}</b> Total Plays</span>
        </StatsRow>
      </FilterRow>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState>
            <FiMusic />
            <p>No tracks found.</p>
          </EmptyState>
        ) : (
          filtered.map((track, i) => (
            <TrackRow key={track.id}>
              <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="t-icon"><FiMusic /></div>
              <div className="t-info">
                <div className="t-title">{track.title}</div>
                <div className="t-artist">{track.artist}</div>
              </div>
              <span className="t-cat">{track.category}</span>
              <span className="t-plays">{formatPlays(track.plays)}</span>
              <span className="t-dur"><FiClock /> {track.duration}</span>
              <div className="t-actions">
                <button title="Edit"><FiEdit2 /></button>
                <button
                  className="danger"
                  title="Delete"
                  onClick={() => setTracks(tracks.filter(t => t.id !== track.id))}
                >
                  <FiTrash2 />
                </button>
              </div>
            </TrackRow>
          ))
        )}
      </Panel>
    </PageWrapper>
  )
}

export default AdminAudio