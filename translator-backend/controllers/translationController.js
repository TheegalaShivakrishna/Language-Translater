const axios = require('axios');
const Translation = require('../models/Translation');

const translateText = async (req, res) => {
  const { sourceText, sourceLang, targetLang } = req.body;
  console.log('Translation request received:', { sourceText, sourceLang, targetLang });

  if (!req.user) {
    console.error('User not found on request. Middleware issue?');
    return res.status(401).json({ message: 'Not authorized' });
  }
  console.log('Request initiated by user:', req.user.email);

  if (!process.env.RAPIDAPI_KEY) {
    console.error('RAPIDAPI_KEY is not set in .env file');
    return res.status(500).json({ message: 'Server configuration error: Missing API key' });
  }

  try {
    console.log('Calling external translation API...');
    const response = await axios.post(
      'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      {
        from: sourceLang,
        to: targetLang,
        text: sourceText
      },
      {
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('External API response received.');
    const translatedText = response.data.trans || response.data.translated_text || response.data.translatedText;

    if (!translatedText) {
      console.error('Translated text not found in external API response:', response.data);
      return res.status(500).json({ message: 'Failed to get translation from provider' });
    }

    console.log('Saving translation to the database...');
    const translation = await Translation.create({
      user: req.user._id,
      sourceText,
      translatedText,
      sourceLang,
      targetLang
    });
    console.log('Translation saved successfully.');

    res.json(translation);
  } catch (err) {
    console.error('--- TRANSLATION ERROR ---');
    if (err.response) {
      console.error('Error Data:', err.response.data);
      console.error('Error Status:', err.response.status);
      console.error('Error Headers:', err.response.headers);
    } else if (err.request) {
      console.error('Error Request:', err.request);
    } else {
      console.error('Error Message:', err.message);
    }
    console.error('Full Error Object:', err.config);
    console.error('--- END TRANSLATION ERROR ---');

    res.status(500).json({ message: 'Translation failed due to a server error' });
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
