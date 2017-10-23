$(document).ready(function ($) {

    //Henter nåværende quiz
    function getCurrentQuiz(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/getCurrentQuiz",
            async: false
        }).responseText;
    }

    //henter nåværende spørsmål
    function getCurrentQuestion(){
        return $.ajax({
            type: "GET",
            url: "rest/quiz/getCurrentQuestion",
            async: false
        }).responseText;
    }
    var quizId = getCurrentQuiz();           //hvilken quiz du er på
    var questionId = getCurrentQuestion();   //hvilket spørsmål du er på

    //henter quizznavnet
    function getQuizName(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getName/"+ quizId,
            async: false
        }).responseText;
    }

    //henter spørsmålsteksten
    function getQuestionTxt(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getQuestion/"+ quizId+"/"+questionId,
            async: false
        }).responseText;
    }

    $("#qQuizNavn").html(getQuizName());    //setter navnet på quizen er
    $("#qSpm1").html(getQuestionTxt());     //setter spørsmålsteksten

    var altArray = new Array(2);            //for å ha noe å sette svaralternativene i

    /*lager et todiminsjonalt array for 2 spørsmål som hver har en spørsmålstekst og om det er
    det riktige svaret eller ikke */
    for(var i = 0; i < 2; i++){
        altArray[i] = new Array(2);
    }

    //henter svaralternativene for et gitt spørsmål
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

    //setter svaralternativene i arrayet
    for(var i = 0; i < 2; i++){
        altArray[i] = getAlternatives(i);
        $("#alt" + i).html(altArray[i][0]);
    }

    //sjekker om det var riktig eller feil svar
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

    //funksjonen som tar deg til neste spørsmål, om det er det siste omdirigerer den deg til scorboardet
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

            $("#ratings").show();


        } else {
            window.location.reload();
        }
    }

    function setRatingAndQuitQuiz() {
        var rating = $("#rat-value").val();
        $.ajax({
            url: 'rest/quiz/addRating/' + quizId + "/" + rating,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        window.location.href = "scoreboard.html";
    }
    window.setInterval( function () {
        var pressed = $('#rat-value').val();
        if(pressed != 0){
            setRatingAndQuitQuiz();
        }
    }, 1000);

    //henter hvor mange sekunder hvert spørsmål skal vare
    function getTimeLeft(){
        return $.ajax({
            type:"GET",
            url: "rest/quiz/getTimeLeft/"+ quizId+"/"+questionId,
            async: false
        }).responseText;
    }
    //Setter opp progressbaren
    var timeleft = getTimeLeft();
    document.getElementById("progressBar").max = timeleft;
    document.getElementById("progressBar").value =timeleft;
    $("#sekunder").html(timeleft);

    //teller ned, og hvis progressbaren når 0 caller den på nextQuestion()
    var downloadTimer = setInterval(function () {
        document.getElementById("progressBar").value = --timeleft;
        $("#sekunder").html(timeleft);
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            nextQuestion();
        }
    }, 1000);

});