import { useState, useEffect } from 'react';
import styled from 'styled-components';
import upArrowIcon from '../assets/uparrow.svg';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  img {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsVisible(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton isVisible={isVisible} onClick={scrollToTop} aria-label="맨 위로 이동">
      <img src={upArrowIcon} alt="맨 위로" />
    </ScrollButton>
  );
}

export default ScrollToTop;

