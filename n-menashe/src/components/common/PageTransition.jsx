// components/common/PageTransition.jsx
import styled, { keyframes } from 'styled-components'

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const TransitionContainer = styled.div`
  animation: ${enter} 300ms ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PageTransition = ({ children }) => (
  <TransitionContainer>{children}</TransitionContainer>
)

export default PageTransition