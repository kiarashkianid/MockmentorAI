let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active');
}

// Function to send transcript to GPT API
async function sendToGPT(question, transcript) {
  const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
  const url = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are an AI that assesses answers to questions. Determine if the answer is correct or not."
        },
        {
          role: "user",
          content: `Question: ${question}\nAnswer: ${transcript}\nIs the answer correct? Respond with 'Pass' or 'Fail'.`
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Function to handle the recording and assessment
function startAssessment(question) {
  let mediaRecorder;
  let audioChunks = [];

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        // Convert audio to text using Web Speech API
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.onresult = async event => {
          const transcript = event.results[0][0].transcript;
          console.log('Transcript:', transcript);

          // Send the transcript to GPT API for assessment
          const result = await sendToGPT(question, transcript);
          console.log('Assessment Result:', result);

          // Redirect to pass or fail page based on the result
          if (result === 'Pass') {
            window.location.href = 'pages/pass.html';
          } else {
            window.location.href = 'pages/fail.html';
          }
        };

        recognition.start();
      };
    });
}

// Example usage in question.html
function showQuestion() {
  const question = "Q. What is the value of pi (π)?"; // Example question
  document.getElementById("question").innerText = question;
  startAssessment(question);
}
