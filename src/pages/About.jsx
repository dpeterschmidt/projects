import './DetailPage.css';
import './About.css';

function About() {
  return (
    <div className="detail-page about-page">
      <div className="page-header">
        <div className="container">
          <h1>About Me</h1>
          <p className="page-intro">
            A multi-disciplinary creative professional passionate about audio and visual storytelling.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="about-main">
            <div className="about-photo-section">
              <div className="large-placeholder-photo">
                <span>Your Photo</span>
              </div>
            </div>

            <div className="about-text-section">
              <h2>My Story</h2>
              <p>
                I'm a multi-disciplinary creative professional with a passion for audio and
                visual storytelling. My journey in sound began over [X] years ago when I
                discovered the power of audio to transport, engage, and move people in ways
                that other media cannot.
              </p>
              <p>
                Since then, I've had the privilege of working on diverse projects ranging from
                intimate podcast productions to large-scale audio documentaries. Each project
                has deepened my understanding of how sound shapes our perception and emotional
                connection to stories.
              </p>
              <p>
                As an audio producer, I specialize in crafting narrative stories that engage
                and move listeners. My work combines technical precision with artistic
                sensibility, ensuring every production achieves both professional polish and
                emotional authenticity.
              </p>
              <p>
                My composition work has brought unique sonic identities to podcasts and media
                projects across various genres. I believe that the right music or theme can
                transform a good production into something truly memorable and distinct.
              </p>
              <p>
                Through sound design and mixing, I help productions achieve their full
                potential. Whether it's creating immersive soundscapes or ensuring crystal-clear
                dialogue, I bring the same level of care and attention to every element.
              </p>
              <p>
                My photography work complements my audio practice, offering another creative
                lens through which to capture and share compelling stories. Both disciplines
                inform each other, creating a holistic approach to storytelling.
              </p>
            </div>
          </div>

          <div className="skills-section">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Audio Production</h3>
                <ul>
                  <li>Narrative storytelling</li>
                  <li>Podcast production</li>
                  <li>Field recording</li>
                  <li>Interview recording & editing</li>
                  <li>Audio documentary production</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Music Composition</h3>
                <ul>
                  <li>Theme song creation</li>
                  <li>Underscore & background music</li>
                  <li>Music for podcasts & media</li>
                  <li>Musical arrangement</li>
                  <li>Genre versatility</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Sound Design</h3>
                <ul>
                  <li>Atmospheric soundscapes</li>
                  <li>Sound effects creation</li>
                  <li>Foley recording</li>
                  <li>Synthesis & sound creation</li>
                  <li>Audio restoration</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Audio Engineering</h3>
                <ul>
                  <li>Multi-track mixing</li>
                  <li>Dialogue editing & cleanup</li>
                  <li>Mastering for broadcast</li>
                  <li>Spatial audio & stereo imaging</li>
                  <li>Loudness standards compliance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="experience-section">
            <h2>Experience & Education</h2>
            <div className="experience-list">
              <div className="experience-item">
                <h4>Professional Experience</h4>
                <p>
                  Over [X] years of professional work in audio production, sound design, and
                  music composition for podcasts, documentaries, and commercial projects.
                  Clients range from independent creators to established media organizations.
                </p>
              </div>
              <div className="experience-item">
                <h4>Education & Training</h4>
                <p>
                  [Add your relevant education, degrees, certifications, or training programs.
                  For example: Bachelor's degree in Audio Production, certification in Pro Tools,
                  workshops in sound design, etc.]
                </p>
              </div>
              <div className="experience-item">
                <h4>Notable Projects</h4>
                <p>
                  Work has been featured in [add any notable publications, awards, or
                  recognitions]. Collaborated with podcasts reaching [add audience metrics if
                  applicable] listeners worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="approach-section">
            <h2>My Approach</h2>
            <p className="approach-intro">
              Every project is unique, and I believe in tailoring my approach to serve the
              specific needs and vision of each client. However, these core principles guide
              all my work:
            </p>
            <div className="principles-grid">
              <div className="principle-card">
                <h4>Collaboration</h4>
                <p>
                  The best results come from open communication and genuine partnership.
                  I work closely with clients to understand their vision and bring it to life.
                </p>
              </div>
              <div className="principle-card">
                <h4>Attention to Detail</h4>
                <p>
                  Small details make a big difference. Every element is carefully considered
                  and refined to ensure the highest quality final product.
                </p>
              </div>
              <div className="principle-card">
                <h4>Technical Excellence</h4>
                <p>
                  Professional-grade equipment and industry-standard practices ensure that
                  technical quality never compromises creative vision.
                </p>
              </div>
              <div className="principle-card">
                <h4>Emotional Authenticity</h4>
                <p>
                  Great audio work serves the story and the emotional truth at its core.
                  Technical skill must always serve artistic purpose.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <h2>Let's Create Something Together</h2>
            <p>
              I'm available for freelance work in music composition, audio engineering,
              sound design, and podcast mixing. Whether you have a specific project in mind
              or want to explore possibilities, I'd love to hear from you.
            </p>
            <div className="cta-buttons">
              <a href="mailto:your.email@example.com" className="primary-cta">
                Get in Touch
              </a>
              <a href="/#contact" className="secondary-cta">
                View Contact Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
