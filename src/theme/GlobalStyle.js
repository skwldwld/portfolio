import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.mode};
    --cursor-fill: ${({ theme }) => (theme.mode === 'dark' ? theme.colors.text : '#000000a7')};
    --cursor-border: ${({ theme }) => (theme.mode === 'dark' ? theme.colors.text : '#2B2A2A')};
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 280ms ease, color 280ms ease;
  }

  a {
    color: inherit;
  }
`;

export default GlobalStyle;