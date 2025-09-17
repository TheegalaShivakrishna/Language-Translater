import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <span role="img" aria-label="globe">🌐</span> LangTranslater
      </div>
      <div className="footer-links">
        <a href="/" className="footer-link">Home</a>
        <a href="/translate" className="footer-link">Translate</a>
        <a href="/history" className="footer-link">History</a>
        <a href="https://github.com/TheegalaShivakrishna" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} LangTranslater. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 