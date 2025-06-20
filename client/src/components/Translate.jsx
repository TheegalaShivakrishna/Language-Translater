import React, { useState } from 'react';
import API from '../api';
import './Translate.css';

function Translate() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="translate-container">
      <h2>Language Translator</h2>
      
      <div className="input-section">
        <textarea
          rows="4"
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
        <span>to</span>
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
          Clear
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Translating your text...</p>
        </div>
      )}

      {translatedText && (
        <div className="translated-result">
          <div className="result-header">
            <h3>Translated Text:</h3>
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
        </div>
      )}
    </div>
  );
}

export default Translate;
