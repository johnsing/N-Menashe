import { useState, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiSearch, FiPlay, FiEye, FiClock, FiChevronLeft, FiChevronRight
} from 'react-icons/fi'
import videosData from '../../data/videos.json'
import VideoCard from '../../components/Video/VideoCard'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

// ── Spotlight Hero ───────────────────────────────────────────────
const Spotlight = styled(Link)`
  position: relative;
  display: block;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 32px;
  border: 1px solid #2a2a2a;
  min-height: 420px;

  .spotlight-bg {
    position: absolute;
    inset: 0;
    background-image: url(${props => props.$bg});
    background-size: cover;
    background-position: center;
    transition: transform 0.6s ease;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(10, 10, 10, 0.95) 0%,
        rgba(10, 10, 10, 0.7) 45%,
        rgba(10, 10, 10, 0.25) 100%
      );
    }
  }

  &:hover .spotlight-bg {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    min-height: 340px;
  }
`

const SpotlightContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 48px;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 420px;

  .spotlight-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 6px 16px;
    background: rgba(255, 215, 0, 0.12);
    border: 1px solid rgba(255, 215, 0, 0.35);
    border-radius: 50px;
    color: #ffd700;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 18px;
  }

  .spotlight-title {
    color: #fff;
    font-size: 42px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 14px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .spotlight-meta {
    display: flex;
    align-items: center;
    gap: 18px;
    color: #999;
    font-size: 14px;
    margin-bottom: 28px;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  @media (max-width: 768px) {
    padding: 28px 22px;
    min-height: 340px;

    .spotlight-title { font-size: 26px; }
    .spotlight-meta { font-size: 13px; flex-wrap: wrap; gap: 12px; }
  }
`

const PlayButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  padding: 14px 34px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 50px;
  transition: all 0.3s ease;

  svg { font-size: 18px; }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.35);
  }
`

// ── Controls (search + chips) ────────────────────────────────────
const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
  max-width: 360px;

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    font-size: 16px;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 50px;
    color: #fff;
    font-size: 14px;
    transition: all 0.25s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.5);
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.08);
    }

    &::placeholder { color: #444; }
  }
`

const Chips = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
`

const Chip = styled.button`
  padding: 9px 20px;
  background: ${p => p.$active ? 'linear-gradient(135deg, #ffd700, #f5a623)' : '#1a1a1a'};
  color: ${p => p.$active ? '#0a0a0a' : '#999'};
  border: 1px solid ${p => p.$active ? 'transparent' : '#2a2a2a'};
  border-radius: 50px;
  font-size: 13px;
  font-weight: ${p => p.$active ? '700' : '500'};
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    color: ${p => p.$active ? '#0a0a0a' : '#ffd700'};
  }
`

// ── Category Rows (Netflix style) ────────────────────────────────
const Row = styled.section`
  margin-bottom: 36px;
`

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const RowTitle = styled.h2`
  color: #fff;
  font-size: 19px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 4px;
    height: 18px;
    background: linear-gradient(180deg, #ffd700, #f5a623);
    border-radius: 2px;
  }

  .count {
    color: #555;
    font-size: 13px;
    font-weight: 500;
  }
`

const RowNav = styled.div`
  display: flex;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`

const RowNavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #888;
  font-size: 16px;
  transition: all 0.25s ease;

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.4);
  }
`

const RowScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 4px 2px 12px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  > * {
    flex: 0 0 300px;
    width: 300px;
  }

  @media (max-width: 768px) {
    > * {
      flex: 0 0 240px;
      width: 240px;
    }
  }
`

// ── Grid (when single category / search active) ──────────────────
const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px 16px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #444;

  svg { font-size: 44px; margin-bottom: 14px; }
  p { font-size: 15px; }
`

const formatViews = (n) => {
  if (!n) return '0'
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const videos = videosData.videos
  const featured = videos[0]

  const categories = useMemo(
    () => ['All', ...new Set(videos.map(v => v.category))],
    [videos]
  )

  const filtered = useMemo(() => {
    let result = videos
    if (selectedCategory !== 'All') {
      result = result.filter(v => v.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(v => v.title.toLowerCase().includes(q))
    }
    return result
  }, [videos, selectedCategory, searchQuery])

  const grouped = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery.trim()) return null
    const map = {}
    for (const v of videos) {
      if (!map[v.category]) map[v.category] = []
      map[v.category].push(v)
    }
    return map
  }, [videos, selectedCategory, searchQuery])

  const scrollRow = (id, dir) => {
    const el = document.getElementById(id)
    if (el) el.scrollBy({ left: dir * 640, behavior: 'smooth' })
  }

  return (
    <Container>
      {/* Spotlight */}
      {featured && !searchQuery && selectedCategory === 'All' && (
        <Spotlight to={`/video/${featured.id}`} $bg={featured.thumbnail}>
          <div className="spotlight-bg" />
          <SpotlightContent>
            <span className="spotlight-tag">Featured · {featured.category}</span>
            <h1 className="spotlight-title">{featured.title}</h1>
            <div className="spotlight-meta">
              <span><FiEye /> {formatViews(featured.views)} views</span>
              <span><FiClock /> {featured.duration}</span>
            </div>
            <PlayButton>
              <FiPlay /> Watch Now
            </PlayButton>
          </SpotlightContent>
        </Spotlight>
      )}

      {/* Controls */}
      <ControlsRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBox>
        <Chips>
          {categories.map(cat => (
            <Chip
              key={cat}
              $active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Chip>
          ))}
        </Chips>
      </ControlsRow>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState>
          <FiSearch />
          <p>No videos found. Try a different search or category.</p>
        </EmptyState>
      ) : grouped ? (
        Object.entries(grouped).map(([cat, vids]) => {
          const rowId = `row-${cat.replace(/[^a-zA-Z0-9]/g, '')}`
          return (
            <Row key={cat}>
              <RowHeader>
                <RowTitle>
                  {cat} <span className="count">{vids.length}</span>
                </RowTitle>
                <RowNav>
                  <RowNavBtn onClick={() => scrollRow(rowId, -1)} aria-label="Scroll left">
                    <FiChevronLeft />
                  </RowNavBtn>
                  <RowNavBtn onClick={() => scrollRow(rowId, 1)} aria-label="Scroll right">
                    <FiChevronRight />
                  </RowNavBtn>
                </RowNav>
              </RowHeader>
              <RowScroll id={rowId}>
                {vids.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </RowScroll>
            </Row>
          )
        })
      ) : (
        <VideoGrid>
          {filtered.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </VideoGrid>
      )}
    </Container>
  )
}

export default Videos