import Hero from './sections/Hero.jsx';
import Message from './sections/Message';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Project';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Hero />
      <Message />
      <About />
      <Skills />
      <Experience />
      <Projects />
      {/* <Contact /> */}
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
