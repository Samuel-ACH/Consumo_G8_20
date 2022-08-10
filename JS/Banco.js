var UrlBancos = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=GetBancos';

$(document).ready(function(){
    CargarBancos();
});

function CargarBancos(){
    $.ajax({
        url: UrlBancos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].codigo_banco + '</td>' +
                '<td>' + MiItems[i].nombre_banco + '</td>' +
                '<td>' + MiItems[i].oficina_principal + '</td>' +
                '<td>' + MiItems[i].cantidad_sucursales + '</td>' +
                '<td>' + MiItems[i].pais + '</td>' +
                '<td>' + MiItems[i].fechafundacion + '</td>' +
                '<td>' + MiItems[i].RTN + '</td>' +
            '</tr>';
            $('#DataBancos').html(Valores);
            }
        }
    });
}