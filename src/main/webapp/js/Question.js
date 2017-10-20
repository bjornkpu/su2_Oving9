$(document).ready(function ($) {

    function getCurrentQuiz(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/getCurrentQuiz",
            async: false
        }).responseText;
    }

    function getCurrentQuestion(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/getCurrentQuestion",
            async: false
        }).responseText;
    }
    var quizId = getCurrentQuiz();
    var questionId = getCurrentQuestion();

    function getQuizName(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getName/"+ quizId,
            async: false
        }).responseText;
    }

    function getQuestionTxt(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getQuestion/"+ quizId+"/"+questionId,
            async: false
        }).responseText;
    }

    $("#qQuizNavn").html(getQuizName());
    $("#qSpm1").html(getQuestionTxt());

    var altArray = new Array(2);

    for(var i = 0; i < 2; i++){
        altArray[i] = new Array(2);
    }

    function getAlternatives(index){
        var out = [];
        $.ajax({
            url: 'rest/quiz/getAlternatives/' + quizId + '/' + questionId + '/' + index,
            type: 'GET',
            success: function(data){
                out = data;
            },
            async: false
        });
        return out;
    }

    for(var i = 0; i < 2; i++){
        altArray[i] = getAlternatives(i);
        $("#alt" + i).html(altArray[i][0]);
    }

    function checkAnswer() {
        if(document.getElementById("Alternative1").checked){
            if(altArray[0][1] == "Correct"){
                $.ajax({
                    url: 'rest/quiz/setScore',
                    type: 'POST',
                    data: JSON.stringify(1),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }
        }
        if(document.getElementById("Alternative2").checked){
            if(altArray[1][1] == "Correct"){
                $.ajax({
                    url: 'rest/quiz/setScore',
                    type: 'POST',
                    data: JSON.stringify(1),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                });
            }
        }
    }

    function nextQuestion() {
        checkAnswer();
        $.ajax({
            url: 'rest/quiz/setCurrentQuestion/' + (questionId + 1),
            type: 'POST',
            data: JSON.stringify(questionId + 1),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        if (questionId >= 1) {
            var nick = $.ajax({
                type:"GET",
                url: "rest/quiz/getNick/"+ quizId,
                async: false
            }).responseText;

            var score = $.ajax({
                type:"GET",
                url: "rest/quiz/getScore/"+ quizId,
                async: false
            }).responseText;

            $.ajax({
                url: 'rest/quiz/nyScore',
                type: 'POST',
                data: JSON.stringify({
                    nick: nick,
                    score: score,
                    quizName: getQuizName()
                }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
            $.ajax({
                url: 'rest/quiz/wipeScore',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });

            window.location.href = "scoreboard.html";
        } else {
            window.location.reload();
        }
    }


    function getTimeLeft(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getTimeLeft/"+ quizId+"/"+questionId,
            async: false
        }).responseText;
    }
    var timeleft = getTimeLeft();
    document.getElementById("progressBar").max = timeleft;
    document.getElementById("progressBar").value =timeleft;
    $("#sekunder").html(timeleft);
    var downloadTimer = setInterval(function () {
        document.getElementById("progressBar").value = --timeleft;
        $("#sekunder").html(timeleft);
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            nextQuestion();
        }
    }, 1000);
})