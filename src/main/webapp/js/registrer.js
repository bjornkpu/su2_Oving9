$(document).ready(function ($) {
    $("#create").click(function () {
        $.ajax({
            url: 'rest/quiz',
            type: 'POST',
            data: JSON.stringify({
                id: 1,
                name: $("#quizName").val(),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });
    });
})