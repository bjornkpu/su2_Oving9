$(document).ready(function() {
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

    window.setInterval( function () {
        $('#myTable').DataTable().ajax.reload();
    }, 1000);
})