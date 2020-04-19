
var questions = [
    {
        question: "Each of the following statments is true, except:",
        choices: ["Viruses come in different types", "Viruses infect living cells", "Viruses can replicate w/o hosts", "Viruses can cause illnesses"],
        answer: "Viruses can replicate w/o hosts",
    },
    
  
    {
        question: "A virus infects a host in order to:",
        choices: ["Take in nutrients", "Make the host sick", "Make copies of itself", "Destory the host’s cells"],
        answer: "Make copies of itself",
    },
  
    {
        question:"The distinguishing feature of a coronavirus is its:",
        choices: ["Size", "Mobility", "Shape", "Deadliness"],
        answer: "Shape",
    },
  
    {
        question: "A typical coronavirus infection",
        choices: ["Is extremely dangerous", "Has mild symptoms", "cannot spread to humans", "Is resistent to handwashing"],
        answer: "Has mild symptoms",
    },

    {
        question: "Coronavirus infections are likely to be more serious for",
        choices: [ "Teens", "Active adults", "Frequent travelers", "People with weakened immune systems"],
        answer: "People with weakened immune systems",
    },
    ];
  
  $(document).ready(function () {
    var welcomeBox = $("#welcome");
    var questionBox = $("#question");
    var endingScoreBox = $("#endingScoreBox");
    var highScoresBox = $("#highScores");
    var scores = JSON.parse(localStorage.getItem("scores") || "[]");
  
    var questionTxtEl = $("#questionTxt");
    var answerBtn1 = $("#choice1");
    var answerBtn2 = $("#choice2");
    var answerBtn3 = $("#choice3");
    var answerBtn4 = $("#choice4");
    var feedbackEl = $("#feedback");
    var getStartedBtn = $("#getStarted");
    var highScoresBtn = $("#highScoreBtn");
    var currentQuestion = 0;
    
    // timer
    var timer = 120;
    var timerCountdownEl = $("#timerCountdown");
    var timerReference = undefined;
  
    welcomeBox.show();
    questionBox.hide();
    endingScoreBox.hide();
    highScoresBox.hide();
  
    //question shuffler
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
  
    //endingScoreBox 
    function showScore() {
        questionBox.hide();
        endingScoreBox.show();
        $("#endingScore").text("Ending Score: " + timer);
        window.clearInterval(timerReference);
    }
  
    function showHighScores() {
        welcomeBox.hide();
        questionBox.hide();
        endingScoreBox.hide();
        highScoresBox.show();
        $("#highScoresList").empty();
        $.each(scores, function (index, value) {
            var initials = value[0];
            var score = value[1];
            var eachScore = $("<li>");
            eachScore.text(initials + "      " + score);
            $("#highScoresList").append(eachScore);
        });
    }
  
    getStartedBtn.click(function () {
  
      welcomeBox.hide();
        questionBox.show();
  
        var question1 = questions[0];
  
        questionTxtEl.text(question1.question);
  
        var question1choices = question1.choices;
  
        answerBtn1.text(question1choices[0]);
        answerBtn2.text(question1choices[1]);
        answerBtn3.text(question1choices[2]);
        answerBtn4.text(question1choices[3]);
     //countdown
     timerReference = window.setInterval(function () {
        timer--;
        if (timer == 0) {

          showScore();
        } else {
            timerCountdownEl.text(timer);
        };
    }, 1000);

    });
  
    $(".answer").on("click", function (event) {
        window.clearInterval(timerReference);
        event.preventDefault();
        var correctAnswer = questions[currentQuestion].answer;
        var theirAnswer = event.target.innerText;
        if (theirAnswer == correctAnswer) {
            feedbackEl.text("Correct!").show();
        } else {
  
          feedbackEl.text("NOPE!!!").show();
            timer -= 10;
        }
        window.setTimeout(showNextQuestionOrScore, 2000);
        
   });
  
    function showNextQuestionOrScore() {
        currentQuestion++;
                //countdown
        timerReference = window.setInterval(function () {
            timer--;
            if (timer == 0) {
  
              showScore();
            } else {
                timerCountdownEl.text(timer);
            };
        }, 1000);
  
  
        if (currentQuestion == questions.length) {
            showScore();
        } else {
            feedbackEl.hide();
            var question1 = questions[currentQuestion];
  
            questionTxtEl.text(question1.question);
  
            var question1choices = question1.choices;
  
            answerBtn1.text(question1choices[0]);
            answerBtn2.text(question1choices[1]);
            answerBtn3.text(question1choices[2]);
            answerBtn4.text(question1choices[3]);
        }
    }
  
    var saveInitials = $("#saveInitials");
    
  
    saveInitials.on("click", function (event) {
        var multipleInitial = $("#initials").val();
  
        scores.push([multipleInitial, timer]);
        
        scores.sort(function (first, second) {
            if (first[1] > second[1]) {
                return -1;
            } else if (first[1] < second[1]) {
                return 1;
            }
            return 0;
        });
        
        localStorage.setItem("scores", JSON.stringify(scores));
        showHighScores();
    });
  
    highScoresBtn.on("click", function () {
        window.clearInterval(timerReference);
        showHighScores();
    });
  
    $("#clearScores").on("click", function () {
        scores = [];
        localStorage.setItem("scores", JSON.stringify(scores));
  
        $("#highScoresList").empty();
    });
  
  
    $("#startOver").on("click", function () {
        location.reload();
    });
  
  });
