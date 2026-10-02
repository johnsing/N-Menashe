import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft, FiChevronLeft, FiChevronRight,
  FiSettings, FiCopy, FiCheck
} from 'react-icons/fi'
import { getBookBySlug, getChapterVerses } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

// ── Sticky Reader Toolbar ────────────────────────────────────────
const Toolbar = styled.div`
  position: sticky;
  top: 80px;
  z-index: 100;
  background: rgba(16, 16, 16, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 16px;
  padding: 12px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    top: 68px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    top: 62px;
  }
`

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #888;
  font-size: 16px;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    color: #ffd700;
    border-color: rgba(255, 215, 0, 0.4);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const BookInfo = styled.div`
  min-width: 0;

  .bk-name {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bk-chapter {
    color: #666;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    .bk-name { font-size: 14px; }
  }
`

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const LangToggle = styled.div`
  display: flex;
  background: #1a1a1a;
  border-radius: 10px;
  padding: 3px;
  border: 1px solid #2a2a2a;

  button {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #666;
    transition: all 0.25s ease;

    &.active {
      background: linear-gradient(135deg, #ffd700, #f5a623);
      color: #0a0a0a;
    }

    &:hover:not(.active) { color: #aaa; }
  }

  @media (max-width: 480px) {
    button { padding: 5px 10px; font-size: 12px; }
  }
`

const ChapterSelect = styled.div`
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
    &:focus { border-color: #ffd700; outline: none; }
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
    select { padding: 6px 26px 6px 10px; font-size: 12px; }
  }
`

const SettingsWrapper = styled.div`
  position: relative;
`

