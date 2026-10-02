// pages/VideoPage.jsx
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../../components/Video/VideoPlayer'
import VideoCard from '../../components/Video/VideoCard'
import { FiArrowLeft } from 'react-icons/fi'
import videosData from '../../data/videos.json'

// ============ STYLED ============
const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const MainColumn = styled.div`
  min-width: 0;
`

const Sidebar = styled.div`
  min-width: 0;
`

const PlayerWrap = styled.div`
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin: -16px -16px 16px;
  }

  @media (max-width: 480px) {
    margin: -12px -12px 12px;
  }
`

/* 👇 NEW: Back bar */
const BackBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 50px;
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg { font-size: 18px; }

  &:hover {
    background: rgba(255, 215, 0, 0.08);
    border-color: rgba(255, 215, 0, 0.4);
    color: #ffd700;
    transform: translateX(-3px);

    svg { transform: translateX(-2px); }
  }

  &:active {
    transform: translateX(-3px) scale(0.97);
  }

  @media (max-width: 480px) {
    padding: 6px 12px 6px 10px;
    font-size: 13px;

    svg { font-size: 16px; }
  }
`

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 13px;
  min-width: 0;

  a {
    color: #888;
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover { color: #ffd700; }
  }

  .sep { color: #444; }

  .current {
    color: #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`

const Title = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2a2a2a;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Channel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #0a0a0a;
  font-size: 16px;
  flex-shrink: 0;
  overflow: hidden;
`

const ChannelInfo = styled.div`
  .name {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
  }

`

const SidebarTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
`

const SidebarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// ============ COMPONENT ============
const VideoPage = () => {
  const { id } = useParams()

  return <VideoPageContent key={id} id={id} />
}

const VideoPageContent = ({ id }) => {
  const navigate = useNavigate()

  const [playing, setPlaying] = useState(true)

  const video = videosData.videos.find(v => v.id === id)

  const relatedVideos = videosData.videos
    .filter(v => v.id !== id)
    .slice(0, 8)

  // Scroll to the top when this video page mounts.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Back button handler
  const handleBack = () => {
    // If user came from within the app, go back
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/videos')
    }
  }

  if (!video) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ color: '#ffd700', marginBottom: 16 }}>Video not found</h1>
        <Link to="/videos" style={{ color: '#888' }}>
          Back to videos
        </Link>
      </div>
    )
  }

  return (
    <>
      <Container>
        <MainColumn>
          <PlayerWrap>
            <VideoPlayer 
              src={video.src} 
              poster={video.thumbnail}
              playing={playing}
              controls={true}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
          </PlayerWrap>

          {/* 👇 BACK BAR (below the player) */}
          <BackBar>
            <BackButton onClick={handleBack} aria-label="Go back">
              <FiArrowLeft /> Back
            </BackButton>

            <Breadcrumb>
              <Link to="/videos">Videos</Link>
              <span className="sep">›</span>
              {video.category && (
                <>
                  <Link to="/videos">{video.category}</Link>
                  <span className="sep">›</span>
                </>
              )}
              <span className="current">{video.title}</span>
            </Breadcrumb>
          </BackBar>

          <Title>{video.title}</Title>

          <MetaRow>
            <Channel>
              <Avatar>
                {video.channelAvatar 
                  ? <img src={video.channelAvatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  : video.channel?.[0]
                }
              </Avatar>
              <ChannelInfo>
                <div className="name">{video.channel}</div>
              </ChannelInfo>
            </Channel>

          </MetaRow>

        </MainColumn>

        <Sidebar>
          <SidebarTitle>Up Next</SidebarTitle>
          <SidebarList>
            {relatedVideos.map(v => (
              <VideoCard key={v.id} video={v} layout="list" />
            ))}
          </SidebarList>
        </Sidebar>
      </Container>

    </>
  )
}

export default VideoPage