async function sendToGPT(question, transcript) {
  //const apiKey = '';
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI that assesses answers. Respond with 'Pass' or 'Fail'." },
          { role: "user", content: `Question: ${question}\nAnswer: ${transcript}\nIs the answer correct? Respond with 'Pass' or 'Fail'.` }
        ]
      })
    });

    const data = await response.json();
    console.log('Full API Response:', data); // Debugging step

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      return 'Error: Unexpected API response';
    }

    console.log('GPT Response:', data.choices[0].message.content.trim());
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error('API Request Failed:', error);
    return 'Error: API request failed';
  }
}

// Test the function
sendToGPT("What is 2+2?", "The answer is four.");
