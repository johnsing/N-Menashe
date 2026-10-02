import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiPlay, FiPause, FiSkipBack, FiSkipForward,
  FiMusic, FiClock, FiVolume2
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const equalize = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 60px 24px;
  border-radius: 16px;
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translateX(-50%) translateY(-50%);
    object-fit: cover;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%);
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    z-index: 2;
    background: linear-gradient(135deg, #ffd700, #ffed4a, #f5a623);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.8));
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    min-height: 160px;
    h1 { font-size: 32px; letter-spacing: 2px; }
  }
`

// ── Now Playing Bar ──────────────────────────────────────────────
const PlayerBar = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #161616 100%);
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 18px;
  padding: 20px 24px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  @media (max-width: 600px) {
    flex-wrap: wrap;
    padding: 16px;
  }
`

const Vinyl = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #111, #2a2a2a, #111, #2a2a2a, #111);
  border: 2px solid rgba(255, 215, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: ${props => (props.$spinning ? 'spin 3s linear infinite' : 'none')};

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .vinyl-center {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd700, #f5a623);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-size: 10px;
  }
`

const PlayerInfo = styled.div`
  flex: 1;
  min-width: 0;

  .track-title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .track-artist {
    color: #888;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

const ControlBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #888;
  font-size: 18px;
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    color: #ffd700;
    background: rgba(255, 215, 0, 0.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const PlayBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  color: #0a0a0a;
  font-size: 22px;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(255, 215, 0, 0.4);
  }
`

const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 14px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: #2a2a2a;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #f5a623);
    border-radius: 3px;
    width: ${props => props.$progress}%;
    transition: width 0.1s linear;
  }

  &:hover {
    height: 7px;
  }
`

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 11px;
  margin-top: 6px;
`

const VolumeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  flex-shrink: 0;

  input[type="range"] {
    width: 80px;
    accent-color: #ffd700;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

// ── Track List ───────────────────────────────────────────────────
const SectionTitle = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 4px;
    height: 18px;
    background: #ffd700;
    border-radius: 2px;
  }
`

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 36px;
`

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: ${props => props.$active ? 'rgba(255, 215, 0, 0.06)' : '#1a1a1a'};
  border: 1px solid ${props => props.$active ? 'rgba(255, 215, 0, 0.35)' : '#2a2a2a'};
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 215, 0, 0.3);
    background: rgba(255, 215, 0, 0.03);
  }

  .track-num {
    color: ${props => props.$active ? '#ffd700' : '#444'};
    font-size: 13px;
    font-weight: 600;
    width: 24px;
    text-align: center;
    flex-shrink: 0;
  }

  .track-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: ${props => props.$active ? 'rgba(255, 215, 0, 0.15)' : '#111'};
    border: 1px solid ${props => props.$active ? 'rgba(255, 215, 0, 0.3)' : '#2a2a2a'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$active ? '#ffd700' : '#666'};
    font-size: 16px;
    flex-shrink: 0;
  }

  .track-details {
    flex: 1;
    min-width: 0;

    .t-title {
      color: ${props => props.$active ? '#ffd700' : '#fff'};
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .t-artist {
      color: #666;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .t-duration {
    color: #666;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    gap: 10px;
    .t-duration { display: none; }
  }
`

const Equalizer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;
  flex-shrink: 0;

  span {
    width: 3px;
    background: #ffd700;
    border-radius: 2px;
    animation: ${equalize} 0.8s ease-in-out infinite;

    &:nth-child(1) { height: 60%; animation-delay: 0s; }
    &:nth-child(2) { height: 100%; animation-delay: 0.2s; }
    &:nth-child(3) { height: 40%; animation-delay: 0.4s; }
  }
`

// Sample tracks — replace with Supabase fetch later
const sampleTracks = [
  {
    id: 1,
    title: 'Shalom Aleichem',
    artist: 'Traditional',
    category: 'Shabbat',
    url: '/audio/shalom-aleichem.mp3',
    duration: '4:32',
  },
  {
    id: 2,
    title: 'Avinu Malkeinu',
    artist: 'High Holidays Collection',
    category: 'Prayer',
    url: '/audio/avinu-malkeinu.mp3',
    duration: '6:15',
  },
  {
    id: 3,
    title: 'Shir Hashirim — Instrumental',
    artist: 'N-Menashe Ensemble',
    category: 'Inspiration',
    url: '/audio/shir-hashirim.mp3',
    duration: '8:04',
  },
  {
    id: 4,
    title: 'Erev Shel Shoshanim',
    artist: 'Traditional',
    category: 'Israeli',
    url: '/audio/erev-shel-shoshanim.mp3',
    duration: '3:48',
  },
  {
    id: 5,
    title: 'Yerushalayim Shel Zahav',
    artist: 'Naomi Shemer',
    category: 'Israeli',
    url: '/audio/yerushalayim.mp3',
    duration: '5:21',
  },
]

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const Audio = () => {
  const audioRef = useRef(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentTrack])

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay()
    } else {
      setCurrentTrack(track)
      setCurrentTime(0)
      setIsPlaying(true)
      setTimeout(() => {
        audioRef.current?.play().catch(() => {})
      }, 50)
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    if (!currentTrack) return
    const idx = sampleTracks.findIndex(t => t.id === currentTrack.id)
    const next = sampleTracks[(idx + 1) % sampleTracks.length]
    playTrack(next)
  }

  const playPrev = () => {
    if (!currentTrack) return
    const idx = sampleTracks.findIndex(t => t.id === currentTrack.id)
    const prev = sampleTracks[(idx - 1 + sampleTracks.length) % sampleTracks.length]
    playTrack(prev)
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * duration
    setCurrentTime(pct * duration)
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  // Group tracks by category
  const categories = [...new Set(sampleTracks.map(t => t.category))]

  return (
    <Container>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />

      <PageHeader>
        <video autoPlay loop muted playsInline>
          <source src="/assets/library-video.mp4" type="video/mp4" />
        </video>
        <h1>Audio</h1>
      </PageHeader>

      {/* Now Playing Bar */}
      {currentTrack ? (
        <PlayerBar>
          <Vinyl $spinning={isPlaying}>
            <div className="vinyl-center"><FiMusic /></div>
          </Vinyl>

          <PlayerInfo>
            <div className="track-title">{currentTrack.title}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </PlayerInfo>

          <PlayerControls>
            <ControlBtn onClick={playPrev} title="Previous">
              <FiSkipBack />
            </ControlBtn>
            <PlayBtn onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </PlayBtn>
            <ControlBtn onClick={playNext} title="Next">
              <FiSkipForward />
            </ControlBtn>
          </PlayerControls>

          <VolumeRow>
            <FiVolume2 />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
            />
          </VolumeRow>

          <ProgressWrapper>
            <ProgressBar $progress={progress} onClick={seek}>
              <div className="fill" />
            </ProgressBar>
            <TimeRow>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </TimeRow>
          </ProgressWrapper>
        </PlayerBar>
      ) : (
        <PlayerBar style={{ justifyContent: 'center', color: '#444', fontSize: 14, padding: '28px' }}>
          <FiMusic style={{ fontSize: 22, marginRight: 10 }} />
          Select a track below to start listening
        </PlayerBar>
      )}

      {/* Track Lists by Category */}
      {categories.map(cat => (
        <div key={cat}>
          <SectionTitle>{cat}</SectionTitle>
          <TrackList>
            {sampleTracks.filter(t => t.category === cat).map((track, i) => (
              <TrackItem
                key={track.id}
                $active={currentTrack?.id === track.id}
                onClick={() => playTrack(track)}
              >
                <span className="track-num">
                  {currentTrack?.id === track.id && isPlaying
                    ? <Equalizer><span /><span /><span /></Equalizer>
                    : String(i + 1).padStart(2, '0')}
                </span>
                <div className="track-icon">
                  {currentTrack?.id === track.id && isPlaying ? <FiPause /> : <FiPlay />}
                </div>
                <div className="track-details">
                  <div className="t-title">{track.title}</div>
                  <div className="t-artist">{track.artist}</div>
                </div>
                <span className="t-duration">
                  <FiClock /> {track.duration}
                </span>
              </TrackItem>
            ))}
          </TrackList>
        </div>
      ))}
    </Container>
  )
}

export default Audio