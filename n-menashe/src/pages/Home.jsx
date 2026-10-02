import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 40px 20px;
  position: relative;

  &::before {
    content: '✦';
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 60px;
    color: rgba(255, 215, 0, 0.05);
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '✧';
    position: absolute;
    bottom: 20%;
    right: 10%;
    font-size: 80px;
    color: rgba(255, 215, 0, 0.05);
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: 8px 20px;
  border-radius: 50px;
  color: #ffd700;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 30px;
  letter-spacing: 1px;

  svg {
    font-size: 16px;
  }
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 30%, #f5a623 60%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 40px;
    letter-spacing: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #aaa;
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 48px;
  background: #ffd700;
  color: #0a0a0a;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 50px;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);

    svg {
      transform: translateX(5px);
    }
  }
`;


const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroBadge>
          NISHMAT-MENASHE
        </HeroBadge>

        <Title>Preserving Heritage Through Art</Title>
        
        <Subtitle>
          Exploring the intersection of Jewish tradition and contemporary visual art.
          A curated collection of digital heritage.
        </Subtitle>

        <CTAButton to="/library">
          Explore Gallery
        </CTAButton>
      </HeroSection>
    </>
  );
};

export default Home;