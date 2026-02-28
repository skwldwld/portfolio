import styled from 'styled-components';
import languageIcon from '../assets/language.svg';
import { useLanguage } from '../context/LanguageContext';

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
  outline: none;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.text};
    opacity: 0.12;
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 220ms ease;
  }

  &:hover::before {
    clip-path: circle(75% at 50% 50%);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const IconImg = styled.img`
  width: 22px;
  height: 22px;
  display: block;
  position: relative;
  z-index: 1;
`;

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <ToggleButton
      type="button"
      onClick={toggle}
      aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
      title={language === 'ko' ? 'English' : '한국어'}
    >
      <IconImg src={languageIcon} alt="" />
    </ToggleButton>
  );
}

export default LanguageToggle;
