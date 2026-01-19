import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Your Name</h1>
        </Link>

        <nav className="nav">
          <Link to="/stories" className={location.pathname === '/stories' ? 'active' : ''}>
            Stories
          </Link>
          <Link to="/music" className={location.pathname === '/music' ? 'active' : ''}>
            Music
          </Link>
          <Link to="/sound-design" className={location.pathname === '/sound-design' ? 'active' : ''}>
            Sound Design
          </Link>
          <Link to="/photography" className={location.pathname === '/photography' ? 'active' : ''}>
            Photography
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
        </nav>

        <button className="cta-button" onClick={scrollToContact}>
          Get in Touch
        </button>
      </div>
    </header>
  );
}

export default Header;
