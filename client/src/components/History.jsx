// History.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import './History.css';

function History() {
  const [translations, setTranslations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/translate/history');
        setTranslations(res.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return (
      <div className="history-container">
        <h2>Translation History</h2>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your translation history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2>Translation History</h2>
      {error && <p className="error">{error}</p>}
      {translations.length === 0 ? (
        <div className="empty-state">
          <p>No translation history found.</p>
          <p>Start translating to see your history here!</p>
        </div>
      ) : (
        <div className="history-list">
          {translations.map((t) => (
            <div key={t._id} className="history-item">
              <div className="history-header">
                <span className="language-pair">
                  {t.sourceLang.toUpperCase()} → {t.targetLang.toUpperCase()}
                </span>
                <span className="date">{formatDate(t.createdAt)}</span>
              </div>
              <div className="translation-content">
                <div className="source-text">
                  <strong>Original:</strong>
                  <p>{t.sourceText}</p>
                  <button 
                    onClick={() => copyToClipboard(t.sourceText)}
                    className="copy-btn-small"
                    title="Copy original text"
                  >
                    📋
                  </button>
                </div>
                <div className="translated-text">
                  <strong>Translation:</strong>
                  <p>{t.translatedText}</p>
                  <button 
                    onClick={() => copyToClipboard(t.translatedText)}
                    className="copy-btn-small"
                    title="Copy translated text"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
