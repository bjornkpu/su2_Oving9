$(document).ready(function ($) {

    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        console.log(local);
        local.setMinutes(this.getMinutes());
        return local.toJSON().slice(0,10)+"T"+local.getHours()+":"+local.getMinutes();
    });

    $('#quizStartTime').val(new Date().toDateInputValue());

    function validate() {
        var inputsWithValues = 0;
        // get all input fields except for type='submit'
        var myInputs = $("input:not([type='submit'])");

        myInputs.each(function(e) {
            // if it has a value, increment the counter
            if ($(this).val()) {
                inputsWithValues += 1;
            }
        });
        if (inputsWithValues == myInputs.length) {
            $("input[type=submit]").prop("disabled", false);
        } else {
            $("input[type=submit]").prop("disabled", true);
        }
    }

    validate();
    $('input').on('keyup', validate);

    $("#create").click(function () {
        console.log($("#quizStartTime").val());
        $.ajax({
            url: 'rest/quiz/nyquiz',
            type: 'POST',
            data: JSON.stringify({
                name: $("#quizname").val(),
                startTime: $("#quizStartTime").val(),
                qst: [
                    {spmTxt: $("#spm1").val(), secondsLeft: $("#spm1_time").val(), alternatives: [
                        {text: $("#1_1").val(), correct: document.getElementById("1_1cb").checked},
                        {text: $("#1_2").val(), correct: document.getElementById("1_2cb").checked}
                    ]},
                    {spmTxt: $("#spm2").val(), secondsLeft: $("#spm2_time").val(), alternatives: [
                        {text: $("#2_1").val(), correct: document.getElementById("2_1cb").checked},
                        {text: $("#2_2").val(), correct: document.getElementById("2_2cb").checked}
                    ]}
                ]
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                $("#success").html("Quizzen ble lagt til!")
            }
        });
    });

})