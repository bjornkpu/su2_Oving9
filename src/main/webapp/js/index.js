$(document).ready(function(){
    console.log("ready!");
    // Bind opp tabellen mot rest-ressursen '/kunder'
    $('#myTable').DataTable( {
        ajax: {
            url: 'rest/quiz',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'startTime' }
        ]
    });

    // Slett rest-ressursen '/kunder/kundeId'
    /*$("#delete").click(function () {
        $.ajax({
            url: 'rest/quiz/' + $("#deleteId").val(),
            type: 'DELETE',
            success: function(result) {
                $('#myTable').DataTable().ajax.reload();
            }
        });
    });*/

    // Lag ny rest-ressursen under '/kunder/'
    /*$("#create").click(function () {
        $.ajax({
            url: 'rest/quiz',
            type: 'POST',
            data: JSON.stringify({
                id: $("#newId").val(),
                navn: $("#newName").val(),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                $('#myTable').DataTable().ajax.reload();
            }
        });
    });*/
    //Update name
   /* $("#update").click(function () {
        $.ajax({
            url: 'rest/quiz/'+ $("#updId").val(),
            type: 'PUT',
            data: JSON.stringify({
                id: $("#updId").val(),
                navn: $("#updName").val(),
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                $('#myTable').DataTable().ajax.reload();
            }
        })

    });*/
});
