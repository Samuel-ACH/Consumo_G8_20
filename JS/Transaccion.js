var UrlTransacciones = 'http://20.216.41.245:90/G8_20/controller/Transaccion.php?opc=GetTransacciones';
var UrlInsertTransacciones = 'http://20.216.41.245:90/G8_20/controller/Transaccion.php?opc=InsertTransaccion';
var UrlGetTransaccion ='http://20.216.41.245:90/G8_20/controller/Transaccion.php?opc=GetTransaccion';
var UrlUpdateTransacciones ='http://20.216.41.245:90/G8_20/controller/Transaccion.php?opc=UpdateTransaccion';
var UrlEliminarTransacciones='http://20.216.41.245:90/G8_20/controller/Transaccion.php?opc=DeleteTransaccion';

$(document).ready(function(){
    CargarTransacciones();
});

function CargarTransacciones(){
    $.ajax({
        url: UrlTransacciones,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>' + MiItems[i].CodigoTransaccion + '</td>' +
                '<td>' + MiItems[i].TipoTransaccion + '</td>' +
                '<td>' + MiItems[i].CodigoCliente + '</td>' +
                '<td>' + MiItems[i].FechaTransaccion + '</td>' +
                '<td>' + MiItems[i].MontoTransaccion + '</td>' +
                '<td>' + MiItems[i].Sucursal + '</td>' +
                '<td>' + MiItems[i].NumeroDeCuenta + '</td>' +
                '<td>'+
                '<button class="btn btn-info" onclick="CargarTransaccion('+ MiItems[i].CodigoTransaccion +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarTransaccion('+ MiItems[i].CodigoTransaccion +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('#DataTransacciones').html(Valores);
            }
        }
    });
}

function AgregarTransacciones(){
    var datostransaccion = {
    CodigoTransaccion: $('#CodigoTransaccion').val(),
    TipoTransaccion: $('#TipoTransaccion').val(), 
    CodigoCliente: $('#CodigoCliente').val(),
    FechaTransaccion: $('#FechaTransaccion').val(),
    MontoTransaccion: $('#MontoTransaccion').val(),
    Sucursal: $('#Sucursal').val(),
    NumeroDeCuenta: $('#NumeroDeCuenta').val()
};
    var datostransaccionJson= JSON.stringify(datostransaccion);
    alert(datostransaccionJson);
    $.ajax({
    url: UrlInsertTransacciones,
    type: 'POST',
    data: datostransaccionJson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(reponse){
        console.log(reponse);
        alert('Transaccion agregada correctamente');

    },
    error: function(textStatus, errorThrown ){
        alert('Error al agregar transaccion'+ textStatus + errorThrown);
    }
 });
}

function CargarTransaccion(idtransaccion){
    var datostransaccion = {
        CodigoTransaccion: idtransaccion
    };
    var datostransaccionJson = JSON.stringify(datostransaccion);

    $.ajax( {
        url: UrlGetTransaccion,
        type: 'POST',
        data: datostransaccionJson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(reponse){
            var MiItems= reponse;
            $('#CodigoTransaccion').val(MiItems[0].CodigoTransaccion);
            $('#TipoTransaccion').val(MiItems[0].TipoTransaccion);
            $('#CodigoCliente').val(MiItems[0].CodigoCliente);
            $('#FechaTransaccion').val(MiItems[0].FechaTransaccion);
            $('#MontoTransaccion').val(MiItems[0].MontoTransaccion);
            $('#Sucursal').val(MiItems[0].Sucursal);
            $('#NumeroDeCuenta').val(MiItems[0].NumeroDeCuenta);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarTransaccion('+MiItems[0].CodigoTransaccion + ')"'+
            'value="Actualizar Transaccion" class="btn btn-primary"></input>';
            $('#btnagregartransaccion').html(btnactualizar); 
        }
    });
}

function ActualizarTransaccion(idtransaccion){
    var datostransaccion = {
        CodigoTransaccion: idtransaccion,
        CodigoTransaccion: $('#CodigoTransaccion').val(),
        TipoTransaccion: $('#TipoTransaccion').val(), 
        CodigoCliente: $('#CodigoCliente').val(),
        FechaTransaccion: $('#FechaTransaccion').val(),
        MontoTransaccion: $('#MontoTransaccion').val(),
        Sucursal: $('#Sucursal').val(),
        NumeroDeCuenta: $('#NumeroDeCuenta').val(),
    };
    var datostransaccionJson=JSON.stringify(datostransaccion);
    alert(datostransaccionJson);
     
    $.ajax( {
        url: UrlUpdateTransacciones,
        type: 'PUT',
        data: datostransaccionJson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Transaccion Actualizada");
        },
        error: function(textStatus,errorThrown){
            alert('Error al actualizar la transaccion'+textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarTransaccion(idtransaccion){
    var datostransaccion ={
        CodigoTransaccion:idtransaccion
    };
    var datostransaccionJson=JSON.stringify(datostransaccion);

    $.ajax( {
        url: UrlEliminarTransacciones,
        type: 'DELETE',
        data: datostransaccionJson,
        datatype: 'JSON',
        contentType:'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert("Transaccion Eliminada");
    CargarTransacciones();
}
