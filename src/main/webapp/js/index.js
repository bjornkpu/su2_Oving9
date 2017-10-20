$(document).ready(function() {
    //Henter og skriver quizzene i tabellen
    $('#myTable').DataTable( {
        ajax: {
            url: 'rest/quiz/getQuizMap/now',
            dataSrc: ''
        },
        bAutoWidth: false,
        dom: '<"wrapper"l>ft<"contain"ip>',
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'startTime'},
        ]
    });

    //Setter i gang en quiz når du trykker på en rad i datatabellen
    $('#myTable').on("click", "tbody tr", function() {
        if(document.getElementById("nick").value.length == 0){
            alert("Please enter a nickname")
            return;
        }
        $.ajax({
            url: 'rest/quiz/setQuiz/' + $(this).find("td:first").text(),
            type: 'POST',
            data: JSON.stringify($(this).find("td:first").text()),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        $.ajax({
            url: 'rest/quiz/setCurrentQuestion/0',
            type: 'POST',
            data: JSON.stringify(0),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        $.ajax({
            url: 'rest/quiz/setNick',
            type: 'POST',
            data: JSON.stringify($("#nick").val()),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
        window.location.href = "Question.html";
    });

    /*//Sletter alle quizzene i datatabellen
    $("#delBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "rest/quiz/delAll",
            success: function(result) {
                $('#myTable').DataTable().ajax.reload();
            }
        });
    });*/

    /*//Lager testquizzer
    $("#setup").click(function () {
        console.log("Test");
        $.ajax({
            type: "POST",
            url: "rest/quiz/setup",
            success: function (result) {
                $('#myTable').DataTable().ajax.reload();
            }
        })
    });*/
});