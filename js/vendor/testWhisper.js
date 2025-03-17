const fs = require('fs');
const fetch = require('node-fetch').default; // ✅ Fix import
const FormData = require('form-data');
const apiKey = '';
const audioFilePath = 'C:\\Users\\kiara\\Downloads\\Recording.wav';

async function transcribeAudio() {
  if (!fs.existsSync(audioFilePath)) {
    console.error('Error: Audio file not found!');
    return;
  }

  const formData = new FormData();
  formData.append('file', fs.createReadStream(audioFilePath));
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  try {
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data);
      return;
    }

    console.log('Transcription:', data.text || 'No transcription available');
  } catch (error) {
    console.error('Error:', error);
  }
}

transcribeAudio();



