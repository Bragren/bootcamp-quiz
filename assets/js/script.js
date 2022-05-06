const startTime = 60

const questions = [
  {
    "question": "Commonly used data types DONot include:",
    "answers": [
      {
        "answer": "booleans",
        "correct": true
      },
      {
        "answer": "strings",
        "correct": false
      },
      {
        "answer": "alerts",
        "correct": false
      },
      {
        "answer": "numbers",
        "correct": false
      }
    ]
  },
  {
    "question": "The condition in an if / else statement is enclosed with_____________.",
    "answers": [
      {
        "answer": "parenthesis",
        "correct": true
      },
      {
        "answer": "quotes",
        "correct": false
      },
      {
        "answer": "curly brackets",
        "correct": false
      },
      {
        "answer": "square brackets",
        "correct": false
      }
    ]
  },
  {
    "question": "Arrays in Javascript can be used to store____________.",
    "answers": [
      {
        "answer": "all of the above",
        "correct": true
      },
      {
        "answer": "other arrays",
        "correct": false
      },
      {
        "answer": "booleans",
        "correct": false
      },
      {
        "answer": "numbers and strings",
        "correct": false
      }
    ]
  },
  {
    "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "answers": [
      {
        "answer": "console.log",
        "correct": true
      },
      {
        "answer": "Javascript",
        "correct": false
      },
      {
        "answer": "terminal/bash",
        "correct": false
      },
      {
        "answer": "for loops",
        "correct": false
      }
    ]
  },
  {
    "question": "String values must be enclosed within ________ when being assigned to variables.",
    "answers": [
      {
        "answer": "quotes",
        "correct": true
      },
      {
        "answer": "commas",
        "correct": false
      },
      {
        "answer": "curly brackets",
        "correct": false
      },
      {
        "answer": "parenthesis",
        "correct": false
      }
    ]
  },
]