const SettingsPanel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  padding: 16px;
  min-width: 220px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55);
  z-index: 200;

  .setting-label {
    color: #555;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .font-sizes {
    display: flex;
    gap: 6px;

    button {
      flex: 1;
      padding: 9px;
      border-radius: 10px;
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

// ── Reading Area ─────────────────────────────────────────────────
const ReadingCard = styled.div`
  position: relative;
  background: linear-gradient(180deg, #161616 0%, #131313 100%);
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  padding: 40px 44px;
  margin-bottom: 24px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
  }

  @media (max-width: 768px) {
    padding: 24px 18px;
    border-radius: 14px;
  }
`

const ChapterHeading = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 22px;
  border-bottom: 1px solid #2a2a2a;

  .ch-label {
    color: #555;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 6px;
  }

  .ch-number {
    font-size: 40px;
    font-weight: 900;
    background: linear-gradient(135deg, #ffd700, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  @media (max-width: 768px) {
    .ch-number { font-size: 30px; }
  }
`

const VerseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$fontSize === 'large' ? '26px' : '18px'};
`

const VerseItem = styled.div`
  display: flex;
  gap: 16px;
  padding: ${props => props.$highlighted ? '18px 20px' : '10px 14px'};
  border-radius: 14px;
  background: ${props => props.$highlighted ? 'rgba(255, 215, 0, 0.06)' : 'transparent'};
  border-left: 3px solid ${props => props.$highlighted ? '#ffd700' : 'transparent'};
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.02);

    .verse-actions { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: ${props => props.$highlighted ? '14px 12px' : '8px 8px'};
    gap: 12px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`

const VerseNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: #ffd700;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;

  @media (max-width: 480px) {
    min-width: 28px;
    height: 28px;
    font-size: 11px;
  }
`

const VerseText = styled.div`
  flex: 1;
  color: #e2e2e2;
  line-height: 1.95;
  font-size: ${props => {
    switch (props.$fontSize) {
      case 'small': return '15px'
      case 'large': return '22px'
      default: return '18px'
    }
  }};

  ${props => props.$isHebrew && `
    direction: rtl;
    text-align: right;
    font-family: 'David', 'SBL Hebrew', 'Noto Serif Hebrew', 'Times New Roman', serif;
    font-size: ${props.$fontSize === 'small' ? '19px' : props.$fontSize === 'large' ? '27px' : '23px'};
    line-height: 2.2;
    color: #f5e6b8;
  `}

  @media (max-width: 768px) {
    font-size: ${props => {
      switch (props.$fontSize) {
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
    width: 30px;
    height: 30px;
    border-radius: 8px;
    color: #666;
    font-size: 13px;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 215, 0, 0.1);
      color: #ffd700;
    }
  }

  @media (max-width: 480px) {
    opacity: 1;
  }
`

// ── Bottom navigation ────────────────────────────────────────────
const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: #161616;
  border-radius: 16px;
  border: 1px solid #2a2a2a;

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #888;
  font-size: 14px;
  font-weight: 600;
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
    padding: 9px 13px;
    font-size: 12px;
  }
`

const NavIndicator = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  text-align: center;

  span { color: #ffd700; font-weight: 700; }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const NotFound = styled.div`
  text-align: center;
  padding: 80px 20px;

  h1 {
    color: #ffd700;
    font-size: 28px;
    margin-bottom: 16px;
  }

  a {
    color: #888;
    font-size: 14px;

    &:hover { color: #ffd700; }
  }
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
  const [copiedVerse, setCopiedVerse] = useState(null)

  useEffect(() => {
    const load = () => {
      const b = getBookBySlug(bookSlug)
      setBook(b)
      setVerses(getChapterVerses(bookSlug, parseInt(chapterNumber)))
      setLoading(false)
      setHighlightedVerse(null)
    }
    load()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [bookSlug, chapterNumber])

  useEffect(() => {
    if (!showSettings) return
    const handleClick = () => setShowSettings(false)
    const timer = setTimeout(() => document.addEventListener('click', handleClick), 0)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClick)
    }
  }, [showSettings])

  const currentChapter = parseInt(chapterNumber)
  const totalChapters = book?.chapters || 1
  const hasPrev = currentChapter > 1
  const hasNext = currentChapter < totalChapters

  const goToChapter = (num) => {
    navigate(`/chapter/${bookSlug}/${num}`)
  }

  if (loading) {
    return (
      <Container style={{ color: '#888', textAlign: 'center', padding: 60 }}>
        Loading...
      </Container>
    )
  }

  if (!book) {
    return (
      <Container>
        <NotFound>
          <h1>Chapter not found</h1>
          <Link to="/library">Back to Library</Link>
        </NotFound>
      </Container>
    )
  }

  const getVerseText = (verse) => {
    if (language === 'hebrew') return verse.hebrew || verse.english || '—'
    return verse.english || verse.hebrew || '—'
  }

  const handleCopyVerse = async (verse, e) => {
    e.stopPropagation()
    const text = `${book.name} ${currentChapter}:${verse.number} — ${getVerseText(verse)}`
    try {
      await navigator.clipboard.writeText(text)
      setCopiedVerse(verse.number)
      setTimeout(() => setCopiedVerse(null), 1500)
    } catch (error) {
      console.error('Could not copy verse:', error)
    }
  }

  return (
    <Container>
      <Toolbar>
        <ToolbarLeft>
          <IconButton as={Link} to={`/book/${bookSlug}`} title="Back to chapters">
            <FiArrowLeft />
          </IconButton>
          <BookInfo>
            <div className="bk-name">{book.name}</div>
            <div className="bk-chapter">Chapter {currentChapter} of {totalChapters}</div>
          </BookInfo>
        </ToolbarLeft>

        <ToolbarRight>
          <LangToggle>
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
          </LangToggle>

          <ChapterSelect>
            <select
              value={currentChapter}
              onChange={(e) => goToChapter(parseInt(e.target.value))}
            >
              {Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>Ch. {num}</option>
              ))}
            </select>
          </ChapterSelect>

          <SettingsWrapper>
            <IconButton
              onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings) }}
              title="Reader settings"
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
                    style={{ fontSize: 12 }}
                  >A</button>
                  <button
                    className={fontSize === 'medium' ? 'active' : ''}
                    onClick={() => setFontSize('medium')}
                    style={{ fontSize: 15 }}
                  >A</button>
                  <button
                    className={fontSize === 'large' ? 'active' : ''}
                    onClick={() => setFontSize('large')}
                    style={{ fontSize: 19 }}
                  >A</button>
                </div>
              </SettingsPanel>
            )}
          </SettingsWrapper>
        </ToolbarRight>
      </Toolbar>

      <ReadingCard>
        <ChapterHeading>
          <div className="ch-label">{book.englishName} · {book.name}</div>
          <div className="ch-number">{currentChapter}</div>
        </ChapterHeading>

        <VerseList $fontSize={fontSize}>
          {verses.length === 0 ? (
            <p style={{ color: '#555', textAlign: 'center', padding: '20px 0' }}>
              No verses available for this chapter yet.
            </p>
          ) : (
            verses.map(verse => (
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
                    onClick={(e) => handleCopyVerse(verse, e)}
                  >
                    {copiedVerse === verse.number ? <FiCheck /> : <FiCopy />}
                  </button>
                </VerseActions>
              </VerseItem>
            ))
          )}
        </VerseList>
      </ReadingCard>

      <NavBar>
        <NavButton
          disabled={!hasPrev}
          onClick={() => goToChapter(currentChapter - 1)}
        >
          <FiChevronLeft /> Previous
        </NavButton>

        <NavIndicator>
          Chapter <span>{currentChapter}</span> / {totalChapters}
        </NavIndicator>

        <NavButton
          disabled={!hasNext}
          onClick={() => goToChapter(currentChapter + 1)}
        >
          Next <FiChevronRight />
        </NavButton>
      </NavBar>
    </Container>
  )
}

export default ChapterPage