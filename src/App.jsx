import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Music from './pages/Music';
import SoundDesign from './pages/SoundDesign';
import Photography from './pages/Photography';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/music" element={<Music />} />
            <Route path="/sound-design" element={<SoundDesign />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
