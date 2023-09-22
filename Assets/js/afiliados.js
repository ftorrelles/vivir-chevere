document.addEventListener('DOMContentLoaded', function () {
  var enlaceCargarTabla = document.getElementById('enlaceCargarTabla');
  var tablaContainer = document.getElementById('tablaContainer');
  var tablaReferidosContainer = document.getElementById('tablaContainerR'); // Agrega esta línea
  var labelmulti = document.getElementById('labelmulti');
  enlaceCargarTabla.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    // Cambiar el texto del label
    labelmulti.textContent = 'Afiliados'; // Agrega esta línea

    // Mostrar el contenedor de la tabla
    tablaContainer.style.display = 'block';

    // Ocultar el contenedor de la tabla de referidos
    tablaReferidosContainer.style.display = 'none'; // Agrega esta línea
    tablaContainerD.style.display = 'none';
    // Resto del código...
    if (!$.fn.DataTable.isDataTable('#tablaAfiliados')) {
      tabla = $('#tablaAfiliados').DataTable({
        ajax: {
          url: base_url + 'Usuarios/cargarTabla', // Cambia la URL a la función que cargará la tabla
          dataSrc: '', // El objeto JSON de respuesta no tiene una clave específica (opcional)
        },
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + meta.settings._iDisplayStart + 1;
            },
          },
          { data: 'id' },
          {
            data: null,
            render: function (data, type, row) {
              // Combina los campos firstName y lastName en una sola columna
              return data.firstName + ' ' + data.lastName;
            },
          },
          { data: 'email' },
          {
            data: 'isVerified',
            render: function (data, type, row) {
              if (data === true) {
                return '<span class="badge badge-success">Activo</span>';
              } else {
                return '<span class="badge badge-danger">Inactivo</span>';
              }
            },
          },
          {
            data: null,
            render: function (data, type, row) {
              // Agrega los botones de acción relacionados al ID
              var id = data.id;
              return (
                '<button class="btn btn-primary" type="button" onclick="editar(' +
                id +
                ')"><i class="fas fa-edit"></i></button>' +
                ' ' +
                '<button class="btn btn-primary" type="button" onclick="eliminar(' +
                id +
                ')"><i class="fas fa-edit"></i></button>'
              );
            },
          },
        ],
        createdRow: function (row, data, dataIndex) {
          // Se ha creado una fila, aquí puedes personalizar el estilo si es necesario
        },
      });
    }
  });

  var enlaceCargarTablaR = document.getElementById('enlaceCargarTablaR');
  var tablaReferidosContainer = document.getElementById('tablaContainerR'); // Cambia el nombre de la variable para evitar conflicto

  enlaceCargarTablaR.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    // Cambiar el texto del label
    labelmulti.textContent = 'Referidos'; // Agrega esta línea

    // Mostrar el contenedor de la tabla de referidos
    tablaReferidosContainer.style.display = 'block';

    // Ocultar el contenedor de la tabla
    tablaContainer.style.display = 'none'; // Agrega esta línea
    tablaContainerD.style.display = 'none';
    // Resto del código...
    if (!$.fn.DataTable.isDataTable('#tablaReferidos')) {
      tabla = $('#tablaReferidos').DataTable({
        ajax: {
          url: base_url + 'Usuarios/cargarTablaR', // Cambia la URL a la función que cargará la tabla
          dataSrc: '', // El objeto JSON de respuesta no tiene una clave específica (opcional)
        },
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + meta.settings._iDisplayStart + 1;
            },
          },
          { data: 'id' },
          {
            data: null,
            render: function (data, type, row) {
              // Combina los campos firstName y lastName en una sola columna
              return data.firstName + ' ' + data.lastName;
            },
          },
          { data: 'email' },
          {
            data: 'isVerified',
            render: function (data, type, row) {
              if (data === true) {
                return '<span class="badge badge-success">Activo</span>';
              } else {
                return '<span class="badge badge-danger">Inactivo</span>';
              }
            },
          },
          {
            data: null,
            render: function (data, type, row) {
              // Agrega los botones de acción relacionados al ID
              var id = data.id;
              return (
                '<button class="btn btn-primary" type="button" onclick="editar(' +
                id +
                ')"><i class="fas fa-edit"></i></button>' +
                ' ' +
                '<button class="btn btn-primary" type="button" onclick="eliminar(' +
                id +
                ')"><i class="fas fa-edit"></i></button>'
              );
            },
          },
        ],
        createdRow: function (row, data, dataIndex) {
          // Se ha creado una fila, aquí puedes personalizar el estilo si es necesario
        },
      });
    }
  });
  var detalleCompras = document.getElementById('detalleCompras');
  var tablaContainerD = document.getElementById('tablaContainerD');

  detalleCompras.addEventListener('click', function (event) {
    event.preventDefault();
    labelmulti.textContent = 'Detalle de Compras';
    tablaContainerD.style.display = 'block';
    tablaContainer.style.display = 'none';
    tablaReferidosContainer.style.display = 'none';
    if (!$.fn.DataTable.isDataTable('#tablaDetalleCompras')) {
      // Inicializa la datatable para mostrar las compras del usuario actual
      tabla = $('#tablaDetalleCompras').DataTable({
        ajax: {
          url: base_url + 'Usuarios/cargarTablaD', // Cambia la URL a la función que cargará la tabla
          dataSrc: '', // El objeto JSON de respuesta no tiene una clave específica (opcional)
        },
        columns: [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + meta.settings._iDisplayStart + 1;
            },
          },
          {
            data: null,
            render: function (data, type, row, meta) {
              return 'Fact-' + data.id;
            },
          },
          {
            data: 'createdAt', // Ajusta esto al nombre del campo de fecha en tu respuesta de la base de datos
            render: function (data, type, row) {
              // Convierte la cadena de fecha en un objeto de fecha
              var date = new Date(data);

              // Formato de fecha y hora deseado: DD-MM-YYYY HH:mm
              var formattedDate = `${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

              return formattedDate;
            },
            className: 'text-center',
          },
          { data: 'total', className: 'text-right' },
          {
            data: null,
            render: function (data, type, row) {
              // Agrega los botones de acción relacionados al ID
              var id = data.id;
              return (
                '<div class="d-flex justify-content-center align-items-center">' +
                '<button class="btn btn-primary mr-2" type="button" onclick="mostrardetalle(' +
                id +
                ')"><i class="fas fa-info-circle"></i></button>' +
                ' ' +
                '<button class="btn btn-primary" type="button" onclick="imprimir(' +
                id +
                ')"><i class="fas fa-print"></i></button>' +
                '</div>'
              );
            },
          },
        ],
        createdRow: function (row, data, dataIndex) {
          // Se ha creado una fila, aquí puedes personalizar el estilo si es necesario
        },
      });
    }
  });

  $(document).ready(function () {
    obtenerSaldoCalculado();
  });
});

function mostrardetalle(id) {
  // Hacer una solicitud AJAX para obtener los detalles de la factura
  $.ajax({
    url: base_url + 'Usuarios/obtenerDetalleFactura/' + id, // Ruta en Usuarios.php
    type: 'GET',
    dataType: 'json',
    success: function (detallesFactura) {
      // Imprimir la respuesta en la consola
      console.log('Detalles de factura recibidos:', detallesFactura);

      // Construir las filas de la tabla con los detalles de la factura
      var tablaDetalles = document.getElementById('tablaDetalles');
      tablaDetalles.innerHTML = ''; // Limpiar contenido anterior

      var totalFactura = 0;

      detallesFactura.forEach((detalle, index) => {
        // Formatear el precio como número con dos decimales
        var precioFormateado = parseFloat(detalle.precio).toFixed(2);

        var totalLinea = detalle.quantity * parseFloat(detalle.precio);
        totalFactura += totalLinea;
        var fila =
          '<tr>' +
          '<td>' +
          (index + 1) +
          '</td>' +
          '<td>' +
          detalle.productId +
          '</td>' +
          '<td>' +
          detalle.nombre_producto +
          '</td>' +
          '<td>' +
          detalle.quantity +
          '</td>' +
          '<td>' +
          detalle.precio +
          '</td>' +
          '<td>' +
          detalle.total_line +
          '</td>' +
          // Agrega más celdas aquí según tus necesidades
          '</tr>';
        tablaDetalles.innerHTML += fila;
      });

      // Agregar fila para mostrar el total de la factura
      var filaTotal =
        '<tr>' +
        '<td colspan="5"></td>' +
        '<td><strong>Total: ' +
        totalFactura.toFixed(2) +
        '</strong></td>' +
        '</tr>';
      tablaDetalles.innerHTML += filaTotal;
      // Abrir el modal
      $('#detalleModal').modal('show');
    },
    error: function () {
      // Manejar error si la solicitud AJAX falla
      console.log('Error al obtener los detalles de la factura.');
    },
  });
}

function obtenerSaldoCalculado() {
  // Obtener el mes y año actual
  var fechaActual = new Date();
  var mesActual = fechaActual.getMonth() + 1; // Sumar 1 porque los meses en JavaScript son base 0
  var anioActual = fechaActual.getFullYear();
  // Realizar una solicitud AJAX para obtener el saldo calculado desde el servidor
  $.ajax({
    url: base_url + 'Usuarios/totalcomprasmes', // Agrega la ruta correcta a tu servidor
    type: 'GET',
    data: {
      mes: mesActual,
      anio: anioActual,
    },
    dataType: 'json',
    success: function (saldoCalculado) {
      var totalc = saldoCalculado[0].totalc;
      console.log('Total calculado:', totalc);
      $('#Saldo').text(totalc);
    },
    error: function () {
      console.log('Error al obtener el saldo calculado desde el servidor.');
    },
  });
}

// Llamar a la función cada 5 segundos
setInterval(obtenerSaldoCalculado, 60000); // 60000 milisegundos = 60 segundos

function obtenerSaldoCalculado2() {
  alert('La función se está ejecutando al cargar la página.');
}
