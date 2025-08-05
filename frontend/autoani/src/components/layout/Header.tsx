const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-logo">
          AutoAni
        </a>
        
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/vehicles">Vehicles</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
