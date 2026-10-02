import { useState, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import {
  FiArrowLeft, FiChevronRight, FiBookOpen, FiAlignLeft, FiSearch
} from 'react-icons/fi'
import { getCategoryBySlug } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 13px;
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 50px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  transition: all 0.25s ease;

  &:hover {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.3);
  }
`

// ── Category Hero ────────────────────────────────────────────────
const Hero = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  padding: 44px 36px;
  margin-bottom: 26px;
  overflow: hidden;

  .hero-watermark {
    position: absolute;
    bottom: -34px;
    right: 10px;
    font-size: 150px;
    font-weight: 900;
    color: rgba(255, 215, 0, 0.04);
    line-height: 1;
    pointer-events: none;
    font-family: serif;
  }

  .hero-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
  }

  @media (max-width: 768px) {
    padding: 30px 22px;
    .hero-watermark { font-size: 90px; }
  }
`

const HeroEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 50px;
  color: #ffd700;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;

  svg { font-size: 12px; }
`

const HeroTitle = styled.h1`
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 28px;
    letter-spacing: 1px;
  }
`

const HeroDesc = styled.p`
  color: #888;
  font-size: 15px;
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 18px;
`

const HeroStats = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: #111;
    border: 1px solid #2a2a2a;
    border-radius: 50px;
    color: #888;
    font-size: 13px;

    svg { color: #ffd700; font-size: 13px; }
  }
`

// ── Search ───────────────────────────────────────────────────────
const SearchBox = styled.div`
  position: relative;
  margin-bottom: 22px;

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
    padding: 13px 16px 13px 44px;
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

// ── Book cards ───────────────────────────────────────────────────
const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const BookCard = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #151515 100%);
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .book-num {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 52px;
    font-weight: 900;
    color: rgba(255, 215, 0, 0.05);
    line-height: 1;
    pointer-events: none;
    font-family: serif;
    transition: color 0.3s ease;
  }

  .book-glow {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #ffd700, #f5a623);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    transform: translateX(6px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);

    .book-num { color: rgba(255, 215, 0, 0.1); }
    .book-glow { transform: scaleY(1); }
    .book-arrow { color: #ffd700; transform: translateX(4px); }
  }
`

const BookIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 215, 0, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 20px;
  flex-shrink: 0;
`

const BookInfo = styled.div`
  flex: 1;
  min-width: 0;

  .book-name {
    color: #fff;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .book-english {
    color: #777;
    font-size: 13px;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  .book-meta {
    display: flex;
    gap: 14px;
    color: #555;
    font-size: 12px;

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      svg { color: #ffd700; font-size: 12px; }
    }
  }

  @media (max-width: 480px) {
    .book-name { font-size: 16px; }
  }
`

const BookArrow = styled(FiChevronRight)`
  color: #444;
  font-size: 20px;
  flex-shrink: 0;
  transition: all 0.3s ease;
`

const NotFound = styled.div`
  text-align: center;
  padding: 70px 20px;

  h1 {
    color: #ffd700;
    font-size: 28px;
    margin-bottom: 16px;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #444;

  svg { font-size: 38px; margin-bottom: 12px; }
  p { font-size: 14px; }
`

const CategoryPage = () => {
  const { slug } = useParams()
  const [search, setSearch] = useState('')

  const category = getCategoryBySlug(slug)

  const filtered = useMemo(() => {
    if (!category) return []
    if (!search.trim()) return category.books
    const q = search.toLowerCase()
    return category.books.filter(
      b => b.name.toLowerCase().includes(q) ||
           (b.englishName || '').toLowerCase().includes(q)
    )
  }, [category, search])

  if (!category) {
    return (
      <Container>
        <NotFound>
          <h1>Category not found</h1>
          <BackButton to="/library">
            <FiArrowLeft /> Back to Library
          </BackButton>
        </NotFound>
      </Container>
    )
  }

  const totalVerses = category.books.reduce((sum, b) => sum + (b.verses || 0), 0)

  return (
    <Container>
      <BackButton to="/library">
        <FiArrowLeft /> Back to Library
      </BackButton>

      <Hero>
        <span className="hero-glow" />
        <span className="hero-watermark">{category.name[0]}</span>
        <HeroEyebrow><FiBookOpen /> Section</HeroEyebrow>
        <HeroTitle>{category.name}</HeroTitle>
        {category.description && <HeroDesc>{category.description}</HeroDesc>}
        <HeroStats>
          <span><FiBookOpen /> {category.books.length} books</span>
          <span><FiAlignLeft /> {totalVerses.toLocaleString()} verses</span>
        </HeroStats>
      </Hero>

      <SearchBox>
        <FiSearch />
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBox>

      {filtered.length === 0 ? (
        <EmptyState>
          <FiSearch />
          <p>No books found for "{search}"</p>
        </EmptyState>
      ) : (
        <BookList>
          {filtered.map((book, idx) => (
            <BookCard key={book.id} to={`/book/${book.slug}`}>
              <span className="book-num">{String(idx + 1).padStart(2, '0')}</span>
              <span className="book-glow" />
              <BookIcon><FiBookOpen /></BookIcon>
              <BookInfo>
                <div className="book-name">{book.name}</div>
                <div className="book-english">{book.englishName}</div>
                <div className="book-meta">
                  <span><FiBookOpen /> {book.chapters} chapters</span>
                  <span><FiAlignLeft /> {book.verses?.toLocaleString()} verses</span>
                </div>
              </BookInfo>
              <BookArrow className="book-arrow" />
            </BookCard>
          ))}
        </BookList>
      )}
    </Container>
  )
}

export default CategoryPage