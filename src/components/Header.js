import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">CalcZone BR</Link>
        <nav className="nav">
          <Link to="/">Início</Link>
          <a href="/guia-completo.html">Guia</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
