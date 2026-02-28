import { LanguageProvider } from './context/LanguageContext';
import { ThemeModeProvider } from './context/ThemeContext';
import Hero from './sections/Hero.jsx';
import Message from './sections/Message';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Project';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import TopRightControls from './components/TopRightControls';
import GlobalStyle from './theme/GlobalStyle';

function App() {
  return (
    <LanguageProvider>
      <ThemeModeProvider>
        <GlobalStyle />
        <CustomCursor />
        <TopRightControls />
        <Hero />
        <Message />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ScrollToTop />
        <Footer />
      </ThemeModeProvider>
    </LanguageProvider>
  );
}

export default App;
