// components/common/LoadingScreen.jsx
import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react'

// ============ ANIMATIONS ============

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`

const loadingBar = keyframes`
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 70%;
    left: 15%;
  }
  100% {
    width: 100%;
    left: 0;
  }
`

const dotsAnimation = keyframes`
  0%, 20% {
    content: '';
  }
  40% {
    content: '.';
  }
  60% {
    content: '..';
  }
  80%, 100% {
    content: '...';
  }
`

// ============ STYLED COMPONENTS ============

const LoadingOverlay = styled.div`
  position: ${({ variant }) => variant === 'fullscreen' ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ variant }) => 
    variant === 'fullscreen' 
      ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
      : 'rgba(10, 10, 10, 0.9)'
  };
  backdrop-filter: ${({ variant }) => variant === 'fullscreen' ? 'none' : 'blur(10px)'};
  z-index: ${({ variant }) => variant === 'fullscreen' ? 9999 : 100};
  padding: 20px;
  gap: 24px;
  
  ${({ variant }) => variant === 'fullscreen' && `
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.03) 0%, transparent 70%);
      animation: ${float} 10s ease-in-out infinite;
    }
  `}
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
`

const LogoText = styled.span`
  font-size: ${({ size }) => size === 'large' ? '42px' : size === 'small' ? '24px' : '32px'};
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 30%, #f5a623 60%, #ffd700 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
  animation: ${pulse} 2s ease-in-out infinite;
`

const SpinnerContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

// Simple spinner using pure CSS
const Spinner = styled.div`
  width: ${({ size }) => size === 'large' ? '50px' : size === 'small' ? '30px' : '40px'};
  height: ${({ size }) => size === 'large' ? '50px' : size === 'small' ? '30px' : '40px'};
  border: 4px solid rgba(255, 215, 0, 0.1);
  border-top: 4px solid #ffd700;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size }) => size === 'large' && `
    border-width: 5px;
  `}
  
  ${({ size }) => size === 'small' && `
    border-width: 3px;
  `}
`

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ size }) => size === 'large' ? '18px' : size === 'small' ? '12px' : '14px'};
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '...';
    animation: ${dotsAnimation} 1.5s steps(3, end) infinite;
    display: inline-block;
    width: 24px;
    text-align: left;
  }
`

const LoadingBar = styled.div`
  width: ${({ size }) => size === 'large' ? '300px' : size === 'small' ? '150px' : '200px'};
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #ffd700, #ffed4a, #f5a623);
    border-radius: 2px;
    animation: ${loadingBar} 2s ease-in-out infinite;
  }
`

const ProgressText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  position: relative;
  z-index: 1;
`

const GlowRing = styled.div`
  position: absolute;
  width: ${({ size }) => size === 'large' ? '120px' : size === 'small' ? '60px' : '80px'};
  height: ${({ size }) => size === 'large' ? '120px' : size === 'small' ? '60px' : '80px'};
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.1);
  animation: ${spin} 4s linear infinite;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #ffd700;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
  
  ${({ size }) => size === 'large' && `
    width: 160px;
    height: 160px;
    border-color: rgba(255, 215, 0, 0.08);
  `}
`

const GlowRingReverse = styled(GlowRing)`
  animation: ${spin} 6s linear infinite reverse;
  border-color: rgba(255, 215, 0, 0.05);
  
  ${({ size }) => size === 'large' && `
    width: 200px;
    height: 200px;
    border-color: rgba(255, 215, 0, 0.05);
  `}
`

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  opacity: 0;
  animation: ${fadeInOut} ${({ duration }) => duration || 2}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
`

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`

// ============ SUB-COMPONENTS ============

const ParticleSystem = () => {
  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * 360,
      distance: 60 + (i % 4) * 10,
      duration: 2 + (i % 3) * 0.5,
      delay: (i % 5) * 0.4,
    }))
  )

  return (
    <ParticleContainer>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
          }}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
    </ParticleContainer>
  )
}

// ============ MAIN COMPONENT ============

const LoadingScreen = ({ 
  variant = 'fullscreen', // 'fullscreen', 'overlay', 'inline'
  size = 'medium', // 'small', 'medium', 'large'
  text = 'Loading',
  showProgress = false,
  progress = 0,
  showLogo = true,
  showSpinner = true,
  showBar = true,
  showParticles = true,
  children,
  ...props 
}) => {
  const [currentProgress, setCurrentProgress] = useState(progress)

  // Simulate progress if showProgress is true and progress is 0
  useEffect(() => {
    if (!showProgress || progress !== 0) {
      return undefined
    }

    let value = 0
    const interval = setInterval(() => {
      value += Math.random() * 10
      if (value >= 95) {
        clearInterval(interval)
        value = 95
      }
      setCurrentProgress(Math.min(value, 95))
    }, 200)

    return () => clearInterval(interval)
  }, [showProgress, progress])

  const displayedProgress = progress > 0 ? Math.min(progress, 100) : currentProgress

  // ============ RENDER ============

  // Inline variant - just show a spinner
  if (variant === 'inline') {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        ...props.style 
      }}>
        <Spinner size={size} />
        {text && <LoadingText size={size} style={{ marginLeft: '12px' }}>{text}</LoadingText>}
      </div>
    )
  }

  // Overlay variant - shows over content
  if (variant === 'overlay') {
    return (
      <LoadingOverlay variant="overlay" {...props}>
        {showLogo && (
          <LogoContainer>
            <LogoText size={size}>N-MENASHE</LogoText>
          </LogoContainer>
        )}
        
        <SpinnerContainer>
          {showSpinner && <Spinner size={size} />}
          {text && <LoadingText size={size}>{text}</LoadingText>}
          {showBar && <LoadingBar size={size} />}
          {showProgress && displayedProgress > 0 && (
            <ProgressText>{Math.round(displayedProgress)}%</ProgressText>
          )}
        </SpinnerContainer>
        
        {children}
      </LoadingOverlay>
    )
  }

  // Fullscreen variant - default
  return (
    <LoadingOverlay variant="fullscreen" {...props}>
      {showParticles && <ParticleSystem />}
      
      <GlowRing size={size} />
      <GlowRingReverse size={size} />
      
      {showLogo && (
        <LogoContainer>
          <LogoText size={size}>N-MENASHE</LogoText>
        </LogoContainer>
      )}
      
      <SpinnerContainer>
        {showSpinner && <Spinner size={size} />}
        {text && <LoadingText size={size}>{text}</LoadingText>}
        {showBar && <LoadingBar size={size} />}
        {showProgress && displayedProgress > 0 && (
          <ProgressText>{Math.round(displayedProgress)}%</ProgressText>
        )}
      </SpinnerContainer>
      
      {children}
    </LoadingOverlay>
  )
}

// ============ EXPORT ============

export default LoadingScreen