// components/video/VideoCard.jsx
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FiClock } from 'react-icons/fi'

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`

const Duration = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;

  svg { font-size: 11px; }
`

const CardInfo = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 4px;
`

const ChannelAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0a0a0a;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TextInfo = styled.div`
  flex: 1;
  min-width: 0;

  .title {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 6px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

`

const VideoCard = ({ video, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <Card 
        to={`/video/${video.id}`} 
        style={{ flexDirection: 'row', gap: '12px' }}
      >
        <Thumbnail style={{ maxWidth: '180px', flexShrink: 0 }}>
          {video.thumbnail 
            ? <img src={video.thumbnail} alt={video.title} />
            : <div style={{ width: '100%', height: '100%', background: '#222' }} />
          }
          <Duration><FiClock /> {video.duration}</Duration>
        </Thumbnail>
        <TextInfo style={{ alignSelf: 'flex-start' }}>
          <div className="title">{video.title}</div>
        </TextInfo>
      </Card>
    )
  }

  return (
    <Card to={`/video/${video.id}`}>
      <Thumbnail>
        {video.thumbnail 
          ? <img src={video.thumbnail} alt={video.title} />
          : <div style={{ width: '100%', height: '100%', background: '#222' }} />
        }
        <Duration><FiClock /> {video.duration}</Duration>
      </Thumbnail>
      <CardInfo>
        <ChannelAvatar>
          {video.channelAvatar 
            ? <img src={video.channelAvatar} alt={video.channel} />
            : video.channel?.[0] || 'N'
          }
        </ChannelAvatar>
        <TextInfo>
          <div className="title">{video.title}</div>
        </TextInfo>
      </CardInfo>
    </Card>
  )
}

export default VideoCard