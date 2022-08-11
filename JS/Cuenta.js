var UrlCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuentas';
var UrlInsertCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=InsertCuenta';


$(document).ready (function(){
CargarCuentas();
});

function CargarCuentas(){
    $.ajax({

        url:UrlCuentas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
         var MiItems = reponse;
         var Valores = '';

           for (i=0; i< MiItems.length; i++)
           {
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NumeroDeCuenta + '</td>' +
                '<td>' + MiItems[i].NombreDeCuenta + '</td>' +
                '<td>' + MiItems[i].NumeroDeCliente + '</td>' +
                '<td>' + MiItems[i].FechaDeApertura + '</td>' +
                '<td>' + MiItems[i].SaldoActual + '</td>' +
                '<td>' + MiItems[i].SaldoRetenido + '</td>' +
                '<td>' + MiItems[i].TipoMoneda + '</td>' +
                '<td>'+
                '<button class="btn btn-info" onclick="CargarCuentas('+ MiItems[i].NumeroDeCuenta +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarCuenta('+ MiItems[i].NumeroDeCuenta +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('#DataCuentas').html(Valores);
            }
         }  

    });
}

function AgrgarCuentas(){
var datoscuenta = {
    NumeroDeCuenta:$('#NumeroDeCuenta').val(),
    NumeroDeCuenta:$('#NumeroDeCuenta').val(),
    NombreDeCuenta: $('#NombreDeCuenta').val(),
    NumeroDeCliente: $('#NumeroDeCliente').val(),
    SaldoActual: $('#SaldoActual').val(),
    SaldoRetenido: $('#SaldoRetenido').val(),
    TipoMoneda: $('#TipoMoneda').val(),
};

var datoscuentaJson = JSON.stringify(datoscuenta);
alert(datoscuentaJson);
$.ajax({
    url:UrlInsertCuentas,
    type:'POST',
    data:datoscuentaJson,
    datatype:'JSON',
    ccontentType: 'application/json',
    success:function(reponse)
     {
        console.log(reponse);
        alert('Número de cuenta agregado exitosamente');
     },
    });
    alert('Aviso');
}


