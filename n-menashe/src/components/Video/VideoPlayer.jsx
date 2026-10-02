// components/video/VideoPlayer.jsx
import ReactPlayer from 'react-player'
import styled from 'styled-components'

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;

  video, iframe {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    border-radius: 0;
  }
`

const VideoPlayer = ({ 
  src, 
  poster, 
  playing = false,
  controls = true,
  volume = 1,
  muted = false,
  playbackRate = 1,
  onEnded,
  onProgress,
  onPlay,
  onPause,
  onReady,
  onError
}) => {
  return (
    <PlayerWrapper>
      <ReactPlayer
        src={src}
        light={poster || false}
        playing={playing}
        controls={controls}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onEnded={onEnded}
        onProgress={onProgress}
        onPlay={onPlay}
        onPause={onPause}
        onReady={onReady}
        onError={onError}
        width="100%"
        height="100%"
        playsinline
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            }
          },
          vimeo: {
            playerOptions: {
              byline: false,
              portrait: false,
              title: false,
            }
          },
          file: {
            attributes: {
              controlsList: 'nodownload',
            }
          }
        }}
      />
    </PlayerWrapper>
  )
}

export default VideoPlayer