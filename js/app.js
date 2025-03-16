document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('.subject-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach(cb => {
        if (cb !== this) cb.checked = false;
      });
    });
  });

  const takeTestButton = document.getElementById('takeTestButton');

  if (takeTestButton) {
    takeTestButton.addEventListener('click', () => {
      console.log("Take Test button clicked!");

      const selectedSubject = document.querySelector('.subject-checkbox:checked');

      if (selectedSubject) {
        localStorage.setItem('selectedSubject', selectedSubject.id); // Store selected subject
        window.location.href = 'question.html';
      } else {
        alert('Please select one subject.');
      }
    });
  }

  // Question Dictionary (10 questions per subject)
  // Harder Question Dictionary
  const questionsBySubject = {
    Maths: [
      "Solve for x: 3x² - 5x + 2 = 0",
      "Evaluate the integral: ∫(3x² - 2x + 1) dx",
      "Find the determinant of the matrix: [[2,3],[4,5]]",
      "What is the derivative of sin(x) * cos(x)?",
      "If f(x) = 2x³ - 4x² + x, find f'(x).",
      "Solve: log₂(32) - log₂(4)",
      "Find the equation of the tangent to the curve y = x³ at x = 2.",
      "Prove that sin²(x) + cos²(x) = 1.",
      "What is the sum of an infinite geometric series with a first term of 5 and a common ratio of 1/3?",
      "Determine the eigenvalues of the matrix [[1,2],[2,1]]."
    ],
    Science: [
      "Explain how CRISPR technology is used for gene editing.",
      "Describe the process of nuclear fission and its applications.",
      "What is quantum entanglement and why is it important in physics?",
      "How does the Higgs boson give mass to particles?",
      "What is the Heisenberg Uncertainty Principle?",
      "Explain the role of dark matter in the universe.",
      "Describe how superconductors work and their potential applications.",
      "Explain how a fuel cell generates electricity using hydrogen and oxygen.",
      "What are the effects of microgravity on the human body?",
      "Describe the principles behind MRI (Magnetic Resonance Imaging)."
    ],
    Physics: [
      "Derive the time dilation formula in special relativity.",
      "Explain the significance of Maxwell’s equations in electromagnetism.",
      "What is Schrödinger’s equation and how does it describe quantum systems?",
      "Explain the concept of wave-particle duality.",
      "How does the Doppler Effect apply to both sound and light waves?",
      "Explain the principle of conservation of angular momentum.",
      "Derive the equation for the period of a simple pendulum.",
      "How does the second law of thermodynamics apply to heat engines?",
      "Describe the photoelectric effect and its significance in quantum mechanics.",
      "Explain why superconductors exhibit zero electrical resistance."
    ],
    Biology: [
      "Describe the role of telomeres in cellular aging.",
      "Explain how the lac operon regulates gene expression in bacteria.",
      "Describe the process of DNA replication in eukaryotic cells.",
      "How do neurotransmitters influence neural communication?",
      "Explain the mechanism of the sodium-potassium pump in neurons.",
      "How do CRISPR-Cas9 systems work in genetic modification?",
      "Describe the different stages of mitosis and their significance.",
      "Explain the process of antibody production in the immune system.",
      "What is the significance of epigenetics in gene regulation?",
      "Describe the role of RNA interference (RNAi) in gene silencing."
    ],
    Chemistry: [
      "Derive the Henderson-Hasselbalch equation for pH calculation.",
      "Explain the difference between SN1 and SN2 reaction mechanisms.",
      "How does the Born-Haber cycle explain lattice energy?",
      "What is the molecular orbital theory and how does it differ from valence bond theory?",
      "Explain how catalysts lower the activation energy of a reaction.",
      "Describe the process of nuclear fusion in stars.",
      "What is the role of chelating agents in chemical reactions?",
      "Explain the concept of chirality and its importance in drug design.",
      "How does Le Chatelier’s principle apply to industrial chemical processes?",
      "What is the relationship between Gibbs free energy and reaction spontaneity?"
    ]
  };


  // Question page logic
  if (window.location.pathname.includes('question.html')) {
    const selectedSubject = localStorage.getItem('selectedSubject');

    if (selectedSubject && questionsBySubject[selectedSubject]) {
      const questionList = questionsBySubject[selectedSubject];
      const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)]; // Pick random question

      document.getElementById('question').innerText = `Q: ${randomQuestion}`;
      document.getElementById('confirmation').classList.remove('hidden');

      // Store the selected question in localStorage for use in assessment
      localStorage.setItem('currentQuestion', randomQuestion);
    }
  }
});

function cancel() {
  window.location.href = 'subject.html';
}

// GPT-4 Assessment Logic
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
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI that assesses answers. Respond with 'Pass' or 'Fail'." },
        { role: "user", content: `Question: ${question}\nAnswer: ${transcript}\nIs the answer correct? Respond with 'Pass' or 'Fail'.` }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Audio recording and assessment
function startAssessment() {
  let mediaRecorder;
  let audioChunks = [];

  // Show timer
  document.getElementById('timer').classList.remove('hidden');

  let timeLeft = 120; // 120 seconds (2 minutes)
  const timerElement = document.getElementById('time');

  // Start countdown
  const countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
    } else {
      timeLeft--;
    }
  }, 1000);

  // Start recording
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        clearInterval(countdown); // Stop countdown
        document.getElementById('timer').classList.add('hidden'); // Hide timer

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.onresult = async event => {
          const transcript = event.results[0][0].transcript;
          console.log('Transcript:', transcript);

          // Get the stored question
          const currentQuestion = localStorage.getItem('currentQuestion');

          // Send transcript to GPT API
          const result = await sendToGPT(currentQuestion, transcript);
          console.log('Assessment Result:', result);

          // Redirect based on result
          if (result === 'Pass') {
            window.location.href = 'pages/pass.html';
          } else {
            window.location.href = 'pages/fail.html';
          }
        };

        recognition.start();
      };

      // Stop recording after 2 minutes
      setTimeout(() => {
        mediaRecorder.stop();
      }, 120000);
    });
}

function showQuestion() {
  const question = localStorage.getItem('currentQuestion');
  document.getElementById('question').innerText = `Q: ${question}`;
  startAssessment();
}

function submitAnswer() {
  alert('Answer submitted!');
}
