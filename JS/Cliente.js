var UrlClientes = 'http://20.216.41.245:90/G8_20/controller/Cliente.php?opc=GetClientes';
var UrlInsertCliente = 'http://20.216.41.245:90/G8_20/controller/Cliente.php?opc=InsertCliente';
var UrlGetCliente ='http://20.216.41.245:90/G8_20/controller/Cliente.php?opc=GetCliente';
var UrlUpdateCliente ='http://20.216.41.245:90/G8_20/controller/Cliente.php?opc=UpdateCliente';
var UrlEliminarCliente='http://20.216.41.245:90/G8_20/controller/Cliente.php?opc=DeleteCliente';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlClientes,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].NumeroCliente + '</td>' +
                '<td>' + MiItems[i].Nombres + '</td>' +
                '<td>' + MiItems[i].Apellidos + '</td>' +
                '<td>' + MiItems[i].RTN + '</td>' +
                '<td>' + MiItems[i].FechaAfiliacion + '</td>' +
                '<td>' + MiItems[i].SaldoActual + '</td>' +
                '<td>' + MiItems[i].NumeroCuenta + '</td>' +
                '<td>'+
                '<button class="btn btn-info" onclick="CargarCliente('+ MiItems[i].NumeroCliente +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarClientes('+ MiItems[i].NumeroCliente +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('#DataClientes').html(Valores);
            }
        }
    });
}

function AgregarClientes(){
    var datoscliente = {
    NumeroCliente: $('#NumeroCliente').val(),
    Nombres: $('#Nombres').val(), 
    Apellidos: $('#Apellidos').val(),
    RTN: $('#RTN').val(),
    FechaAfiliacion: $('#FechaAfiliacion').val(),
    SaldoActual: $('#SaldoActual').val(),
    NumeroCuenta: $('#NumeroCuenta').val()
};
    var datosclientejson= JSON.stringify(datoscliente);

    
    $.ajax({
    url: UrlInsertCliente,
    type:'POST',
    data: datosclientejson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(reponse){
        console.log(reponse);
        alert('Cliente agregado Correctamente');

    },
    error: function(textStatus, errorThrown ){
        alert('Error al agregar Cliente'+ textStatus + errorThrown);
    }
 });
 alert('Aviso');
}

function CargarCliente(idcliente){
    var datoscliente = {
        NumeroCliente: idcliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax( {
        url: UrlGetCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (reponse){
            var MiItems= reponse;
            $('#NumeroCliente').val(MiItems[0].NumeroCliente);
            $('#Nombres').val(MiItems[0].Nombres);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#RTN').val(MiItems[0].RTN);
            $('#FechaAfiliacion').val(MiItems[0].FechaAfiliacion);
            $('#SaldoActual').val(MiItems[0].SaldoActual);
            $('#NumeroCuenta').val(MiItems[0].NumeroCuenta);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCliente('+MiItems[0].NumeroCliente+ ')"'+
            'value="Actualizar Cliente" class="btn btn-primary"></input>';
            $('#btnagregarcliente').html(btnactualizar);
        }
    });
}

function ActualizarCliente(idcliente){
    var datoscliente = {
        NumeroCliente: idcliente,
        NumeroCliente:$('#NumeroCliente').val(),
        Nombres:$('#Nombres').val(),
        Apellidos:$('#Apellidos').val(),
        RTN:$('#RTN').val(),
        FechaAfiliacion:$('#FechaAfiliacion').val(),
        SaldoActual:$('#SaldoActual').val(),
        NumeroCuenta:$('#NumeroCuenta').val(), 
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url:UrlUpdateCliente,
        type:'PUT',
        data:datosclientejson,
        datatype:'JSON',
        contentType:'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Error al actualizar Cliente");
        },
        error: function(textStatus, errorThrown){
            alert('El Cliente Se actualizo con exito'+ textStatus);
        }
    });
    alert('Aviso');
}

function EliminarClientes(idcliente){
    var datoscliente ={
        NumeroCliente:idcliente
    };
    var datosclientejson=JSON.stringify(datoscliente);

    $.ajax( {
        url: UrlEliminarCliente,
        type: 'DELETE',
        data: datosclientejson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert("Cliente Eliminado");
    CargarClientes();
}

