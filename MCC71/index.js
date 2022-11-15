$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/", 
}).done((res)=>{
     //console.log(res.results);
    let temp="";
    $.each(res.results,function(key,val){
        // literal template
        temp += 
            `<tr>
                <td>${key+1}</td>
                <td class="text-capitalize">${val.name}</td>
                <td><button class="btn btn-primary" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
            </tr>`;        
    })
    $("#tablePoke").html(temp);    
    
}).fail((err)=>{
    console.log(err);
});


function detailPoke(url){
    $.ajax({
        url: url
    }).done((res)=>{
        let tempName=
            `<h3 class="text-capitalize">${res.name}</h3>`;
            $("#name").html(tempName);

        let tempModal=
            `<img src="${res.sprites.other['official-artwork'].front_default}" class="img rounded-pill border border-dark">`;
            $("#picture").html(tempModal);
        
        let tempTypes="";
        $.each(res.types,function(key,val){
            tempTypes += 
                `<div class="col-md-auto">                    
                    <span class="badge rounded-pill text-capitalize ${val.type.name}">${val.type.name}</span>
                </div>`;        
        })
        $("#types").html(tempTypes);

        let tempAbilities="";
        $.each(res.abilities,function(key,val){
            tempAbilities += 
                `<div class="col-md-auto">                    
                    <span class="badge bg-secondary text-capitalize">${val.ability.name.replace("-"," ")}</span>
                </div>`;        
        })
        $("#abilities").html(tempAbilities);

        let tempMoves="";
        $.each(res.moves,function(key,val){
            tempMoves += 
                `<tr>
                    <td class="text-capitalize">${val.move.name.replace("-"," ")}</td>
                </tr>`;        
        })
        $("#tableMove").html(tempMoves);

        let tempStats="";
        $.each(res.stats,function(key,val){
            let statPercentage = Math.round((val.base_stat/255)*100);
            tempStats += 
                `<p class="statNames">${val.stat.name}</p>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar ${val.stat.name}" role="progressbar" style="width: ${statPercentage}%;" aria-valuenow="${val.base_stat}" aria-valuemin="0" aria-valuemax="255">${val.base_stat}</div>
                </div>`;        
        })
        $("#stats").html(tempStats);
    });
}

function detailAbility(url){
    // $.ajax({
    //     url: url
    // }).done((res) => {

    // })
    return 0;
}

$(document).ready( function () {
    $('#tablePokemon').DataTable();
} );