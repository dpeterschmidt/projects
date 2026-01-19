import AudioPlayer from '../components/AudioPlayer';
import './DetailPage.css';

function SoundDesign() {
  const projects = [
    {
      title: 'Atmospheric Soundscape',
      description: 'Layered ambient design for documentary film',
      type: 'Documentary Sound Design',
      details: 'Created immersive environmental soundscapes using field recordings and synthesis to enhance the visual narrative.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Podcast Mix - Episode 42',
      description: 'Professional mixing with dynamic EQ and spatial enhancement',
      type: 'Podcast Mixing',
      details: 'Full episode mix including dialogue cleanup, level balancing, music integration, and final mastering.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Urban Environment Build',
      description: 'Complex city soundscape with multiple layers',
      type: 'Environmental Design',
      details: 'Built from 50+ individual sound elements to create a realistic and engaging urban environment.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Sci-Fi Interface Design',
      description: 'Futuristic UI sounds for interactive media',
      type: 'Interface Sound Design',
      details: 'Original synthetic sounds for buttons, transitions, and interactive elements in a sci-fi setting.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Nature Documentary Mix',
      description: 'Multi-channel mix for wildlife documentary',
      type: 'Documentary Mixing',
      details: 'Balanced mix featuring narration, natural ambiences, and subtle musical score.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Horror Atmosphere',
      description: 'Tension-building soundscape for thriller podcast',
      type: 'Dramatic Sound Design',
      details: 'Created unsettling atmospheres using processed organic sounds and synthesis.',
      audioSrc: '/audio/placeholder.mp3'
    }
  ];

  return (
    <div className="detail-page">
      <div className="page-header">
        <div className="container">
          <h1>Sound Design & Mixing</h1>
          <p className="page-intro">
            Professional sound design and mixing services that bring productions to life.
            From subtle environmental atmospheres to dramatic soundscapes, every element
            is crafted with attention to detail and emotional impact.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="work-grid">
            {projects.map((project, index) => (
              <div key={index} className="work-item">
                <AudioPlayer
                  title={project.title}
                  description={project.description}
                  audioSrc={project.audioSrc}
                />
                <div className="work-meta">
                  <div className="meta-item">
                    <span className="meta-label">Type:</span>
                    <span className="meta-value">{project.type}</span>
                  </div>
                </div>
                <div className="work-details">
                  <p>{project.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="capabilities-section">
            <h2>Capabilities & Tools</h2>
            <div className="capabilities-grid">
              <div className="capability-card">
                <h3>Sound Design</h3>
                <ul>
                  <li>Atmospheric & environmental sound</li>
                  <li>Foley recording & editing</li>
                  <li>Synthesis & sound creation</li>
                  <li>Audio restoration & cleanup</li>
                  <li>Field recording</li>
                </ul>
              </div>
              <div className="capability-card">
                <h3>Mixing & Mastering</h3>
                <ul>
                  <li>Dialogue editing & cleanup</li>
                  <li>Multi-track mixing</li>
                  <li>Spatial audio & stereo imaging</li>
                  <li>Dynamic processing</li>
                  <li>Final mastering for broadcast</li>
                </ul>
              </div>
              <div className="capability-card">
                <h3>Software & Equipment</h3>
                <ul>
                  <li>Pro Tools, Reaper, Ableton Live</li>
                  <li>iZotope RX Suite</li>
                  <li>FabFilter plugin suite</li>
                  <li>Extensive sound library</li>
                  <li>Professional field recording gear</li>
                </ul>
              </div>
              <div className="capability-card">
                <h3>Deliverables</h3>
                <ul>
                  <li>Broadcast-ready masters</li>
                  <li>Multiple format delivery</li>
                  <li>Loudness standards compliance</li>
                  <li>Stem mixes available</li>
                  <li>High-resolution archival files</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="process-section">
            <h2>My Approach</h2>
            <p className="section-intro">
              Every project is unique, but my process ensures consistent quality and
              clear communication throughout.
            </p>
            <div className="approach-list">
              <div className="approach-item">
                <div className="approach-number">1</div>
                <div className="approach-content">
                  <h4>Consultation & Planning</h4>
                  <p>
                    We discuss your vision, reference materials, and technical requirements
                    to ensure alignment before work begins.
                  </p>
                </div>
              </div>
              <div className="approach-item">
                <div className="approach-number">2</div>
                <div className="approach-content">
                  <h4>Sound Gathering & Creation</h4>
                  <p>
                    I source or create all necessary sound elements, whether through field
                    recording, synthesis, or library selection.
                  </p>
                </div>
              </div>
              <div className="approach-item">
                <div className="approach-number">3</div>
                <div className="approach-content">
                  <h4>Design & Mixing</h4>
                  <p>
                    Careful layering, processing, and mixing brings everything together,
                    with regular check-ins to ensure we're on track.
                  </p>
                </div>
              </div>
              <div className="approach-item">
                <div className="approach-number">4</div>
                <div className="approach-content">
                  <h4>Review & Refinement</h4>
                  <p>
                    You review the work and provide feedback. I make revisions to ensure
                    the final product exceeds expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoundDesign;
