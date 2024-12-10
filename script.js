const questions = {
    html: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language", "None of the above"], answer: 0 },
      // Add more HTML questions here
    ],
    css: [
      { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "None of the above"], answer: 1 },
      // Add more CSS questions here
    ],
    javascript: [
      { question: "Which type of JavaScript language is ___?", options: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"], answer: 1 },
      // Add more JavaScript questions here
    ],
    coding: [
      { question: "Which of the following is not a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: 2 },
      // Add more coding questions here
    ]
  };
  
  let username = "";
  let selectedTopic = "";
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  function goToTopics() {
    username = document.getElementById("username").value;
    if (!username) {
      alert("Please enter your name");
      return;
    }
    document.getElementById("home").classList.add("hidden");
    document.getElementById("topics").classList.remove("hidden");
  }
  
  function startQuiz() {
    selectedTopic = document.getElementById("topicSelector").value;
    document.getElementById("topics").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("quizTitle").innerText = `Topic: ${selectedTopic.toUpperCase()}`;
    startTimer();
    loadQuestion();
  }
  
  function loadQuestion() {
    const topicQuestions = questions[selectedTopic];
    const questionData = topicQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    questionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.onclick = () => checkAnswer(index);
      optionsDiv.appendChild(button);
    });
  }
  
  function checkAnswer(selectedIndex) {
    const topicQuestions = questions[selectedTopic];
    if (selectedIndex === topicQuestions[currentQuestionIndex].answer) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= topicQuestions.length) {
      endQuiz();
    } else {
      loadQuestion();
    }
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions[selectedTopic].length) {
      endQuiz();
    } else {
      loadQuestion();
    }
  }
  
  function startTimer() {
    let totalTime = 600; // 10 minutes
    timer = setInterval(() => {
      if (totalTime <= 0) {
        clearInterval(timer);
        endQuiz();
      } else {
        totalTime--;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("resultUsername").innerText = `Name: ${username}`;
    document.getElementById("score").innerText = `Score: ${score} / ${questions[selectedTopic].length}`;
    const percentage = Math.round((score / questions[selectedTopic].length) * 100);
    document.getElementById("percentage").innerText = `Percentage: ${percentage}%`;
  }
  
