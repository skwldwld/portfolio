import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';
import { useThemeMode } from '../context/ThemeContext';

const fillCircle = keyframes`
  0% { clip-path: circle(0% at 50% 50%); }
  100% { clip-path: circle(150% at 50% 50%); }
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  outline: none;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.text};
    opacity: 0.12;
    clip-path: circle(0% at 50% 50%);
  }

  &[data-anim='true']::before {
    animation: ${fillCircle} 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  &:hover::before {
    clip-path: circle(75% at 50% 50%);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-anim='true']::before {
      animation: none;
    }
  }
`;

const IconStack = styled.span`
  width: 22px;
  height: 22px;
  position: relative;
  z-index: 1;
`;

const Icon = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'scale(1) rotate(0deg)' : 'scale(0.82) rotate(-12deg)')};
  transition: opacity 220ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const onToggle = () => {
    setAnimating(true);
    toggleTheme();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAnimating(false), 460);
  };

  const isLight = mode !== 'dark';

  return (
    <Button
      type="button"
      onClick={onToggle}
      data-anim={animating ? 'true' : 'false'}
      aria-label={isLight ? '다크 모드로 전환' : '라이트 모드로 전환'}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      <IconStack aria-hidden="true">
        <Icon src={moonIcon} alt="" $active={isLight} />
        <Icon src={sunIcon} alt="" $active={!isLight} />
      </IconStack>
    </Button>
  );
}

export default ThemeToggle;

