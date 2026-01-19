import AudioPlayer from '../components/AudioPlayer';
import './DetailPage.css';

function Music() {
  const compositions = [
    {
      title: 'Tech Talk Theme',
      description: 'Upbeat, modern theme for a technology podcast',
      client: 'Tech Insights Podcast',
      genre: 'Electronic, Upbeat',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Mystery Hour Opening',
      description: 'Mysterious and engaging theme for a true crime podcast',
      client: 'Mystery Hour Productions',
      genre: 'Cinematic, Suspenseful',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Morning Mindfulness',
      description: 'Calming, contemplative theme for a wellness podcast',
      client: 'Mindful Mornings',
      genre: 'Ambient, Peaceful',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Sports Center Sting',
      description: 'High-energy opener for a sports analysis show',
      client: 'The Game Plan Podcast',
      genre: 'Rock, Energetic',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'History Uncovered',
      description: 'Epic orchestral theme for a history podcast',
      client: 'Time Travel Tales',
      genre: 'Orchestral, Epic',
      audioSrc: '/audio/placeholder.mp3'
    },
    {
      title: 'Comedy Hour Intro',
      description: 'Fun, quirky theme for a comedy podcast',
      client: 'Laugh Track Productions',
      genre: 'Quirky, Fun',
      audioSrc: '/audio/placeholder.mp3'
    }
  ];

  const testimonials = [
    {
      quote: 'The theme song perfectly captured our podcast\'s energy. Our listeners love it and it\'s become instantly recognizable. We couldn\'t be happier!',
      author: 'Sarah Johnson',
      company: 'Tech Insights',
      project: 'Tech Talk Theme'
    },
    {
      quote: 'Working with [Your Name] was seamless. They understood our vision immediately and delivered beyond expectations. The composition elevated our entire production.',
      author: 'Mike Chen',
      company: 'Mystery Hour',
      project: 'Mystery Hour Opening'
    },
    {
      quote: 'Our listeners tell us the theme song sets the perfect mood for our show. It\'s exactly what we needed - calming but engaging.',
      author: 'Emily Rodriguez',
      company: 'Mindful Mornings',
      project: 'Morning Mindfulness'
    },
    {
      quote: 'The energy of the music gets our audience pumped up right from the start. It\'s become an essential part of our show\'s identity.',
      author: 'James Peterson',
      company: 'The Game Plan',
      project: 'Sports Center Sting'
    }
  ];

  return (
    <div className="detail-page">
      <div className="page-header">
        <div className="container">
          <h1>Music & Theme Songs</h1>
          <p className="page-intro">
            Original compositions crafted to give podcasts and media projects their
            unique sonic identity. From upbeat and energetic to mysterious and contemplative,
            each piece is tailored to enhance the show's character and engage listeners.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="work-grid">
            {compositions.map((composition, index) => (
              <div key={index} className="work-item">
                <AudioPlayer
                  title={composition.title}
                  description={composition.description}
                  audioSrc={composition.audioSrc}
                />
                <div className="work-meta">
                  <div className="meta-item">
                    <span className="meta-label">Client:</span>
                    <span className="meta-value">{composition.client}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Genre:</span>
                    <span className="meta-value">{composition.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-section">
            <h2>Client Testimonials</h2>
            <p className="section-intro">
              Here's what clients have said about working with me on their podcast themes and music.
            </p>
            <div className="testimonials-list">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <p className="author-name">{testimonial.author}</p>
                    <p className="author-company">{testimonial.company}</p>
                    <p className="author-project">Project: {testimonial.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services-section">
            <h2>Music Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Podcast Theme Songs</h3>
                <p>
                  Custom compositions that capture your show's personality and create
                  instant recognition with your audience.
                </p>
              </div>
              <div className="service-card">
                <h3>Background Music</h3>
                <p>
                  Subtle underscore and atmospheric music that enhances storytelling
                  without overwhelming dialogue.
                </p>
              </div>
              <div className="service-card">
                <h3>Stings & Bumpers</h3>
                <p>
                  Short musical elements for transitions, segment breaks, and sponsor
                  messages that maintain your sonic brand.
                </p>
              </div>
              <div className="service-card">
                <h3>Music Licensing</h3>
                <p>
                  Full rights transfer with unlimited usage, ensuring you own your
                  show's musical identity completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
