const Navigation = () => {
  return (
    <nav className="container">
      <div className="logo">
        <img src="/images/brand_logo.png" alt="BandLogo" />
      </div>
      <ul>
        <li>MENU</li>
        <li>LOCATION</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>
      <div className="button-borders">
        <button class="primary-button">Login</button>
      </div>
    </nav>
  );
};

export default Navigation;
