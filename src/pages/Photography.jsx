import './DetailPage.css';
import './Photography.css';

function Photography() {
  const photoCategories = [
    {
      category: 'Portrait',
      photos: [
        { id: 1, title: 'Urban Portrait', description: 'Environmental portrait in city setting' },
        { id: 2, title: 'Studio Session', description: 'Professional headshot session' },
        { id: 3, title: 'Natural Light', description: 'Outdoor portrait with natural lighting' },
        { id: 4, title: 'Editorial Portrait', description: 'Magazine-style editorial work' }
      ]
    },
    {
      category: 'Landscape',
      photos: [
        { id: 5, title: 'Mountain Vista', description: 'Sweeping mountain landscape' },
        { id: 6, title: 'Coastal Scene', description: 'Dramatic coastline at golden hour' },
        { id: 7, title: 'Forest Path', description: 'Serene woodland trail' },
        { id: 8, title: 'Urban Skyline', description: 'City architecture at dusk' }
      ]
    },
    {
      category: 'Documentary',
      photos: [
        { id: 9, title: 'Street Life', description: 'Candid moments from urban environments' },
        { id: 10, title: 'Cultural Event', description: 'Community celebration documentation' },
        { id: 11, title: 'Working Hands', description: 'Artisan at work series' },
        { id: 12, title: 'Daily Routines', description: 'Everyday moments captured authentically' }
      ]
    },
    {
      category: 'Conceptual',
      photos: [
        { id: 13, title: 'Abstract Forms', description: 'Geometric patterns and shapes' },
        { id: 14, title: 'Light Study', description: 'Exploration of light and shadow' },
        { id: 15, title: 'Texture Series', description: 'Close-up textural details' },
        { id: 16, title: 'Minimalist Composition', description: 'Simple, powerful imagery' }
      ]
    }
  ];

  return (
    <div className="detail-page photography-page">
      <div className="page-header">
        <div className="container">
          <h1>Photography</h1>
          <p className="page-intro">
            Visual storytelling through carefully composed photographs. From intimate
            portraits to sweeping landscapes, each image is crafted to evoke emotion
            and capture authentic moments.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {photoCategories.map((category, catIndex) => (
            <div key={catIndex} className="photo-category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="photo-gallery">
                {category.photos.map((photo) => (
                  <div key={photo.id} className="gallery-item">
                    <div className="placeholder-photo">
                      <span>{photo.title}</span>
                    </div>
                    <div className="photo-info">
                      <h4>{photo.title}</h4>
                      <p>{photo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="photography-approach">
            <h2>My Photography Philosophy</h2>
            <div className="philosophy-content">
              <p>
                My approach to photography is rooted in authenticity and intentionality.
                Whether capturing a planned portrait session or documenting spontaneous moments,
                I focus on finding the story within each frame.
              </p>
              <p>
                I believe great photography comes from understanding light, composition, and
                most importantly, the subject. Every session begins with conversation and
                connection, ensuring the final images truly represent the person, place, or
                moment being captured.
              </p>
            </div>
          </div>

          <div className="services-section">
            <h2>Photography Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Portrait Sessions</h3>
                <p>
                  Professional headshots, environmental portraits, and creative sessions
                  tailored to capture your unique personality.
                </p>
              </div>
              <div className="service-card">
                <h3>Event Documentation</h3>
                <p>
                  Comprehensive coverage of events, from intimate gatherings to large
                  productions, capturing key moments and atmosphere.
                </p>
              </div>
              <div className="service-card">
                <h3>Editorial & Commercial</h3>
                <p>
                  Professional imagery for publications, marketing materials, and
                  commercial projects with full licensing options.
                </p>
              </div>
              <div className="service-card">
                <h3>Fine Art Prints</h3>
                <p>
                  Limited edition prints available for select works, printed on archival
                  materials with certificate of authenticity.
                </p>
              </div>
            </div>
          </div>

          <div className="equipment-section">
            <h3>Equipment & Process</h3>
            <div className="equipment-grid">
              <div className="equipment-item">
                <h4>Cameras</h4>
                <p>Professional full-frame digital cameras with high-resolution sensors</p>
              </div>
              <div className="equipment-item">
                <h4>Lenses</h4>
                <p>Extensive collection from wide-angle to telephoto prime and zoom lenses</p>
              </div>
              <div className="equipment-item">
                <h4>Lighting</h4>
                <p>Portable and studio lighting systems for any shooting condition</p>
              </div>
              <div className="equipment-item">
                <h4>Post-Processing</h4>
                <p>Professional color grading and retouching using industry-standard software</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photography;
