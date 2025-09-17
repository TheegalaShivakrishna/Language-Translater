import React, { useState } from 'react';
import API from '../api';
import Toast from './Toast';
import './Translate.css';

function Translate() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const validateInput = () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return false;
    }
    if (sourceText.length > 5000) {
      setError('Text is too long. Please enter less than 5000 characters');
      return false;
    }
    if (sourceLang === targetLang) {
      setError('Source and target languages cannot be the same');
      return false;
    }
    return true;
  };

  const handleTranslate = async () => {
    setError('');
    setTranslatedText('');
    
    if (!validateInput()) {
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/translate', {
        sourceText: sourceText.trim(),
        sourceLang,
        targetLang,
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation Error:', error);
      setError(error.response?.data?.message || 'Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setError('');
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText('');
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ message: 'Text copied to clipboard!', type: 'success' });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setToast({ message: 'Failed to copy text', type: 'error' });
    }
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="translate-container">
      {toast && <Toast {...toast} onClose={closeToast} />}
      
      <h2>Language Translator</h2>
      
      <div className="main-translation-area">
        {/* Input Section */}
        <div className="input-section">
          <textarea
            rows="8"
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            disabled={loading}
            maxLength={5000}
          />
          <div className="char-count">
            {sourceText.length}/5000 characters
          </div>
        </div>

        {/* Language Switcher */}
        <div className="language-switcher">
          <button 
            className="swap-languages" 
            onClick={swapLanguages}
            title="Swap languages"
            disabled={loading}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          
          <div className="lang-select">
            <select 
              value={sourceLang} 
              onChange={(e) => setSourceLang(e.target.value)}
              disabled={loading}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
            </select>
            <span>From</span>
          </div>
          
          <div className="lang-select">
            <select 
              value={targetLang} 
              onChange={(e) => setTargetLang(e.target.value)}
              disabled={loading}
            >
              <option value="hi">Hindi</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
            </select>
            <span>To</span>
          </div>
        </div>

        {/* Output Section */}
        <div className="output-section">
          {translatedText ? (
            <>
              <div className="result-header">
                <h3>Translation</h3>
                <button 
                  onClick={() => copyToClipboard(translatedText)}
                  className="copy-btn"
                  title="Copy to clipboard"
                >
                  📋 Copy
                </button>
              </div>
              <div className="result-content">
                <p>{translatedText}</p>
              </div>
            </>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon">🌐</div>
              <p>Your translation will appear here</p>
            </div>
          )}
        </div>
      </div>

      <div className="button-group">
        <button 
          onClick={handleTranslate} 
          disabled={loading || !sourceText.trim()}
          className="translate-btn"
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
        <button 
          onClick={handleClear} 
          disabled={loading}
          className="clear-btn"
        >
          Clear All
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      
      {loading && (
        <div className="loading">
          <div className="loading-animation">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <p>Translating your text...</p>
        </div>
      )}
    </div>
  );
}

export default Translate;
