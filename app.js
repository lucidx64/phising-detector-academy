function switchView(viewName) {
  // Hide all sections
  const sections = document.querySelectorAll(".view-section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active");
  }

  // Deactivate all navigation buttons
  const navButtons = document.querySelectorAll(".nav-btn");
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove("active");
  }

  // Show selected view section
  const selectedSection = document.getElementById("view-" + viewName);
  if (selectedSection) {
    selectedSection.classList.add("active");
  }

  // Highlight selected nav button
  const selectedNavBtn = document.getElementById("nav-" + viewName);
  if (selectedNavBtn) {
    selectedNavBtn.classList.add("active");
  }

  // Scroll window back to top on view change
  window.scrollTo(0, 0);
}

// scenarios section
const scenariosData = [
  {
    id: 1,
    sender: "Security Alert <security-update@paypaI-security-verify.com>",
    subject: "URGENT: Your account will be suspended within 30 minutes",
    message:
      "Dear Customer,\n\nWe detected suspicious activity on your account. Your access will be permanently suspended within 30 minutes unless you verify your identity.\n\nPlease click the link below to verify immediately:\nhttp://paypaI-security-verify.com/login",
    correctAnswer: "suspicious",
    explanation:
      "This message uses artificial urgency (30 minutes) and sends you to an unauthorized domain (paypaI-security-verify.com with a capital 'i').",
    redFlags: [
      "Extreme sense of urgency (30-minute threat)",
      "Suspicious domain name mimicking PayPal",
      "Generic greeting ('Dear Customer')",
    ],
  },
  {
    id: 2,
    sender: "IT Helpdesk <support@company.org>",
    subject: "Scheduled System Maintenance - Sunday 02:00 AM",
    message:
      "Hello Staff,\n\nOur internal servers will undergo scheduled maintenance this Sunday from 02:00 AM to 04:00 AM. System services may experience brief interruptions.\n\nNo action is required from your side. If you have questions, please contact the internal IT desk at extension 4402.",
    correctAnswer: "legitimate",
    explanation:
      "This is a routine informational notice. It requests no credentials, contains no external links, and asks for no immediate action.",
    redFlags: ["None. This is a normal administrative notice."],
  },
  {
    id: 3,
    sender: "Payroll Department <payroll-alert@update-bank-login.net>",
    subject: "Important: Update Direct Deposit Information",
    message:
      "Attention Employee,\n\nWe were unable to process your recent direct deposit payment due to an outdated bank account routing number.\n\nClick here to update your banking login credentials now to avoid payroll delays: http://update-bank-login.net/payroll",
    correctAnswer: "suspicious",
    explanation:
      "Attackers frequently attempt to capture financial or banking login details using fake payroll alerts.",
    redFlags: [
      "Requests sensitive bank account login credentials",
      "Unrecognized domain name (update-bank-login.net)",
      "Threatens delay of salary payment to induce fear",
    ],
  },
];

function renderScenarios() {
  const container = document.getElementById("scenarios-container");
  container.innerHTML = "";

  for (let i = 0; i < scenariosData.length; i++) {
    const scenario = scenariosData[i];

    // Create scenario card container
    const card = document.createElement("div");
    card.className = "scenario-card";

    // Add header info
    const title = document.createElement("h2");
    title.style.marginTop = "0";
    title.textContent = "Scenario " + (i + 1);
    card.appendChild(title);

    // Add sender & subject info
    const meta = document.createElement("p");
    meta.innerHTML =
      "<strong>From:</strong> " +
      scenario.sender +
      "<br><strong>Subject:</strong> " +
      scenario.subject;
    card.appendChild(meta);

    // Add message preview body
    const body = document.createElement("div");
    body.className = "message-preview";
    body.textContent = scenario.message;
    card.appendChild(body);

    // Add selection buttons
    const actionDiv = document.createElement("div");
    actionDiv.className = "scenario-actions";

    const legBtn = document.createElement("button");
    legBtn.className = "btn btn-secondary";
    legBtn.textContent = "Legitimate";
    legBtn.onclick = function () {
      checkScenarioAnswer(scenario.id, "legitimate");
    };

    const suspBtn = document.createElement("button");
    suspBtn.className = "btn";
    suspBtn.textContent = "Suspicious";
    suspBtn.onclick = function () {
      checkScenarioAnswer(scenario.id, "suspicious");
    };

    actionDiv.appendChild(legBtn);
    actionDiv.appendChild(suspBtn);
    card.appendChild(actionDiv);

    // Add feedback area
    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "scenario-feedback-" + scenario.id;
    feedbackDiv.className = "feedback-box";
    card.appendChild(feedbackDiv);

    container.appendChild(card);
  }
}

function checkScenarioAnswer(scenarioId, userAnswer) {
  // Find selected scenario
  let selectedScenario = null;
  for (let i = 0; i < scenariosData.length; i++) {
    if (scenariosData[i].id === scenarioId) {
      selectedScenario = scenariosData[i];
      break;
    }
  }

  if (!selectedScenario) return;

  const feedbackBox = document.getElementById(
    "scenario-feedback-" + scenarioId,
  );

  // Check correctness
  if (userAnswer === selectedScenario.correctAnswer) {
    feedbackBox.className = "feedback-box correct";

    let redFlagsHtml = "";
    for (let j = 0; j < selectedScenario.redFlags.length; j++) {
      redFlagsHtml += "<li>" + selectedScenario.redFlags[j] + "</li>";
    }

    feedbackBox.innerHTML =
      '<div class="feedback-title">Correct</div>' +
      "<p>" +
      selectedScenario.explanation +
      "</p>" +
      "<p><strong>Key Indicators:</strong></p>" +
      "<ul>" +
      redFlagsHtml +
      "</ul>";
  } else {
    feedbackBox.className = "feedback-box incorrect";
    feedbackBox.innerHTML =
      '<div class="feedback-title">Incorrect</div>' +
      "<p>This message is actually <strong>" +
      selectedScenario.correctAnswer +
      "</strong>.</p>" +
      "<p>" +
      selectedScenario.explanation +
      "</p>";
  }
}

