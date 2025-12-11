import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} CalcZone BR. Todos os direitos reservados.</p>
        <div className="footer-links">
          <a href="#privacy">Privacidade</a>
          <a href="#terms">Termos</a>
          <a href="#contact">Contato</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
