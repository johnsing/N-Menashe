import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft, FiBookOpen, FiAlignLeft, FiHash, FiChevronRight
} from 'react-icons/fi'
import { getBookBySlug } from '../../utils/bible'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const stagger = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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

// ── Book Hero ────────────────────────────────────────────────────
const Hero = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  padding: 44px 36px;
  margin-bottom: 26px;
  overflow: hidden;
  text-align: center;

  .hero-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
  }

  .hero-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 180px;
    font-weight: 900;
    color: rgba(255, 215, 0, 0.035);
    line-height: 1;
    pointer-events: none;
    font-family: serif;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 32px 22px;
    .hero-watermark { font-size: 100px; }
  }
`

const BookName = styled.h1`
  position: relative;
  font-size: 46px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`

const EnglishName = styled.div`
  position: relative;
  color: #ffd700;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const HeroStats = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    background: #111;
    border: 1px solid #2a2a2a;
    border-radius: 50px;
    color: #888;
    font-size: 13px;

    svg { color: #ffd700; font-size: 13px; }
  }
`

// ── Quick jump ───────────────────────────────────────────────────
const JumpRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .jump-label {
    color: #555;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;

    svg { color: #ffd700; }
  }
`

const JumpInput = styled.input`
  width: 90px;
  padding: 11px 16px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.08);
  }

  /* Hide number spinners */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const JumpButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 11px 22px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 700;
  border-radius: 12px;
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(255, 215, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

// ── Chapter grid ─────────────────────────────────────────────────
const ChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 9px;
  }
`

const ChapterCard = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 8px 14px;
  background: linear-gradient(135deg, #1a1a1a 0%, #151515 100%);
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  min-height: 92px;
  overflow: hidden;
  animation: ${stagger} 0.35s ease-out both;
  animation-delay: ${props => Math.min(props.$i * 15, 400)}ms;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  .ch-num {
    font-size: 26px;
    font-weight: 800;
    color: #ffd700;
    line-height: 1;
    margin-bottom: 5px;
    transition: transform 0.25s ease;
  }

  .ch-label {
    font-size: 9px;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .ch-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ffd700, #f5a623);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
    background: rgba(255, 215, 0, 0.05);

    .ch-num { transform: scale(1.12); }
    .ch-glow { transform: scaleX(1); }
  }

  @media (max-width: 480px) {
    min-height: 74px;
    padding: 12px 4px 10px;
    .ch-num { font-size: 20px; }
  }
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

const BookPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [jumpValue, setJumpValue] = useState('')

  const book = getBookBySlug(slug)

  if (!book) {
    return (
      <Container>
        <NotFound>
          <h1>Book not found</h1>
          <BackButton to="/library">
            <FiArrowLeft /> Back to Library
          </BackButton>
        </NotFound>
      </Container>
    )
  }

  const handleJump = () => {
    const num = parseInt(jumpValue)
    if (num >= 1 && num <= book.chapters) {
      navigate(`/chapter/${book.slug}/${num}`)
    }
  }

  return (
    <Container>
      <BackButton to={`/category/${book.category}`}>
        <FiArrowLeft /> Back
      </BackButton>

      <Hero>
        <span className="hero-glow" />
        <span className="hero-watermark">{book.name[0]}</span>
        <BookName>{book.name}</BookName>
        <EnglishName>{book.englishName}</EnglishName>
        <HeroStats>
          <span><FiBookOpen /> {book.chapters} Chapters</span>
          <span><FiAlignLeft /> {book.verses?.toLocaleString()} Verses</span>
        </HeroStats>
      </Hero>

      <JumpRow>
        <span className="jump-label"><FiHash /> Jump to chapter:</span>
        <JumpInput
          type="number"
          min="1"
          max={book.chapters}
          placeholder="1"
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleJump()}
        />
        <JumpButton
          onClick={handleJump}
          disabled={!jumpValue || parseInt(jumpValue) < 1 || parseInt(jumpValue) > book.chapters}
        >
          Go <FiChevronRight />
        </JumpButton>
      </JumpRow>

      <ChapterGrid>
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map(num => (
          <ChapterCard
            key={num}
            to={`/chapter/${book.slug}/${num}`}
            $i={num}
          >
            <span className="ch-num">{num}</span>
            <span className="ch-label">Chapter</span>
            <span className="ch-glow" />
          </ChapterCard>
        ))}
      </ChapterGrid>
    </Container>
  )
}

export default BookPage