/* -------------------------------------------------------------
           QUIZ SECTION LOGIC
           ------------------------------------------------------------- */
const quizQuestions = [
  {
    question: "What is a common sign of a phishing email?",
    options: [
      "Urgent request for personal information or credentials",
      "A normal, expected greeting from a colleague",
      "A message from a known contact with no links or files",
      "A regular promotional newsletter you subscribed to",
    ],
    correctIndex: 0,
    explanation:
      "Phishing emails frequently create artificial urgency to force hasty decisions before users verify requests.",
  },
  {
    question: "If a URL begins with 'https://', what does it mean?",
    options: [
      "The website is guaranteed 100% safe and trustworthy",
      "The connection is encrypted, but the website could still be malicious",
      "The website is operated directly by a government agency",
      "The link cannot contain any phishing forms",
    ],
    correctIndex: 1,
    explanation:
      "HTTPS encrypts the traffic between you and the site, but attackers can easily obtain HTTPS certificates for malicious sites.",
  },
  {
    question: "What is 'typosquatting' in phishing attacks?",
    options: [
      "Typing passwords incorrectly on purpose to test forms",
      "Registering web addresses with subtle misspellings of real brands",
      "Sending emails with bad formatting and spelling errors",
      "Blocking unauthorized users from logging into official accounts",
    ],
    correctIndex: 1,
    explanation:
      "Typosquatting relies on subtle domain misspellings (e.g., paypaI-verify.com) to trick users into visiting fake login portals.",
  },
  {
    question:
      "What psychological trigger is used when an attacker impersonates your boss demanding urgent gift cards?",
    options: [
      "Curiosity",
      "Authority and Urgency",
      "Technical jargon",
      "Neutral notification",
    ],
    correctIndex: 1,
    explanation:
      "Posing as a superior leverages organizational authority and urgency to pressure employees into complying quickly.",
  },
  {
    question:
      "What is the safest action if you receive an unexpected email asking you to verify account credentials?",
    options: [
      "Click the provided link and log in immediately",
      "Reply to the email asking if it is genuine",
      "Navigate to the official website directly through a trusted browser bookmark",
      "Forward the email to all your personal contacts",
    ],
    correctIndex: 2,
    explanation:
      "Never use links provided in suspicious emails. Always open a fresh browser window and visit official bookmarks.",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const currentData = quizQuestions[currentQuestion];

  // Update progress header text
  document.getElementById("quiz-progress").textContent =
    "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;

  // Set question title text
  document.getElementById("quiz-question-title").textContent =
    currentData.question;

  // Clear feedback box and hide next button
  const feedbackBox = document.getElementById("quiz-feedback");
  feedbackBox.style.display = "none";
  feedbackBox.className = "feedback-box";

  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.style.display = "none";

  // Load answer choices
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  for (let i = 0; i < currentData.options.length; i++) {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = currentData.options[i];
    button.onclick = function () {
      selectOption(i);
    };
    optionsContainer.appendChild(button);
  }
}

function selectOption(selectedIndex) {
  const currentData = quizQuestions[currentQuestion];
  const optionButtons = document.querySelectorAll(".option-btn");

  // Disable all option buttons after selection
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = true;
  }

  const feedbackBox = document.getElementById("quiz-feedback");
  const feedbackTitle = document.getElementById("quiz-feedback-title");
  const feedbackText = document.getElementById("quiz-feedback-text");

  if (selectedIndex === currentData.correctIndex) {
    // Correct choice
    score++;
    optionButtons[selectedIndex].classList.add("selected-correct");
    feedbackBox.className = "feedback-box correct";
    feedbackTitle.textContent = "Correct";
  } else {
    // Incorrect choice
    optionButtons[selectedIndex].classList.add("selected-incorrect");
    optionButtons[currentData.correctIndex].classList.add("selected-correct");
    feedbackBox.className = "feedback-box incorrect";
    feedbackTitle.textContent = "Incorrect";
  }

  feedbackText.textContent = currentData.explanation;
  feedbackBox.style.display = "block";

  // Show Next button
  document.getElementById("quiz-next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById("quiz-active-view").style.display = "none";

  const resultView = document.getElementById("quiz-result-view");
  resultView.style.display = "block";

  document.getElementById("quiz-score-display").textContent =
    score + " / " + quizQuestions.length;

  const summaryMessage = document.getElementById("quiz-summary-message");
  if (score === 5) {
    summaryMessage.textContent =
      "Excellent work! You detected all phishing indicators accurately.";
  } else if (score >= 3) {
    summaryMessage.textContent =
      "Good effort. Review the warning signs section to refine your knowledge.";
  } else {
    summaryMessage.textContent =
      "Consider reading through the Learn materials again to improve your detection skills.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-result-view").style.display = "none";
  document.getElementById("quiz-active-view").style.display = "block";
  loadQuestion();
}

// initialize components when window loads
window.onload = function () {
  renderScenarios();
  loadQuestion();
};
