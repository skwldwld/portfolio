import styled, { keyframes } from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import scrollIcon from '../assets/scroll.svg';
import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToMessage = () => {
    scrollToSection('message');
  };

  return (
    <HeroSection id="hero">
      <NavigationBar />
      <HeroContent>
        <HeroTitle>
          {t('hero_title_1')}<br />
          {t('hero_title_2')}<br />
          {t('hero_title_3')}
        </HeroTitle>
        <HeroDescription>
          {t('hero_desc_1')}<br />
          {t('hero_desc_2')}
        </HeroDescription>
      </HeroContent>
      <ScrollIndicator onClick={scrollToMessage}>
        <ScrollIcon src={scrollIcon} alt="Scroll down" />
      </ScrollIndicator>
    </HeroSection>
  );
}

export default Hero;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 0;
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  margin-top: 50px;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 70px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 32px 0;
  letter-spacing: -0.02em;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 400;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 10;
  animation: ${bounce} 2s infinite;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-50%) translateY(5px);
    
    img {
      filter: opacity(1);
    }
  }
`;

const ScrollIcon = styled.img`
  width: 50px;
  height: auto;
  display: block;
  filter: opacity(0.7);
  transition: filter 0.3s ease;
`;