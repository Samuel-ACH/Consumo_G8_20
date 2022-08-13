var UrlBancos = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=GetBancos';
var UrlInsertBancos = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=InsertBanco';
var UrlGetBanco = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=GetBanco';
var UrlUpdateBanco = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=UpdateBanco';
var UrlDeleteBanco = 'http://20.216.41.245:90/G8_20/controller/Banco.php?opc=DeleteBanco';

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
                Valores += '<tr>'+
                '<td>' + MiItems[i].codigo_banco + '</td>' +
                '<td>' + MiItems[i].nombre_banco + '</td>' +
                '<td>' + MiItems[i].oficina_principal + '</td>' +
                '<td>' + MiItems[i].cantidad_sucursales + '</td>' +
                '<td>' + MiItems[i].pais + '</td>' +
                '<td>' + MiItems[i].fechafundacion + '</td>' +
                '<td>' + MiItems[i].RTN + '</td>' +
                '<td>'+
                '<button class="btn btn-info" onclick="CargarBanco('+ MiItems[i].codigo_banco +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarBanco('+ MiItems[i].codigo_banco +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataBancos').html(Valores);
            }
        }
    });
}

function AgregarBancos(){
    var datosbancos = {
        codigo_banco:$('#codigo_banco').val(),
        nombre_banco:$('#nombre_banco').val(),
        oficina_principal:$('#oficina_principal').val(),
        cantidad_sucursales:$('#cantidad_sucursales').val(),
        pais:$('#pais').val(),
        fechafundacion:$('#fechafundacion').val(),
        RTN:$('#RTN').val(), 
    };
    var datosbancosjson= JSON.stringify(datosbancos);

    $.ajax({
        url: UrlInsertBancos,
        type:'POST',
        data:datosbancosjson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(reponse){
            console.log(reponse);
            alert('Error al ingresar el banco'); 
        },
        error: function(textStatus, errorThrown){
            alert('Banco Ingresado');  
        }
    });
    alert('Aviso');
}
function CargarBanco(CodigoBanco){
    var datosbancos = {
        codigo_banco: CodigoBanco
    };
    var datosbancosjson = JSON.stringify(datosbancos);

    $.ajax({
        url: UrlGetBanco,
        type: 'POST',
        data: datosbancosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#codigo_banco').val(MiItems[0].codigo_banco);
            $('#nombre_banco').val(MiItems[0].nombre_banco);
            $('#oficina_principal').val(MiItems[0].oficina_principal);
            $('#cantidad_sucursales').val(MiItems[0].cantidad_sucursales);
            $('#pais').val(MiItems[0].pais);
            $('#fechafundacion').val(MiItems[0].fechafundacion);
            $('#RTN').val(MiItems[0].RTN);
           var btnactualizar = '<input type="submit" id="btn-actualizar" onclick="ActualizarBanco('+ MiItems[0].codigo_banco + ')"'+
        'value="Actualizar Banco" class="btn btn-primary"></input>';
        $('#btnagregarbanco').html(btnactualizar);
        }
    });
}

function ActualizarBanco(CodigoBanco){
    var datosbancos = {
        codigo_banco: CodigoBanco,
        codigo_banco:$('#codigo_banco').val(),
        nombre_banco:$('#nombre_banco').val(),
        oficina_principal:$('#oficina_principal').val(),
        cantidad_sucursales:$('#cantidad_sucursales').val(),
        pais:$('#pais').val(),
        fechafundacion:$('#fechafundacion').val(),
        RTN:$('#RTN').val(), 
    };
    var datosbancosjson = JSON.stringify(datosbancos);

    $.ajax({
        url:UrlUpdateBanco,
        type:'PUT',
        data:datosbancosjson,
        datatype:'JSON',
        contentType:'application/json',
        success:function (reponse){
            console.log(reponse);
            alert("Error al actualizar");
        },
        error: function(textStatus, errorThrown){
            alert('Se actualizo con exito');
        }
    });
    alert('Aviso');
}

function EliminarBanco(CodigoBanco){
    var datosbancos = {
        codigo_banco: CodigoBanco
    };
    var datosbancosjson = JSON.stringify(datosbancos);

    $.ajax({
        url: UrlDeleteBanco,
        type: 'DELETE',
        data: datosbancosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response){
            console.log(response)
        }
    });
    alert('Banco Eliminado');
    CargarBancos();
}
