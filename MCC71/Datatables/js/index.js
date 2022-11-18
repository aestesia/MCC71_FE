$(document).ready(function (){
    var table = $('#tableSwapi').DataTable({       
        columns: [
            {
                data: null,
                render: function(data, type, row, meta){
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {data: "name"},
            {data: "diameter"},
            {data: "climate"},
            {data: "terrain"},
            {data: "population"}
        ],
        dom: 'Bfrtip',
        buttons: ['colvis', 
            {
                extends: 'copy',
                text: 'Copy to Clipboard'
            },
            {
                extends: 'excel',
                text: 'Export to Excel'
            }, 
            {
                extends: 'pdf',
                text: 'Export to PDF'
            }],
    });

    var stop = false;
    for(var i = 1; ; i++){
        $.ajax({
            async: false,
            url: "https://swapi.dev/api/planets/?page=" + i,
        }).done(function(res){
            table.rows.add(res.results).draw();
        }).fail(function(){
            stop = true;
        });

        if(stop)
            break;
    }
});

