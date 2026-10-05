import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import {
  FiBook, FiBookOpen, FiLayers, FiAlignLeft,
  FiEdit2, FiPlus, FiChevronRight, FiExternalLink
} from 'react-icons/fi'
import { getAllCategories, getBibleStats } from '../../utils/bible'

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

const HeadActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const GhostBtn = styled(Link)`
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

  svg { font-size: 14px; }

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.35);
  }
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
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  svg { font-size: 15px; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.3);
    transform: translateY(-2px);
  }

  .s-icon {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    background: rgba(255, 215, 0, 0.09);
    border: 1px solid rgba(255, 215, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffd700;
    font-size: 18px;
    flex-shrink: 0;
  }

  .s-value {
    color: #fff;
    font-size: 22px;
    font-weight: 900;
    line-height: 1.1;
  }

  .s-label {
    color: #555;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const SectionLabel = styled.h3`
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
`

const CatCard = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s ease;

  &:hover { border-color: rgba(255, 215, 0, 0.3); }

  .cat-head {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    cursor: pointer;
    user-select: none;

    .c-icon {
      width: 42px;
      height: 42px;
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

    .c-info {
      flex: 1;
      min-width: 0;

      .c-name {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 2px;
      }

      .c-meta {
        color: #555;
        font-size: 12px;
        display: flex;
        gap: 12px;

        span {
          display: inline-flex;
          align-items: center;
          gap: 4px;

          svg { font-size: 11px; color: #ffd700; }
        }
      }
    }

    .c-arrow {
      color: #444;
      font-size: 18px;
      transition: all 0.3s ease;
      flex-shrink: 0;

      &.open { transform: rotate(90deg); color: #ffd700; }
    }

    .c-edit {
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
      flex-shrink: 0;

      &:hover {
        color: #ffd700;
        border-color: rgba(255, 215, 0, 0.35);
      }
    }
  }
`

const BookChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 20px 18px;
  border-top: 1px solid #181818;
  padding-top: 16px;
  margin: 0 0;

  .b-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 13px;
    background: #161616;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #888;
    font-size: 12px;
    transition: all 0.2s ease;

    &:hover {
      color: #ffd700;
      border-color: rgba(255, 215, 0, 0.35);
    }

    .b-ch {
      color: #444;
      font-size: 10px;
    }
  }
`

const CatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const AdminLibrary = () => {
  const [openCats, setOpenCats] = useState({})
  const categories = getAllCategories()
  const stats = getBibleStats()

  const toggleCat = (id) => {
    setOpenCats(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const statItems = [
    { icon: FiLayers, value: stats.categories, label: 'Sections' },
    { icon: FiBook, value: stats.books, label: 'Books' },
    { icon: FiBookOpen, value: stats.chapters, label: 'Chapters' },
    { icon: FiAlignLeft, value: stats.verses.toLocaleString(), label: 'Verses' },
  ]

  return (
    <PageWrapper>
      <PageHead>
        <div>
          <h2>Library Management</h2>
          <div className="sub">Bible structure, categories, and books</div>
        </div>
        <HeadActions>
          <GhostBtn to="/library">
            <FiExternalLink /> View Site Library
          </GhostBtn>
          <PrimaryBtn to="/admin/library/upload"><FiPlus /> Add Content</PrimaryBtn>
        </HeadActions>
      </PageHead>

      <StatsGrid>
        {statItems.map(item => (
          <StatCard key={item.label}>
            <div className="s-icon"><item.icon /></div>
            <div>
              <div className="s-value">{item.value}</div>
              <div className="s-label">{item.label}</div>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <SectionLabel>Sections & Books</SectionLabel>

      <CatList>
        {categories.map(cat => {
          const isOpen = openCats[cat.id]
          const verses = cat.books.reduce((sum, b) => sum + (b.verses || 0), 0)
          return (
            <CatCard key={cat.id}>
              <div className="cat-head" onClick={() => toggleCat(cat.id)}>
                <div className="c-icon"><FiBook /></div>
                <div className="c-info">
                  <div className="c-name">{cat.name}</div>
                  <div className="c-meta">
                    <span><FiBook /> {cat.books.length} books</span>
                    <span><FiAlignLeft /> {verses.toLocaleString()} verses</span>
                  </div>
                </div>
                <button
                  className="c-edit"
                  title="Edit section"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiEdit2 />
                </button>
                <FiChevronRight className={`c-arrow ${isOpen ? 'open' : ''}`} />
              </div>
              {isOpen && (
                <BookChips>
                  {cat.books.map(book => (
                    <span key={book.id} className="b-chip">
                      {book.name}
                      <span className="b-ch">{book.chapters}ch</span>
                    </span>
                  ))}
                </BookChips>
              )}
            </CatCard>
          )
        })}
      </CatList>
    </PageWrapper>
  )
}


export default AdminLibrary