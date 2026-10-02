import { useState, useEffect, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiGrid, FiList, FiChevronRight, FiSearch,
  FiBook, FiLayers, FiBookOpen, FiAlignLeft
} from 'react-icons/fi'
import { getAllCategories, getBibleStats } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

// ── Hero ─────────────────────────────────────────────────────────
const Hero = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  margin-bottom: 28px;
  min-height: 280px;
  display: flex;
  align-items: flex-end;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translateX(-50%) translateY(-50%);
    object-fit: cover;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.92) 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: 240px;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 36px 36px 28px;

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    background: rgba(255, 215, 0, 0.12);
    border: 1px solid rgba(255, 215, 0, 0.35);
    border-radius: 50px;
    color: #ffd700;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 14px;

    svg { font-size: 12px; }
  }

  h1 {
    font-size: 46px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.8));
  }

  .hero-sub {
    color: #aaa;
    font-size: 15px;
    max-width: 520px;
  }

  @media (max-width: 768px) {
    padding: 26px 20px 20px;
    h1 { font-size: 30px; letter-spacing: 2px; }
    .hero-sub { font-size: 13px; }
  }
`

// ── Stats bar ────────────────────────────────────────────────────
const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatCard = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #151515 100%);
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.35);
    transform: translateY(-3px);
  }

  .stat-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .stat-value {
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    line-height: 1.1;
  }

  .stat-label {
    color: #666;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

// ── Controls ─────────────────────────────────────────────────────
const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

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

const ViewToggle = styled.div`
  display: flex;
  gap: 4px;
  background: #1a1a1a;
  border-radius: 50px;
  padding: 4px;
  border: 1px solid #2a2a2a;
  flex-shrink: 0;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 50px;
    color: #666;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.25s ease;

    svg { font-size: 15px; }

    &:hover { color: #ffd700; }

    &.active {
      background: linear-gradient(135deg, #ffd700, #f5a623);
      color: #0a0a0a;
      font-weight: 700;
    }
  }
`

// ── Category cards ───────────────────────────────────────────────
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: ${props => props.$view === 'list' ? '12px' : '18px'};
  animation: ${fadeIn} 0.4s ease-out;
`

const CategoryCard = styled(Link)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
  border: 1px solid #2a2a2a;
  border-radius: 18px;
  padding: ${props => props.$view === 'list' ? '18px 22px' : '30px 26px'};
  display: ${props => props.$view === 'list' ? 'flex' : 'block'};
  align-items: center;
  gap: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .card-watermark {
    position: absolute;
    top: -18px;
    right: 6px;
    font-size: ${props => props.$view === 'list' ? '60px' : '110px'};
    font-weight: 900;
    color: rgba(255, 215, 0, 0.04);
    line-height: 1;
    pointer-events: none;
    transition: color 0.3s ease;
    font-family: serif;
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    transform: ${props => props.$view === 'list' ? 'translateX(6px)' : 'translateY(-5px)'};
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);

    .card-glow { transform: scaleX(1); }
    .card-watermark { color: rgba(255, 215, 0, 0.09); }
    .card-arrow {
      color: #ffd700;
      transform: translateX(6px);
    }
  }

  .card-main {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: ${props => props.$view === 'list' ? 'center' : 'flex-start'};
    gap: ${props => props.$view === 'list' ? '16px' : '0'};
    flex-direction: ${props => props.$view === 'list' ? 'row' : 'column'};
  }

  .card-icon {
    width: ${props => props.$view === 'list' ? '44px' : '52px'};
    height: ${props => props.$view === 'list' ? '44px' : '52px'};
    border-radius: 14px;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-size: ${props => props.$view === 'list' ? '18px' : '22px'};
    flex-shrink: 0;
  }

  .card-body {
    flex: 1;
    min-width: 0;
  }

  .card-name {
    color: #fff;
    font-size: ${props => props.$view === 'list' ? '18px' : '23px'};
    font-weight: 800;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .card-desc {
    color: #777;
    font-size: ${props => props.$view === 'list' ? '13px' : '14px'};
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #555;
    font-size: 12px;
    margin-top: ${props => props.$view === 'list' ? '0' : '14px'};

    svg { color: #ffd700; font-size: 13px; }
  }

  .card-arrow {
    color: #444;
    font-size: ${props => props.$view === 'list' ? '18px' : '22px'};
    transition: all 0.3s ease;
    flex-shrink: 0;
    align-self: ${props => props.$view === 'list' ? 'center' : 'flex-end'};
    margin-top: ${props => props.$view === 'list' ? '0' : '10px'};
  }

  @media (max-width: 480px) {
    padding: 20px 18px;
    .card-watermark { font-size: 70px; }
  }
`

const LoadingSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;

  .skeleton-card {
    background: #1a1a1a;
    border-radius: 18px;
    border: 1px solid #2a2a2a;
    padding: 30px 26px;
    animation: ${pulse} 1.5s ease-in-out infinite;

    .skel-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: #222;
      margin-bottom: 16px;
    }
    .skel-title {
      height: 24px;
      background: #222;
      border-radius: 6px;
      margin-bottom: 10px;
      width: 55%;
    }
    .skel-desc {
      height: 16px;
      background: #222;
      border-radius: 6px;
      width: 85%;
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 70px 20px;
  color: #444;

  svg { font-size: 42px; margin-bottom: 14px; }
  p { font-size: 15px; }
`

const Library = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState({ categories: 0, books: 0, chapters: 0, verses: 0 })

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(r => setTimeout(r, 600))
        setCategories(getAllCategories())
        setStats(getBibleStats())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return categories
    const q = search.toLowerCase()
    return categories.filter(
      c => c.name.toLowerCase().includes(q) ||
           (c.description || '').toLowerCase().includes(q)
    )
  }, [categories, search])

  if (loading) {
    return (
      <Container>
        <Hero>
          <video autoPlay loop muted playsInline>
            <source src="/assets/library-video.mp4" type="video/mp4" />
          </video>
          <HeroContent>
            <div className="hero-eyebrow"><FiBookOpen /> Collection</div>
            <h1>Library</h1>
            <p className="hero-sub">Explore the sacred texts</p>
          </HeroContent>
        </Hero>
        <LoadingSkeleton>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skel-icon" />
              <div className="skel-title" />
              <div className="skel-desc" />
            </div>
          ))}
        </LoadingSkeleton>
      </Container>
    )
  }

  const statItems = [
    { icon: FiLayers, value: stats.categories, label: 'Sections' },
    { icon: FiBook, value: stats.books, label: 'Books' },
    { icon: FiBookOpen, value: stats.chapters, label: 'Chapters' },
    { icon: FiAlignLeft, value: stats.verses.toLocaleString(), label: 'Verses' },
  ]

  return (
    <Container>
      <Hero>
        <video autoPlay loop muted playsInline>
          <source src="/assets/library-video.mp4" type="video/mp4" />
        </video>
        <HeroContent>
          <div className="hero-eyebrow"><FiBookOpen /> Collection</div>
          <h1>Library</h1>
          <p className="hero-sub">
            Explore the sacred texts — browse by section, book, and chapter,
            in Hebrew and English.
          </p>
        </HeroContent>
      </Hero>

      <StatsBar>
        {statItems.map(item => (
          <StatCard key={item.label}>
            <div className="stat-icon"><item.icon /></div>
            <div>
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          </StatCard>
        ))}
      </StatsBar>

      <ControlsRow>
        <SearchBox>
          <FiSearch />
          <input
            type="text"
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <ViewToggle>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid /> Grid
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            <FiList /> List
          </button>
        </ViewToggle>
      </ControlsRow>

      {filtered.length === 0 ? (
        <EmptyState>
          <FiSearch />
          <p>No sections found for "{search}"</p>
        </EmptyState>
      ) : (
        <CategoryGrid $view={viewMode}>
          {filtered.map((category, idx) => (
            <CategoryCard
              key={category.id}
              to={`/category/${category.slug}`}
              $view={viewMode}
            >
              <span className="card-watermark">{idx + 1}</span>
              <span className="card-glow" />
              <div className="card-main">
                <div className="card-icon"><FiBook /></div>
                <div className="card-body">
                  <div className="card-name">{category.name}</div>
                  <div className="card-desc">
                    {category.description || `Explore ${category.name}`}
                  </div>
                  <div className="card-meta">
                    <FiBookOpen /> {category.books?.length || 0} books
                  </div>
                </div>
              </div>
              <FiChevronRight className="card-arrow" />
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}
    </Container>
  )
}

export default Library