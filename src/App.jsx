import Hero from './sections/Hero.jsx';
import Message from './sections/Message';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Project';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <Message />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
