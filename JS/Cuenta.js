var UrlCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuentas';
var UrlInsertCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=InsertCuenta';
var UrlGetCuenta = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuenta';
var UrlUpdateCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=UpdateCuenta';
var UrlEliminarCuentas ='http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=DeleteCuenta';


$(document).ready (function(){
    CargarCuentas();
});

function CargarCuentas(){
    $.ajax({
        url: UrlCuentas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
         var MiItems = reponse;
         var Valores = '';

           for (i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NumeroDeCuenta + '</td>' +
                '<td>' + MiItems[i].NombreDeCuenta + '</td>' +
                '<td>' + MiItems[i].NumeroDeCliente + '</td>' +
                '<td>' + MiItems[i].FechaDeApertura + '</td>' +
                '<td>' + MiItems[i].SaldoActual + '</td>' +
                '<td>' + MiItems[i].SaldoRetenido + '</td>' +
                '<td>' + MiItems[i].TipoMoneda + '</td>' +
                '<td>'+
                '<button class="btn btn-info" onclick="CargarCuenta('+ MiItems[i].NumeroDeCuenta +')">Editar</button>'+
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

function AgregarCuentas(){
var datoscuenta = {
    NumeroDeCuenta: $('#NumeroDeCuenta').val(),
    NombreDeCuenta: $('#NombreDeCuenta').val(),
    NumeroDeCliente: $('#NumeroDeCliente').val(),
    FechaDeApertura: $('#FechaDeApertura').val(),
    SaldoActual: $('#SaldoActual').val(),
    SaldoRetenido: $('#SaldoRetenido').val(),
    TipoMoneda: $('#TipoMoneda').val(),
};
var datoscuentajson = JSON.stringify(datoscuenta);


$.ajax({
    url:UrlInsertCuentas,
    type:'POST',
    data:datoscuentajson,
    datatype:'JSON',
    contentType: 'application/json',
    success: function(reponse){
        console.log(reponse);
        alert('Error al agregar cuenta');
     },
     error: function(textStatus, errorThrown){
        alert('Cuenta agregada correctamente');
     }
    });
    alert('Aviso');
}

function CargarCuenta(idcuenta){
    var datoscuenta = {
        NumeroDeCuenta: idcuenta 
    };
    var datoscuentajson = JSON.stringify(datoscuenta);

    $.ajax( {
        url: UrlGetCuenta,
        type: 'POST',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(reponse){
            var MiItems= reponse;
            $('#NumeroDeCuenta').val(MiItems[0].NumeroDeCuenta);
            $('#NombreDeCuenta').val(MiItems[0].NombreDeCuenta);
            $('#NumeroDeCliente').val(MiItems[0].NumeroDeCliente);
            $('#FechaDeApertura').val(MiItems[0].FechaDeApertura);
            $('#SaldoActual').val(MiItems[0].SaldoActual);
            $('#SaldoRetenido').val(MiItems[0].SaldoRetenido);
            $('#TipoMoneda').val(MiItems[0].TipoMoneda);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCuenta('+ MiItems[0].NumeroDeCuenta + ')"'+
            'value="Actualizar Cuenta" class="btn btn-primary"></input>';
            $('#btnagregarcuenta').html(btnactualizar); 
        }
    });
}

function ActualizarCuenta(idcuenta){
    var datoscuenta = {
        NumeroDeCuenta: idcuenta,
        NumeroDeCuenta:$('#NumeroDeCuenta').val(),
        NombreDeCuenta:$('#NombreDeCuenta').val(), 
        NumeroDeCliente:$('#NumeroDeCliente').val(),
        FechaDeApertura:$('#FechaDeApertura').val(),
        SaldoActual:$('#SaldoActual').val(),
        SaldoRetenido:$('#SaldoRetenido').val(),
        TipoMoneda:$('#TipoMoneda').val(),
    };
    var datoscuentajson = JSON.stringify(datoscuenta);
    alert(datoscuentajson);
    
    $.ajax( {
        url: UrlUpdateCuentas,
        type: 'PUT',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(reponse){
            cconsole.log(reponse);
            alert("Error al actualizar la cuenta");
        },
        error: function(textStatus,errorThrown){
            alert('Cuenta actualizada');
        }
    });
    alert('Aviso');
}


function EliminarCuenta(idcuenta){
    var datoscuenta ={
        NumeroDeCuenta:idcuenta
    };
    var datoscuentajson=JSON.stringify(datoscuenta);

    $.ajax({
        url: UrlEliminarCuentas,
        type: 'DELETE',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert("Cuenta Eliminada");
    CargarCuentas();
}
