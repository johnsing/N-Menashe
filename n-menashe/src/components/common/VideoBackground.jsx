// components/VideoBackground.jsx
import styled from 'styled-components'

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.rounded ? '12px' : '0'};
  min-height: ${props => props.height || '200px'};
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
    object-fit: cover;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, ${props => props.overlayOpacity || 0.6});
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
    color: #fff;
    text-align: center;
    padding: 40px 20px;
    width: 100%;
  }
`

const VideoBackground = ({ 
  children, 
  videoSrc, 
  height = '200px',
  rounded = true,
  overlayOpacity = 0.6,
  ...props 
}) => {
  return (
    <VideoContainer 
      height={height} 
      rounded={rounded}
      overlayOpacity={overlayOpacity}
      {...props}
    >
      <video autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="content">
        {children}
      </div>
    </VideoContainer>
  )
}

export default VideoBackground