import { Link } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-image">
              <div className="placeholder-image">
                <span>Your Photo</span>
              </div>
            </div>
            <div className="hero-text">
              <h1>Hi, I'm [Your Name]</h1>
              <p className="lead">
                An audio producer, engineer, sound designer, composer, and photographer
                passionate about crafting immersive sonic experiences and capturing
                compelling visual stories.
              </p>
              <p>
                With years of experience in podcasting, music production, and creative
                sound work, I bring technical expertise and artistic sensibility to
                every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="stories-section section">
        <div className="container">
          <div className="section-header">
            <h2>Audio Stories</h2>
            <Link to="/stories" className="view-more">View All Stories →</Link>
          </div>
          <p className="section-intro">
            Narrative audio pieces that transport listeners through sound, blending
            interviews, soundscapes, and expert mixing.
          </p>

          <div className="stories-grid">
            <div className="story-card">
              <AudioPlayer
                title="The Urban Symphony"
                description="A sonic journey through city life, capturing the rhythm of the streets."
                audioSrc="/audio/placeholder.mp3"
              />
            </div>
            <div className="story-card">
              <AudioPlayer
                title="Voices of Change"
                description="Intimate conversations exploring transformation and resilience."
                audioSrc="/audio/placeholder.mp3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Music/Theme Songs Section */}
      <section className="music-section section">
        <div className="container">
          <div className="section-header">
            <h2>Music & Theme Songs</h2>
            <Link to="/music" className="view-more">View All Music →</Link>
          </div>
          <p className="section-intro">
            Original compositions and theme songs crafted for podcasts and media projects.
          </p>

          <div className="music-grid">
            <div className="music-card">
              <AudioPlayer
                title="Tech Talk Theme"
                description="Upbeat, modern theme for a technology podcast"
                audioSrc="/audio/placeholder.mp3"
              />
              <div className="client-info">
                <span className="client-label">Client:</span> Tech Insights Podcast
              </div>
            </div>
            <div className="music-card">
              <AudioPlayer
                title="Mystery Hour Opening"
                description="Mysterious and engaging theme for a true crime podcast"
                audioSrc="/audio/placeholder.mp3"
              />
              <div className="client-info">
                <span className="client-label">Client:</span> Mystery Hour Productions
              </div>
            </div>
          </div>

          <div className="testimonials">
            <h3>Client Testimonials</h3>
            <div className="testimonials-grid">
              <div className="testimonial">
                <p className="quote">
                  "The theme song perfectly captured our podcast's energy. Our listeners
                  love it and it's become instantly recognizable."
                </p>
                <p className="author">— Sarah Johnson, Tech Insights</p>
              </div>
              <div className="testimonial">
                <p className="quote">
                  "Working with [Your Name] was seamless. They understood our vision
                  and delivered beyond expectations."
                </p>
                <p className="author">— Mike Chen, Mystery Hour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sound Design Section */}
      <section className="sound-design-section section">
        <div className="container">
          <div className="section-header">
            <h2>Sound Design & Mixing</h2>
            <Link to="/sound-design" className="view-more">View All Work →</Link>
          </div>
          <p className="section-intro">
            Expertly crafted soundscapes and professional mixing that brings productions to life.
          </p>

          <div className="sound-design-grid">
            <div className="sound-design-card">
              <AudioPlayer
                title="Atmospheric Soundscape"
                description="Layered ambient design for documentary film"
                audioSrc="/audio/placeholder.mp3"
              />
            </div>
            <div className="sound-design-card">
              <AudioPlayer
                title="Podcast Mix - Episode 42"
                description="Professional mixing with dynamic EQ and spatial enhancement"
                audioSrc="/audio/placeholder.mp3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section className="photography-section section">
        <div className="container">
          <div className="section-header">
            <h2>Photography</h2>
            <Link to="/photography" className="view-more">View All Photos →</Link>
          </div>
          <p className="section-intro">
            Visual storytelling through carefully composed photographs.
          </p>

          <div className="photo-grid">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="photo-card">
                <div className="placeholder-photo">
                  <span>Photo {num}</span>
                </div>
                <p className="photo-caption">Sample photograph {num}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <p>
              I'm a multi-disciplinary creative professional with a passion for audio
              and visual storytelling. My journey in sound began over [X] years ago,
              and since then, I've had the privilege of working on diverse projects
              ranging from intimate podcasts to large-scale productions.
            </p>
            <p>
              As an audio producer, I specialize in crafting narrative stories that
              engage and move listeners. My work as a composer has brought unique sonic
              identities to podcasts and media projects. Through sound design and mixing,
              I ensure every production achieves professional polish and emotional impact.
            </p>
            <p>
              My photography work complements my audio practice, offering another lens
              through which to capture and share compelling stories.
            </p>
            <Link to="/about" className="read-more-btn">
              Read Full Bio →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section">
        <div className="container">
          <h2>Let's Work Together</h2>
          <p className="contact-intro">
            I'm available for freelance work in music composition, audio engineering,
            sound design, and podcast mixing. Let's create something amazing together.
          </p>

          <div className="contact-methods">
            <div className="contact-card">
              <h3>Email</h3>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </div>
            <div className="contact-card">
              <h3>Services</h3>
              <ul>
                <li>Music Composition</li>
                <li>Audio Engineering</li>
                <li>Sound Design</li>
                <li>Podcast Mixing</li>
                <li>Audio Production</li>
              </ul>
            </div>
            <div className="contact-card">
              <h3>Connect</h3>
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#" target="_blank" rel="noopener noreferrer">SoundCloud</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
