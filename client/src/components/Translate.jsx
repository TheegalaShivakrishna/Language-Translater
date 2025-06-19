import React, { useState } from 'react';
import axios from 'axios';
import './Translate.css';

function Translate() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
  try {
    const response = await axios.post('/api/translate', {
      sourceText,
      sourceLang,
      targetLang,
    });

    setTranslatedText(response.data.translatedText);
  } catch (error) {
    console.error('Translation Error:', error);
    alert('Translation failed. Please try again.');
  }
};


  return (
    <div className="translate-container">
      <h2>Language Translator</h2>
      <textarea
        rows="4"
        placeholder="Enter text"
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
      />
      <div className="lang-select">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <span>to</span>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      {error && <p className="error">{error}</p>}
      {translatedText && (
        <div className="translated-result">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Translate;
