import CustomCursor from './components/CustomCursor';
import Terminal from './components/Terminal';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ToolsSection from './components/ToolsSection';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import TerminalAnnouncement from './components/TerminalAnnouncement';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import RollingSquare from './components/RollingSquare';
import GitGalaxyEmbed from './components/gitgalaxyembed';



import './styles/index.css';

function App() {
    return (
        <SmoothScrollProvider>
            <div className="app">
                <CustomCursor />
                <RollingSquare />
                <Terminal />
                <TerminalAnnouncement />
                <Header />
                <main>
                    <Hero />
                    <Projects />

      <GitGalaxyEmbed height={600} />
      

                    <ToolsSection />
                    <Skills />
                    <About />
                    <Contact />
                </main>
                <Footer />
            </div>
        </SmoothScrollProvider>
    );
}

export default App;
