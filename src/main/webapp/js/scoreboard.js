$(document).ready(function() {

    //fyller datatabellen med score
    $('#myTable').DataTable({
        ajax: {
            url: 'rest/quiz/getScoreMap',
            dataSrc: ''
        },
        bAutoWidth: false,
        dom: '<"wrapper"l>ft<"contain"ip>',
        columns: [
            {data: 'nick'},
            {data: 'quizName'},
            {data: 'score'}
        ]
    }).order([1, 'desc']).draw();

    //får tabellen til å oppdatere seg hvert sekund, (real-time-ish)
    window.setInterval( function () {
        $('#myTable').DataTable().ajax.reload();
    }, 1000);
});