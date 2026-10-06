// components/video/VideoPlayer.jsx
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiVolume1,
  FiMaximize, FiMinimize, FiSkipBack, FiSkipForward,
  FiSettings
} from 'react-icons/fi'

// ============ STYLED ============
const PlayerWrapper = styled.div`
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  width: 100%;

  &:fullscreen {
    border-radius: 0;
    aspect-ratio: auto;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  @media (max-width: 768px) {
    border-radius: 0;
  }
`

const VideoEl = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`

const CenterPlay = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 5;

  &:hover {
    background: rgba(255, 215, 0, 0.9);
    color: #0a0a0a;
    transform: translate(-50%, -50%) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    font-size: 22px;
  }
`

const ControlsBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 16px 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? '0' : '10px'});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${p => p.$visible ? 'all' : 'none'};
  z-index: 6;
`

const ProgressWrapper = styled.div`
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover .progress-bar-fill::after {
    transform: translateY(-50%) scale(1);
  }
`

const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  transition: height 0.15s ease;

  ${ProgressWrapper}:hover & {
    height: 6px;
  }
`

const ProgressBuffer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${p => p.$percent}%;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
`

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${p => p.$percent}%;
  background: #ffd700;
  border-radius: 2px;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%) scale(0);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffd700;
    transition: transform 0.15s ease;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  }
`

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const CtrlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffd700;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
`

const TimeDisplay = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  padding: 0 8px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 0 4px;
  }
`

const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover .volume-slider {
    width: 80px;
    opacity: 1;
    margin-left: 4px;
  }
`

const VolumeSlider = styled.input`
  width: 0;
  opacity: 0;
  height: 4px;
  appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-left: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffd700;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffd700;
    cursor: pointer;
    border: none;
  }
`

const SettingsMenu = styled.div`
  position: absolute;
  bottom: 60px;
  right: 16px;
  background: rgba(20, 20, 20, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 12px;
  min-width: 180px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
  z-index: 10;

  .menu-title {
    color: #666;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 4px 8px 8px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    color: #ccc;
    font-size: 13px;
    text-align: left;
    transition: all 0.2s ease;

    &:hover { background: rgba(255, 215, 0, 0.1); color: #ffd700; }
    &.active { color: #ffd700; background: rgba(255, 215, 0, 0.1); }
  }
`

// ============ YOUTUBE HELPERS ============
const getYouTubeId = (url) => {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

const isYouTubeUrl = (url) => {
  if (!url) return false
  return url.includes('youtube.com') || url.includes('youtu.be')
}

// ============ YOUTUBE PLAYER ============
const YouTubePlayer = ({ src, title }) => {
  const videoId = getYouTubeId(src)
  if (!videoId) return <div style={{ color: '#fff', padding: 20 }}>Invalid YouTube URL</div>

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`

  return (
    <PlayerWrapper>
      <iframe
        src={embedUrl}
        title={title || 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </PlayerWrapper>
  )
}

// ============ NATIVE PLAYER ============
const NativePlayer = ({ src, poster, autoPlay, onEnded, onTimeUpdate }) => {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const hideTimer = useRef(null)

  const resetHideTimer = () => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    if (isPlaying) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000)
    }
  }

  useEffect(() => () => clearTimeout(hideTimer.current), [])

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (v.paused) { v.play(); setIsPlaying(true) }
    else { v.pause(); setIsPlaying(false) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    videoRef.current.volume = val
    setVolume(val)
    setIsMuted(val === 0)
    videoRef.current.muted = val === 0
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    setCurrentTime(v.currentTime)
    if (onTimeUpdate) onTimeUpdate(v.currentTime, v.duration)
    if (v.buffered.length > 0) {
      setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100)
    }
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = ((e.clientX - rect.left) / rect.width) * 100
    videoRef.current.currentTime = (percent / 100) * duration
  }

  const skip = (sec) => {
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + sec))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) wrapperRef.current.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  const changeSpeed = (rate) => {
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00'
    const h = Math.floor(t / 3600)
    const m = Math.floor((t % 3600) / 60)
    const s = Math.floor(t % 60)
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const VolumeIcon = isMuted || volume === 0 ? FiVolumeX : volume < 0.5 ? FiVolume1 : FiVolume2

  return (
    <PlayerWrapper
      ref={wrapperRef}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <VideoEl
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        onClick={togglePlay}
        onPlay={() => { setIsPlaying(true); resetHideTimer() }}
        onPause={() => { setIsPlaying(false); setShowControls(true) }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onEnded={onEnded}
        playsInline
      />

      {!isPlaying && (
        <CenterPlay onClick={togglePlay}>
          <FiPlay style={{ marginLeft: '4px' }} />
        </CenterPlay>
      )}

      <ControlsBar $visible={showControls}>
        <ProgressWrapper onClick={handleProgressClick}>
          <ProgressTrack>
            <ProgressBuffer $percent={buffered} />
            <ProgressFill $percent={duration ? (currentTime / duration) * 100 : 0} />
          </ProgressTrack>
        </ProgressWrapper>

        <ControlsRow>
          <ControlsLeft>
            <CtrlButton onClick={togglePlay}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </CtrlButton>

            <CtrlButton onClick={() => skip(-10)} title="Back 10s">
              <FiSkipBack />
            </CtrlButton>

            <CtrlButton onClick={() => skip(10)} title="Forward 10s">
              <FiSkipForward />
            </CtrlButton>

            <VolumeWrapper>
              <CtrlButton onClick={toggleMute}>
                <VolumeIcon />
              </CtrlButton>
              <VolumeSlider
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
              />
            </VolumeWrapper>

            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeDisplay>
          </ControlsLeft>

          <ControlsRight>
            <CtrlButton onClick={() => setShowSettings(!showSettings)} title="Settings">
              <FiSettings />
            </CtrlButton>
            <CtrlButton onClick={toggleFullscreen} title="Fullscreen">
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </CtrlButton>
          </ControlsRight>
        </ControlsRow>

        {showSettings && (
          <SettingsMenu onClick={(e) => e.stopPropagation()}>
            <div className="menu-title">Playback Speed</div>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
              <button
                key={rate}
                className={playbackRate === rate ? 'active' : ''}
                onClick={() => changeSpeed(rate)}
              >
                <span>{rate === 1 ? 'Normal' : `${rate}x`}</span>
                {playbackRate === rate && <span>✓</span>}
              </button>
            ))}
          </SettingsMenu>
        )}
      </ControlsBar>
    </PlayerWrapper>
  )
}

// ============ MAIN EXPORT ============
const VideoPlayer = ({ 
  src, 
  poster,
  title,
  autoPlay = false,
  onEnded,
  onTimeUpdate 
}) => {
  // Auto-detect YouTube vs native video
  if (isYouTubeUrl(src)) {
    return <YouTubePlayer src={src} title={title} />
  }

  return (
    <NativePlayer
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
    />
  )
}

export default VideoPlayer