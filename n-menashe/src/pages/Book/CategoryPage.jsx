// pages/CategoryPage.jsx
import styled, { keyframes } from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiChevronRight, FiBook } from 'react-icons/fi'
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

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border-radius: 16px;
  border: 1px solid #2a2a2a;

  h1 {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }

  p {
    color: #888;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 30px 16px;
    h1 { font-size: 28px; letter-spacing: 2px; }
    p { font-size: 14px; }
  }

  @media (max-width: 480px) {
    h1 { font-size: 22px; letter-spacing: 1px; }
  }
`

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const BookCard = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.4);
    transform: translateX(6px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .book-info { flex: 1; }

  .book-name {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .book-english {
    color: #888;
    font-size: 14px;
  }

  .book-meta {
    display: flex;
    gap: 12px;
    color: #666;
    font-size: 12px;
    margin-top: 8px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .arrow {
    color: #444;
    font-size: 20px;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  &:hover .arrow {
    color: #ffd700;
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    padding: 20px;
    .book-name { font-size: 18px; }
  }
`

const CategoryPage = () => {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)

  if (!category) {
    return (
      <Container>
        <h1 style={{ color: '#ffd700', textAlign: 'center' }}>Category not found</h1>
        <BackButton to="/library" style={{ marginTop: 20 }}>
          <FiArrowLeft /> Back to Library
        </BackButton>
      </Container>
    )
  }

  return (
    <Container>
      <BackButton to="/library">
        <FiArrowLeft /> Back to Library
      </BackButton>

      <CategoryHeader>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </CategoryHeader>

      <BookGrid>
        {category.books.map(book => (
          <BookCard key={book.id} to={`/book/${book.slug}`}>
            <div className="book-info">
              <div className="book-name">{book.name}</div>
              <div className="book-english">{book.englishName}</div>
              <div className="book-meta">
                <span><FiBook /> {book.chapters} chapters</span>
              </div>
            </div>
            <FiChevronRight className="arrow" />
          </BookCard>
        ))}
      </BookGrid>
    </Container>
  )
}

export default CategoryPage