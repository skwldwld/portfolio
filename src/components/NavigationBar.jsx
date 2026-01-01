import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let scrollTimer = null;
    let mouseTimer = null;

    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      let heroBottom = 0;
      if (heroSection) {
        heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }

      // 현재 활성 섹션 감지 (Hero 섹션일 때는 null)
      const sections = ['about', 'skills', 'experience', 'projects'];
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      setActiveSection(currentSection || null);

      // Hero 섹션에 있을 때는 항상 표시
      if (window.scrollY < heroBottom - 100) {
        setIsVisible(true);
        clearTimeout(scrollTimer);
        return;
      }

      // 화면 맨 끝에 도달했을 때 숨기기
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isAtBottom = scrollHeight - scrollTop - windowHeight < 50; // 50px 여유

      if (isAtBottom) {
        setIsVisible(false);
        clearTimeout(scrollTimer);
        return;
      }

      // 스크롤 감지 시 네비게이션바 표시
      setIsVisible(true);
      lastScrollY.current = window.scrollY;
      
      // 스크롤이 멈춘 후 2초 뒤 숨기기
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (window.scrollY === lastScrollY.current && !isAtBottom) {
          setIsVisible(false);
        }
      }, 2000);
    };

    const handleMouseMove = (e) => {
      const heroSection = document.getElementById('hero');
      let heroBottom = 0;
      if (heroSection) {
        heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      }

      // Hero 섹션에 있을 때는 마우스 이벤트 무시
      if (window.scrollY < heroBottom - 100) {
        return;
      }

      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;
      const bottomThreshold = windowHeight * 0.7; // 하단 30%

      // 화면 맨 끝에 도달했을 때는 마우스 이벤트 무시
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isAtBottom = scrollHeight - scrollTop - windowHeight < 50;

      if (isAtBottom) {
        return;
      }

      if (mouseY >= bottomThreshold) {
        setIsVisible(true);
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
          if (window.scrollY === lastScrollY.current && !isAtBottom) {
            setIsVisible(false);
          }
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // 초기 상태 설정

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimer);
      clearTimeout(mouseTimer);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <NavBar 
      className={`${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}
    >
      <NavItem
        onClick={() => scrollToSection('about')}
        className={activeSection === 'about' ? 'active' : ''}
      >
        About Me
      </NavItem>
      <NavItem
        onClick={() => scrollToSection('skills')}
        className={activeSection === 'skills' ? 'active' : ''}
      >
        기술
      </NavItem>
      <NavItem
        onClick={() => scrollToSection('experience')}
        className={activeSection === 'experience' ? 'active' : ''}
      >
        경력
      </NavItem>
      <NavItem
        onClick={() => scrollToSection('projects')}
        className={activeSection === 'projects' ? 'active' : ''}
      >
        프로젝트
      </NavItem>
    </NavBar>
  );
}

export default NavigationBar;


const NavBar = styled.nav`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  background: white;
  padding: 12px 32px;
  border-radius: 50px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  visibility: visible;

  &.scrolled {
    top: auto;
    bottom: 40px;
    transform: translateX(-50%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
  }

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(-20px);
    
    &.scrolled {
      transform: translateX(-50%) translateY(20px);
    }
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    
    &.scrolled {
      transform: translateX(-50%) translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px 16px;
    top: 20px;

    &.scrolled {
      bottom: 20px;
    }
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #7E8793;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  outline: none;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  &.active {
    color: #5A7ACD;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 11px;
  }
`;