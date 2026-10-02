// pages/Library.jsx
import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { FiGrid, FiList, FiChevronRight } from 'react-icons/fi'
import { getAllCategories } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const LibraryContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const PageHeader = styled.div`
  margin-bottom: 32px;
  border-radius: 16px;
  padding: 60px 24px;
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
    object-fit: cover;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%);
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    z-index: 2;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.8));
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 160px;
    h1 { font-size: 32px; letter-spacing: 2px; }
  }

  @media (max-width: 480px) {
    padding: 30px 16px;
    min-height: 130px;
    h1 { font-size: 24px; letter-spacing: 1px; }
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`

const ViewToggle = styled.div`
  display: flex;
  gap: 4px;
  background: #1a1a1a;
  border-radius: 10px;
  padding: 4px;
  border: 1px solid #2a2a2a;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    color: #666;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.25s ease;

    &:hover { color: #ffd700; }
    &.active {
      background: rgba(255, 215, 0, 0.15);
      color: #ffd700;
    }

    svg { font-size: 16px; }
  }
`

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))'};
  gap: ${props => props.$view === 'list' ? '12px' : '20px'};
  animation: ${fadeIn} 0.4s ease-out;
`

const CategoryCard = styled(Link)`
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border-radius: 14px;
  padding: ${props => props.$view === 'list' ? '20px 24px' : '32px 28px'};
  border: 1px solid #2a2a2a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: ${props => props.$view === 'list' ? 'flex' : 'block'};
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    transform: ${props => props.$view === 'list' ? 'translateX(6px)' : 'translateY(-4px)'};
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);

    &::before { transform: scaleX(1); }
  }

  .category-content {
    flex: 1;
    display: flex;
    flex-direction: ${props => props.$view === 'list' ? 'row' : 'column'};
    align-items: ${props => props.$view === 'list' ? 'center' : 'flex-start'};
    gap: ${props => props.$view === 'list' ? '24px' : '0'};
    width: 100%;
  }

  .category-info { flex: 1; }

  .category-name {
    color: #fff;
    font-size: ${props => props.$view === 'list' ? '20px' : '24px'};
    font-weight: 700;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }

  .category-description {
    color: #888;
    font-size: ${props => props.$view === 'list' ? '14px' : '15px'};
    line-height: 1.6;
  }

  .arrow-icon {
    color: #444;
    font-size: ${props => props.$view === 'list' ? '20px' : '22px'};
    transition: all 0.3s ease;
    flex-shrink: 0;
    margin-left: ${props => props.$view === 'list' ? 'auto' : '0'};
    margin-top: ${props => props.$view === 'list' ? '0' : '16px'};
    align-self: ${props => props.$view === 'list' ? 'center' : 'flex-end'};
  }

  &:hover .arrow-icon {
    color: #ffd700;
    transform: translateX(6px);
  }

  @media (max-width: 768px) {
    padding: ${props => props.$view === 'list' ? '16px 20px' : '24px 22px'};

    .category-name {
      font-size: ${props => props.$view === 'list' ? '18px' : '20px'};
    }
    .category-description {
      font-size: ${props => props.$view === 'list' ? '13px' : '14px'};
    }
  }

  @media (max-width: 480px) {
    .category-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .arrow-icon {
      margin-left: 0;
      margin-top: 12px;
      align-self: flex-end;
    }
  }
`

const LoadingSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  .skeleton-card {
    background: #1a1a1a;
    border-radius: 14px;
    border: 1px solid #2a2a2a;
    padding: 32px 28px;
    animation: ${pulse} 1.5s ease-in-out infinite;

    .skeleton-title {
      height: 28px;
      background: #2a2a2a;
      border-radius: 4px;
      margin-bottom: 12px;
      width: 60%;
    }
    .skeleton-desc {
      height: 18px;
      background: #2a2a2a;
      border-radius: 4px;
      width: 80%;
    }
  }
`

const Library = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(r => setTimeout(r, 600))
        setCategories(getAllCategories())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <LibraryContainer>
        <PageHeader>
          <video autoPlay loop muted playsInline>
            <source src="/assets/library-video.mp4" type="video/mp4" />
          </video>
          <h1>Library</h1>
        </PageHeader>
        <LoadingSkeleton>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-title" />
              <div className="skeleton-desc" />
            </div>
          ))}
        </LoadingSkeleton>
      </LibraryContainer>
    )
  }

  return (
    <LibraryContainer>
      <PageHeader>
        <video autoPlay loop muted playsInline>
          <source src="/assets/library-video.mp4" type="video/mp4" />
        </video>
        <h1>Library</h1>
      </PageHeader>

      <Controls>
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
      </Controls>

      <CategoryGrid $view={viewMode}>
        {categories.map(category => (
          <CategoryCard 
            key={category.id} 
            to={`/category/${category.slug}`}
            $view={viewMode}
          >
            <div className="category-content">
              <div className="category-info">
                <div className="category-name">{category.name}</div>
                <div className="category-description">
                  {category.description || `Explore ${category.name}`}
                </div>
              </div>
              <FiChevronRight className="arrow-icon" />
            </div>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </LibraryContainer>
  )
}

export default Library