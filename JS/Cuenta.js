var UrlCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuentas';
var UrlGetCuenta ='http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuenta';
var UrlInsertCuentas = 'http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=InsertCuenta';
var UrlGetCuenta ='http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=GetCuenta';
var UrlUpdateCuentas ='http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=UpdateCuenta';
var UrlEliminarCuentas='http://20.216.41.245:90/G8_20/controller/Cuenta.php?opc=DeleteCuenta';


$(document).ready (function(){
CargarCuentas();
});

function CargarCuentas(){
    $.ajax({

        url:UrlCuentas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
         var MiItems = response;
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
                '<button class="btn btn-danger" onclick="EliminarCuentas('+ MiItems[i].NumeroDeCuenta +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('#DataCuentas').html(Valores);
            }
         }  

    });
}

function AgregarCuenta(){
var datoscuenta = {
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
$.ajax({
    url:UrlInsertCuentas,
    type:'POST',
    data:datoscuentajson,
    datatype:'JSON',
    ccontentType: 'application/json',
    success: function(response)
     {
        console.log(response);
        alert('Número de cuenta agregado exitosamente');
     },
     
     error: function(textStatus, errorThrown)
     {
        alert('Error al agregar una cuenta nueva'+ textStatus + errorThrown);
     }
    });
    alert('Aviso');
}

function CargarCuenta(idcuenta){
    var datoscuenta = 
    {
        NumeroDeCuenta : idcuenta 
    };

    var datoscuentajson = JSON.stringify(datoscuenta);

    $.ajax({
        url:UrlGetCuenta,
        ype:'POST',
        data:datoscuentajson,
        datatype:'JSON',
        ccontentType: 'application/json',
        success: function(response) {
            var MiItems = response;
            $('#NumeroDeCuenta').val(MiItems[0].NumeroDeCuenta);
            $('#NombreDeCuenta').val(MiItems[0].NombreDeCuenta);
            $('#NumeroDeCliente').val(MiItems[0].NumeroDeCliente);
            $('#FechaDeApertura').val(MiItems[0].FechaDeApertura);
            $('#SaldoActual').val(MiItems[0].SaldoActual);
            $('#SaldoRetenido').val(MiItems[0].SaldoRetenido);
            $('#TipoMoneda').val(MiItems[0].TipoMoneda);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCuenta('+MiItems[0].NumeroDeCuenta+ ')"'+
            'value="Actualizar Cuenta" class="btn btn-primary"></input>';
            $('#btnagregarcuenta').html(btnactualizar);

        }
    });
}

function ActualizarCuenta(idcuenta){
    var datoscuenta={
        NumeroDeCuenta:idcuenta,
        NombreDeCuenta: $('#NombreDeCuenta').val(), 
        NumeroDeCliente: $('#NumeroDeCliente').val(),
        FechaDeApertura: $('#FechaDeApertura').val(),
        SaldoActual: $('#SaldoActua').val(),
        SaldoRetenido: $('#SaldoRetenido').val(),
        TipoMoneda: $('#TipoMoneda').val()
    };
    var datoscuentajson=JSON.stringify(datoscuenta);

    $.ajax( {
        url: UrlUpdateCuentas,
        type: 'PUT',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (response)
        {
            console.log(response);
            alert("Cuenta Actualizada");
        },
            error: function(textStatus,errorThrown){
            alert('Error al actualizar la cuenta'+textStatus + errorThrown);
        }
    });
    alert('Aviso');
}


function EliminarCuenta(idcuenta){
    var datoscuenta ={
        NumeroDeCuenta:idcuenta
    };
    var datoscuentajson=JSON.stringify(datoscuenta);

    $.ajax( {
        url: UrlEliminarCuentas,
        type: 'DELETE',
        data: datoscuentajson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert("Cuenta Eliminado");
    CargarCuenta();
}