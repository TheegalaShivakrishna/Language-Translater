// History.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

function History() {
  const [translations, setTranslations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/translate/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTranslations(res.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Translation History</h2>
      {error && <p className="error">{error}</p>}
      {translations.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {translations.map((t) => (
            <li key={t._id}>
              <strong>{t.sourceLang.toUpperCase()}</strong>: {t.sourceText} <br />
              ➡ <strong>{t.targetLang.toUpperCase()}</strong>: {t.translatedText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
