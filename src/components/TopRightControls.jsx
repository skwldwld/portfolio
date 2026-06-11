import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Wrap = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
  }
`;

function TopRightControls() {
  return (
    <Wrap>
      <ThemeToggle />
      <LanguageToggle />
    </Wrap>
  );
}

export default TopRightControls;

