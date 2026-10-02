// pages/BookPage.jsx
import styled, { keyframes } from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi'
import { getBookBySlug } from '../../utils/bible'

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
  font-size: 14px;
  margin-bottom: 24px;
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

const BookHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border-radius: 16px;
  border: 1px solid #2a2a2a;

  h1 {
    font-size: 44px;
    font-weight: 800;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 4px;
  }

  .english-name {
    color: #ffd700;
    font-size: 20px;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }

  .meta {
    color: #888;
    font-size: 14px;
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 30px 16px;
    h1 { font-size: 30px; }
    .english-name { font-size: 16px; }
  }
`

const ChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
`

const ChapterCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  transition: all 0.25s ease;
  min-height: 80px;

  .number {
    font-size: 22px;
    font-weight: 700;
    color: #ffd700;
    line-height: 1;
  }

  .label {
    font-size: 10px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  &:hover {
    border-color: rgba(255, 215, 0, 0.5);
    transform: translateY(-3px);
    background: rgba(255, 215, 0, 0.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    min-height: 65px;
    padding: 12px 4px;
    .number { font-size: 18px; }
    .label { font-size: 8px; }
  }
`

const BookPage = () => {
  const { slug } = useParams()
  const book = getBookBySlug(slug)

  if (!book) {
    return (
      <Container>
        <h1 style={{ color: '#ffd700', textAlign: 'center' }}>Book not found</h1>
        <BackButton to="/library" style={{ marginTop: 20 }}>
          <FiArrowLeft /> Back to Library
        </BackButton>
      </Container>
    )
  }

  return (
    <Container>
      <BackButton to={`/category/${book.category}`}>
        <FiArrowLeft /> Back
      </BackButton>

      <BookHeader>
        <h1>{book.name}</h1>
        <div className="english-name">{book.englishName}</div>
        <div className="meta">
          <span><FiBookOpen /> {book.chapters} Chapters</span>
          <span>{book.verses} Verses</span>
        </div>
      </BookHeader>

      <ChapterGrid>
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map(num => (
          <ChapterCard key={num} to={`/chapter/${book.slug}/${num}`}>
            <div className="number">{num}</div>
            <div className="label">Chapter</div>
          </ChapterCard>
        ))}
      </ChapterGrid>
    </Container>
  )
}

export default BookPage