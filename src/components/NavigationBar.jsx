import { useState, useEffect } from 'react';
import styled from 'styled-components';

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }

      // 현재 활성 섹션 감지
      const sections = ['hero', 'about', 'skills', 'experience', 'projects'];
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <NavBar className={isScrolled ? 'scrolled' : ''}>
      <NavItem
        onClick={() => scrollToSection('about')}
        className={activeSection === 'about' || activeSection === 'hero' ? 'active' : ''}
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

  &.scrolled {
    top: auto;
    bottom: 40px;
    transform: translateX(-50%);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 10px 20px;
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

  &:hover {
    transform: translateY(-2px);
  }

  &.active {
    color: #5A7ACD;

    // &::after {
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    //   left: 20px;
    //   right: 20px;
    //   height: 2px;
    //   background: #5A7ACD;
    //   border-radius: 2px;
    // }
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }
`;