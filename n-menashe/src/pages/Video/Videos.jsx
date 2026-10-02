// pages/VideoHome.jsx
import { useState } from 'react'
import styled from 'styled-components'
import VideoCard from '../../components/Video/VideoCard'
import videosData from '../../data/videos.json'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const CategoryBar = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0 20px;
  margin-bottom: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  @media (max-width: 768px) {
    padding-bottom: 12px;
  }
`

const Chip = styled.button`
  padding: 8px 16px;
  background: ${p => p.$active ? '#fff' : '#1a1a1a'};
  color: ${p => p.$active ? '#0a0a0a' : '#ccc'};
  border: 1px solid ${p => p.$active ? '#fff' : '#2a2a2a'};
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${p => p.$active ? '#fff' : '#252525'};
    border-color: ${p => p.$active ? '#fff' : '#333'};
  }
`

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: #ffd700;
    border-radius: 2px;
  }
`

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px 16px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const videos = videosData.videos

  const categories = ['All', ...new Set(videos.map(v => v.category))]

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(v => v.category === selectedCategory)

  return (
    <Container>
      <CategoryBar>
        {categories.map(cat => (
          <Chip
            key={cat}
            $active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Chip>
        ))}
      </CategoryBar>

      <SectionTitle>
        {selectedCategory === 'All' ? 'All Videos' : selectedCategory}
      </SectionTitle>

      <VideoGrid>
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </VideoGrid>
    </Container>
  )
}

export default Videos