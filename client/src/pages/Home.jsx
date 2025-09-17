import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">LangTranslater</span>
          </h1>
          <p className="hero-subtitle">
            Break down language barriers with our AI-powered translation service. 
            Translate text between 12+ languages with professional accuracy.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <span>Fast & Accurate</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💡</span>
              <span>AI-Powered</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/translate" className="cta-button primary">
              Start Translating
            </Link>
            <Link to="/history" className="cta-button secondary">
              View History
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-content">
              <span className="card-flag">🇺🇸</span>
              <span className="card-text">Hello World</span>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-content">
              <span className="card-flag">🇪🇸</span>
              <span className="card-text">Hola Mundo</span>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-content">
              <span className="card-flag">🇫🇷</span>
              <span className="card-text">Bonjour le Monde</span>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose LangTranslater?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-large">🌍</div>
            <h3>Multi-Language Support</h3>
            <p>Translate between 12+ languages including English, Spanish, French, German, and more.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Get instant translations powered by advanced AI technology for quick and accurate results.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">📱</div>
            <h3>Responsive Design</h3>
            <p>Beautiful interface that works perfectly on all devices - desktop, tablet, and mobile.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">🔒</div>
            <h3>Privacy First</h3>
            <p>Your translations are secure and private. We don't store or share your personal data.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Break Language Barriers?</h2>
        <p>Join thousands of users who trust LangTranslater for their translation needs.</p>
        <Link to="/translate" className="cta-button primary large">
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
