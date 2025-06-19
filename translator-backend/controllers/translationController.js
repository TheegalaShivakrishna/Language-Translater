const axios = require('axios');
const Translation = require('../models/Translation');

const translateText = async (req, res) => {
  const { sourceText, sourceLang, targetLang } = req.body;

  try {
    const response = await axios.post(
      'https://api.apilayer.com/language_translation/translate',
      {
        q: sourceText,
        source: sourceLang,
        target: targetLang
      },
      {
        headers: {
          apikey: process.env.APILAYER_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const translatedText = response.data.translatedText;

    const translation = await Translation.create({
      user: req.user._id,
      sourceText,
      translatedText,
      sourceLang,
      targetLang
    });

    res.json(translation);
  } catch (err) {
    console.error('Translation API Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Translation failed' });
  }
};

const getTranslations = async (req, res) => {
  try {
    const translation = await Translation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(translation);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch translations' });
  }
};

module.exports = { translateText, getTranslations };
