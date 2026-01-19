import AudioPlayer from '../components/AudioPlayer';
import './DetailPage.css';

function Stories() {
  const stories = [
    {
      title: 'The Urban Symphony',
      description: 'A sonic journey through city life, capturing the rhythm and pulse of urban environments.',
      fullDescription: 'This piece explores the soundscape of a modern city, weaving together ambient recordings, interviews with city dwellers, and carefully crafted musical elements to create an immersive 20-minute journey.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Voices of Change',
      description: 'Intimate conversations exploring transformation and resilience in everyday life.',
      fullDescription: 'A collection of personal narratives from individuals who have navigated significant life changes, expertly mixed to highlight the emotion and authenticity of each story.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Nature\'s Echo',
      description: 'Environmental soundscapes blended with naturalist commentary.',
      fullDescription: 'Recorded across various ecosystems, this piece combines field recordings with expert narration to create an educational yet engaging listening experience.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'The Lost Archive',
      description: 'A historical deep dive using archival audio and modern production techniques.',
      fullDescription: 'This documentary-style piece brings historical events to life through carefully restored archival recordings, complemented by contemporary interviews and atmospheric sound design.',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Midnight Conversations',
      description: 'Late-night discussions that explore philosophy, culture, and the human experience.',
      fullDescription: 'An intimate series featuring thoughtful conversations recorded in unique acoustic spaces, with subtle musical underscoring that enhances the contemplative mood.',
      audioSrc: '/audio/placeholder.mp3'
    }
  ];

  return (
    <div className="detail-page">
      <div className="page-header">
        <div className="container">
          <h1>Audio Stories</h1>
          <p className="page-intro">
            Narrative audio pieces that blend journalism, sound art, and storytelling
            to create immersive listening experiences. Each story is carefully crafted
            with attention to pacing, atmosphere, and emotional resonance.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="work-grid">
            {stories.map((story, index) => (
              <div key={index} className="work-item">
                <AudioPlayer
                  title={story.title}
                  description={story.description}
                  audioSrc={story.audioSrc}
                />
                <div className="work-details">
                  <p>{story.fullDescription}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="process-section">
            <h2>My Process</h2>
            <div className="process-grid">
              <div className="process-card">
                <h3>1. Research & Planning</h3>
                <p>
                  Every story begins with thorough research and careful planning.
                  I develop the narrative arc and identify key moments that will
                  resonate with listeners.
                </p>
              </div>
              <div className="process-card">
                <h3>2. Recording & Gathering</h3>
                <p>
                  High-quality field recordings and interviews form the foundation.
                  I use professional equipment to capture clean, immersive audio
                  in diverse environments.
                </p>
              </div>
              <div className="process-card">
                <h3>3. Editing & Sound Design</h3>
                <p>
                  Careful editing brings the narrative together, while sound design
                  and music enhance emotional impact and maintain engagement throughout.
                </p>
              </div>
              <div className="process-card">
                <h3>4. Mixing & Mastering</h3>
                <p>
                  Final mixing ensures perfect balance and clarity, with mastering
                  that meets broadcast standards and sounds great on any platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