// Shuffles the initial order of the questions, and then shuffles the order of the answers to each question
// And returns the randomly shuffled array with randomly shuffled order of answers
function shuffleQuestions() {
    let currentIndex = questions.length, randomIndex
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [questions[currentIndex], questions[randomIndex]] = [
        questions[randomIndex], questions[currentIndex]]
    }
  
    return questions.map(question => {
      let newQuestion = question
      let currentIndex = newQuestion.answers.length, randomIndex
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [newQuestion.answers[currentIndex], newQuestion.answers[randomIndex]] = [
          newQuestion.answers[randomIndex], newQuestion.answers[currentIndex]]
      }
      return newQuestion
    })
  }
  
  
  const timerEl = document.getElementById("timer")
  
  const startContainer = document.getElementById("start")
  const quizContainer = document.getElementById("quiz")
  const finishContainer = document.getElementById("finish")
  const highscoresContainer = document.getElementById("highscores")
  const header = document.getElementById("header-container")
  
  const correctEl = document.getElementById("correct")
  const incorrectEl = document.getElementById("incorrect")
  
  let timer
  let timeRemaining
  let currentQuestion
  let lastQuestionCorrect
  let answers
  let score
  let shuffledQuestions
  
  timerEl.innerHTML = startTime
  
  quizContainer.classList.add("hidden")
  finishContainer.classList.add("hidden")
  highscoresContainer.classList.add("hidden")
  
  
  correctEl.classList.add("hidden")
  incorrectEl.classList.add("hidden")
  
  function setLastQuestionCorrect(bool) {
    if (bool) {
      correctEl.classList.remove("hidden")
      incorrectEl.classList.add("hidden")
    }
    else {
      correctEl.classList.add("hidden")
      incorrectEl.classList.remove("hidden")
    }
  }
  
  function nextQuestion() {
    shuffledQuestions.shift()
    if (shuffledQuestions && shuffledQuestions.length) {
      showQuestion()
    }
    else {
      showFinish()
    }
  }
  
  function showQuestion() {
    const questionTitle = document.getElementById("question-title")
    currentQuestion = shuffledQuestions[0]
    questionTitle.innerHTML = currentQuestion.question
    answers.forEach((answer, i) => {
      answer.innerHTML = `${i + 1}. ${currentQuestion.answers[i].answer}`
    })
  }
  
  function showStart() {
    timeRemaining = startTime
    timerEl.innerHTML = timeRemaining
  
    header.classList.remove("hidden")
    startContainer.classList.remove("hidden")
    quizContainer.classList.add("hidden")
    finishContainer.classList.add("hidden")
    highscoresContainer.classList.add("hidden")
  }
  
  function attemptAnswer(index) {
    if (currentQuestion.answers[index].correct) {
      score++
      setLastQuestionCorrect(true)
    }
    else {
      timeRemaining -= 10
  
      if (timeRemaining < 0) {
        timeRemaining = 0
        timerEl.innerHTML = timeRemaining
        showFinish()
      }
      else {
        timerEl.innerHTML = timeRemaining
      }
  
      setLastQuestionCorrect(false)
    }
    nextQuestion()
  }
  
  function showQuiz() {
    clearInterval(timer)
  
    const answer1 = document.getElementById("answer-1")
    const answer2 = document.getElementById("answer-2")
    const answer3 = document.getElementById("answer-3")
    const answer4 = document.getElementById("answer-4")
  
    answers = [answer1, answer2, answer3, answer4]
  
    header.classList.remove("hidden")
    quizContainer.classList.remove("hidden")
    startContainer.classList.add("hidden")
    finishContainer.classList.add("hidden")
    highscoresContainer.classList.add("hidden")
  
    showQuestion()
  }
  
  function showFinish() {
    clearInterval(timer)
  
    const scoreEl = document.getElementById("score")
  
    scoreEl.innerHTML = `Your score is: ${score}`
  
    header.classList.remove("hidden")
    finishContainer.classList.remove("hidden")
    quizContainer.classList.add("hidden")
    startContainer.classList.add("hidden")
    highscoresContainer.classList.add("hidden")
  }
  
  function saveHighScore() {
    const savedScoreEl = document.getElementById("saved-score")
    const initialsEl = document.getElementById("initials")
    const saveScoreEl = document.getElementById("save-score")
  
    const scoresStorage = localStorage.getItem("scores")
  
    savedScoreEl.classList.add("hidden")
  
    if (scoresStorage) {
      let scores = JSON.parse(scoresStorage)
  
      scores.push({
        initials: initialsEl.value.slice(0, 3).toUpperCase(),
        score
      })
  
      const newSortedScores = scores.sort((a, b) => b.score - a.score)
  
      localStorage.setItem("scores", JSON.stringify(newSortedScores))
    }
    else {
      localStorage.setItem("scores", JSON.stringify([
        {
          initials: initialsEl.value.slice(0, 3).toUpperCase(),
          score
        }
      ]))
    }
  
    savedScoreEl.classList.remove("hidden")
    initialsEl.classList.add("hidden")
    saveScoreEl.classList.add("hidden")
  }
  
  function showHighScores() {
    clearInterval(timer)
    const scoresTableEl = document.getElementById("scores-table")
    const noScoresEl = document.getElementById("no-scores")
    const scores = JSON.parse(localStorage.getItem("scores"))
  
    if (scores && scores.length) {
      noScoresEl.classList.add("hidden")
      scoresTableEl.innerHTML = `
        <tr>
          <th width="50%">Initials</th>
          <th width="50%">Score</th>
        </tr>
        
        ${scores.map((highscore, i) => {
        return `<tr><td>${i + 1}. ${highscore.initials}</td><td>${highscore.score}</td></tr>`
      }).join("")
        }
      `
    }
  
    highscoresContainer.classList.remove("hidden")
    finishContainer.classList.add("hidden")
    quizContainer.classList.add("hidden")
    startContainer.classList.add("hidden")
    header.classList.add("hidden")
  }
  
  function startQuiz() {
    shuffledQuestions = shuffleQuestions()
    score = 0
    timeRemaining = startTime
  
    clearInterval(timer)
    timerEl.innerHTML = timeRemaining
  
    correctEl.classList.add("hidden")
    incorrectEl.classList.add("hidden")
  
    const initialsEl = document.getElementById("initials")
    const saveScoreEl = document.getElementById("save-score")
    const savedScoreEl = document.getElementById("saved-score")
  
    initialsEl.classList.remove("hidden")
    saveScoreEl.classList.remove("hidden")
    savedScoreEl.classList.add("hidden")
  
    showQuiz()
  
    timer = setInterval(() => {
      timeRemaining--
      timerEl.innerHTML = timeRemaining
      if (timeRemaining <= 0) {
        showFinish()
      }
    }, 1000)
  }
  
  showStart()