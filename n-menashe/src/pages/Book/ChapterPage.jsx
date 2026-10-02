// pages/ChapterPage.jsx
import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  FiArrowLeft, FiChevronLeft, FiChevronRight, FiSettings, FiCopy
} from 'react-icons/fi'
import { getBookBySlug, getChapterVerses } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const ReaderHeader = styled.div`
  position: sticky;
  top: 70px;
  z-index: 100;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 24px;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    top: 60px;
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    top: 56px;
    padding: 10px 12px;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const BookInfo = styled.div`
  min-width: 0;

  .book-name {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chapter-info {
    color: #888;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    .book-name { font-size: 14px; }
    .chapter-info { font-size: 11px; }
  }
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #888;
  font-size: 16px;
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.4);
    background: rgba(255, 215, 0, 0.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`

const LanguageToggle = styled.div`
  display: flex;
  background: #1a1a1a;
  border-radius: 10px;
  padding: 3px;
  border: 1px solid #2a2a2a;

  button {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    transition: all 0.25s ease;

    &.active {
      background: rgba(255, 215, 0, 0.15);
      color: #ffd700;
    }

    &:hover:not(.active) {
      color: #aaa;
    }
  }

  @media (max-width: 480px) {
    button {
      padding: 5px 10px;
      font-size: 12px;
    }
  }
`

const ChapterSelector = styled.div`
  position: relative;

  select {
    appearance: none;
    padding: 8px 32px 8px 14px;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover { border-color: rgba(255, 215, 0, 0.4); }
    &:focus { border-color: #ffd700; }
  }

  &::after {
    content: '▾';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    select {
      padding: 6px 28px 6px 10px;
      font-size: 12px;
    }
  }
`

const ReaderContent = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`

const VerseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$fontSize === 'large' ? '24px' : '16px'};
`

const VerseItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${props => props.$highlighted ? 'rgba(255, 215, 0, 0.05)' : 'transparent'};
  border-left: 3px solid ${props => props.$highlighted ? '#ffd700' : 'transparent'};
  transition: all 0.25s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  &:hover .verse-actions {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px 8px;
    gap: 10px;
    flex-direction: column;
  }
`

const VerseNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;

  @media (max-width: 480px) {
    min-width: 26px;
    height: 26px;
    font-size: 11px;
  }
`

const VerseText = styled.div`
  flex: 1;
  color: #e0e0e0;
  line-height: 1.9;
  font-size: ${props => {
    switch(props.$fontSize) {
      case 'small': return '15px'
      case 'large': return '22px'
      default: return '18px'
    }
  }};

  ${props => props.$isHebrew && `
    direction: rtl;
    text-align: right;
    font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', 'Times New Roman', serif;
    font-size: ${props.$fontSize === 'small' ? '18px' : props.$fontSize === 'large' ? '26px' : '22px'};
    line-height: 2.2;
    color: #f5e6b8;
  `}

  @media (max-width: 768px) {
    font-size: ${props => {
      switch(props.$fontSize) {
        case 'small': return '14px'
        case 'large': return '19px'
        default: return '16px'
      }
    }};

    ${props => props.$isHebrew && `
      font-size: ${props.$fontSize === 'small' ? '16px' : props.$fontSize === 'large' ? '22px' : '19px'};
    `}
  }
`
const VerseActions = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.25s ease;
  flex-shrink: 0;
  align-self: flex-start;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    color: #666;
    font-size: 13px;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 215, 0, 0.1);
      color: #ffd700;
    }
  }
`

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #1a1a1a;
  border-radius: 14px;
  border: 1px solid #2a2a2a;

  @media (max-width: 480px) {
    padding: 12px;
  }
`

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  color: #888;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    border-color: rgba(255, 215, 0, 0.4);
    color: #ffd700;
    background: rgba(255, 215, 0, 0.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`

const ChapterIndicator = styled.div`
  color: #888;
  font-size: 14px;
  font-weight: 500;

  span {
    color: #ffd700;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const SettingsPanel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  min-width: 220px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  z-index: 200;

  .setting-label {
    color: #666;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  .font-sizes {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;

    button {
      flex: 1;
      padding: 8px;
      border-radius: 8px;
      background: #111;
      border: 1px solid #2a2a2a;
      color: #888;
      transition: all 0.25s ease;

      &:hover { color: #ffd700; }
      &.active {
        background: rgba(255, 215, 0, 0.15);
        border-color: #ffd700;
        color: #ffd700;
      }
    }
  }
`

const SettingsWrapper = styled.div`
  position: relative;
`

const ChapterPage = () => {
  const { bookSlug, chapterNumber } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('hebrew')
  const [fontSize, setFontSize] = useState('medium')
  const [showSettings, setShowSettings] = useState(false)
  const [highlightedVerse, setHighlightedVerse] = useState(null)

  useEffect(() => {
    const load = () => {
      const b = getBookBySlug(bookSlug)
      setBook(b)
      setVerses(getChapterVerses(bookSlug, parseInt(chapterNumber)))
      setLoading(false)
    }
    load()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [bookSlug, chapterNumber])

  // Close settings on outside click
  useEffect(() => {
    if (!showSettings) return
    const handleClick = () => setShowSettings(false)
    setTimeout(() => document.addEventListener('click', handleClick), 0)
    return () => document.removeEventListener('click', handleClick)
  }, [showSettings])

  const currentChapter = parseInt(chapterNumber)
  const totalChapters = book?.chapters || 1
  const hasPrev = currentChapter > 1
  const hasNext = currentChapter < totalChapters

  const goToChapter = (num) => {
    navigate(`/chapter/${bookSlug}/${num}`)
  }

  if (loading) {
    return <Container>Loading...</Container>
  }

  if (!book) {
    return (
      <Container>
        <h1 style={{ color: '#ffd700', textAlign: 'center' }}>Chapter not found</h1>
        <Link to="/library" style={{ color: '#888', display: 'block', textAlign: 'center', marginTop: 20 }}>
          Back to Library
        </Link>
      </Container>
    )
  }

  const getVerseText = (verse) => {
    if (language === 'hebrew') return verse.hebrew || verse.english || '—'
    return verse.english || verse.hebrew || '—'
  }

  const handleCopyVerse = async (verse) => {
    const text = `${book.name} ${currentChapter}:${verse.number} — ${getVerseText(verse)}`
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Could not copy verse:', error)
    }
  }

  return (
    <Container>
      <ReaderHeader>
        <HeaderLeft>
          <IconButton as={Link} to={`/book/${bookSlug}`} title="Back to chapters">
            <FiArrowLeft />
          </IconButton>
          <BookInfo>
            <div className="book-name">{book.name}</div>
            <div className="chapter-info">Chapter {currentChapter} of {totalChapters}</div>
          </BookInfo>
        </HeaderLeft>

        <HeaderRight>
          <LanguageToggle>
            <button 
              className={language === 'hebrew' ? 'active' : ''}
              onClick={() => setLanguage('hebrew')}
            >
              עברית
            </button>
            <button 
              className={language === 'english' ? 'active' : ''}
              onClick={() => setLanguage('english')}
            >
              EN
            </button>
          </LanguageToggle>

          <ChapterSelector>
            <select 
              value={currentChapter}
              onChange={(e) => goToChapter(parseInt(e.target.value))}
            >
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>Ch. {num}</option>
              ))}
            </select>
          </ChapterSelector>

          <SettingsWrapper>
            <IconButton 
              onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings) }}
              title="Settings"
            >
              <FiSettings />
            </IconButton>
            {showSettings && (
              <SettingsPanel onClick={(e) => e.stopPropagation()}>
                <div className="setting-label">Font Size</div>
                <div className="font-sizes">
                  <button 
                    className={fontSize === 'small' ? 'active' : ''}
                    onClick={() => setFontSize('small')}
                  >A</button>
                  <button 
                    className={fontSize === 'medium' ? 'active' : ''}
                    onClick={() => setFontSize('medium')}
                  >A</button>
                  <button 
                    className={fontSize === 'large' ? 'active' : ''}
                    onClick={() => setFontSize('large')}
                  >A</button>
                </div>
              </SettingsPanel>
            )}
          </SettingsWrapper>
        </HeaderRight>
      </ReaderHeader>

      <ReaderContent>
        <VerseList $fontSize={fontSize}>
          {verses.map(verse => (
            <VerseItem 
              key={verse.number}
              $highlighted={highlightedVerse === verse.number}
              onClick={() => setHighlightedVerse(
                highlightedVerse === verse.number ? null : verse.number
              )}
            >
              <VerseNumber>{verse.number}</VerseNumber>
              <VerseText 
                $isHebrew={language === 'hebrew'}
                $fontSize={fontSize}
              >
                {getVerseText(verse)}
              </VerseText>
              <VerseActions className="verse-actions">
                <button
                  type="button"
                  title="Copy verse"
                  aria-label={`Copy verse ${verse.number}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleCopyVerse(verse)
                  }}
                >
                  <FiCopy />
                </button>
              </VerseActions>
            </VerseItem>
          ))}
        </VerseList>
      </ReaderContent>

      <NavigationBar>
        <NavButton 
          disabled={!hasPrev}
          onClick={() => goToChapter(currentChapter - 1)}
        >
          <FiChevronLeft /> Previous
        </NavButton>

        <ChapterIndicator>
          Chapter <span>{currentChapter}</span> / {totalChapters}
        </ChapterIndicator>

        <NavButton 
          disabled={!hasNext}
          onClick={() => goToChapter(currentChapter + 1)}
        >
          Next <FiChevronRight />
        </NavButton>
      </NavigationBar>
    </Container>
  )
}

export default ChapterPage