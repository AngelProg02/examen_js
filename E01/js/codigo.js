"use strict";

// Variables globales
let oAgencia = new Agencia();

datosIniciales();

function datosIniciales() {
  oAgencia.altaCliente(new Cliente("12345678A", "Juan", "Pérez García"));
  oAgencia.altaCliente(new Cliente("87654321B", "María", "López Sánchez"));
  oAgencia.altaAlojamiento(new Habitacion("H001", 2, true)); // Habitación con desayuno
  oAgencia.altaAlojamiento(new Apartamento("A001", 4, true, 2)); // Apartamento con parking y 2 dormitorios
  oAgencia.altaReserva(
    new Reserva("R001", oAgencia.clientes[0], "2024-12-01", "2024-12-10")
  );
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Mostrar el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaCliente":
      frmAltaCliente.style.display = "block";
      break;
    case "frmAltaAlojamiento":
      frmAltaAlojamiento.style.display = "block";
      break;
    case "frmListadoClientes":
      frmListadoClientes.style.display = "block";
      break;
    case "frmListadoAlojamientos":
      frmListadoAlojamientos.style.display = "block";
      break;
    case "frmListadoReservas":
      frmListadoReservas.style.display = "block";
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

// Aceptar Alta de Cliente
function aceptarAltaCliente() {
  const dni = document.getElementById("txtDniCliente").value;
  const nombre = document.getElementById("txtNombre").value;
  const apellidos = document.getElementById("txtApellidos").value;

  const nuevoCliente = new Cliente(dni, nombre, apellidos);
  oAgencia.altaCliente(nuevoCliente);

  alert("Cliente registrado correctamente");
  frmAltaCliente.reset(); // Vaciamos los campos del formulario
  frmAltaCliente.style.display = "none";
}

// Aceptar Alta de Alojamiento
function aceptarAltaAlojamiento() {
  const idAlojamiento = document.getElementById("txtIdAlojamiento").value;
  const numPersonas = parseInt(document.getElementById("txtNumPersonas").value);
  const tipoAlojamiento = document.querySelector(
    'input[name="rbtTipoAlojamiento"]:checked'
  ).value;

  let nuevoAlojamiento;

  if (tipoAlojamiento === "hotel") {
    const desayuno = confirm("¿Incluye desayuno?");
    nuevoAlojamiento = new Habitacion(idAlojamiento, numPersonas, desayuno);
  } else if (tipoAlojamiento === "apartamento") {
    const parking = confirm("¿Incluye parking?");
    const dormitorios = parseInt(prompt("Número de dormitorios"));
    nuevoAlojamiento = new Apartamento(
      idAlojamiento,
      numPersonas,
      parking,
      dormitorios
    );
  }

  oAgencia.altaAlojamiento(nuevoAlojamiento);

  alert("Alojamiento registrado correctamente");
  frmAltaAlojamiento.reset();
  frmAltaAlojamiento.style.display = "none";
}

// Aceptar Listado de Clientes
function aceptarListadoClientes() {
  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write("<h1>Listado de Clientes</h1>");
  oVentana.document.write(
    "<table><tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th></tr>"
  );

  oAgencia.listadoClientes().forEach((cliente) => {
    oVentana.document.write(cliente.toHtmlRow());
  });

  oVentana.document.write("</table>");
  oVentana.document.close();
  oVentana.document.title = "Listado de Clientes";

  frmListadoClientes.reset();
  frmListadoClientes.style.display = "none";
}

// Aceptar Listado de Alojamientos
function aceptarListadoAlojamientos() {
  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write("<h1>Listado de Alojamientos</h1>");
  oVentana.document.write(
    "<table><tr><th>ID</th><th>Capacidad</th><th>Detalles</th></tr>"
  );

  oAgencia.listadoAlojamientos().forEach((alojamiento) => {
    oVentana.document.write(alojamiento.toHtmlRow());
  });

  oVentana.document.write("</table>");
  oVentana.document.close();
  oVentana.document.title = "Listado de Alojamientos";

  frmListadoAlojamientos.reset();
  frmListadoAlojamientos.style.display = "none";
}

// Aceptar Listado de Reservas de un Cliente
function aceptarListadoReservas() {
  const dniCliente = document.getElementById("txtDniClienteReserva").value;
  const reservasCliente = oAgencia.listadoReservasCliente(dniCliente);

  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write(
    `<h1>Listado de Reservas del Cliente ${dniCliente}</h1>`
  );
  oVentana.document.write(
    "<table><tr><th>ID Reserva</th><th>Fecha Inicio</th><th>Fecha Fin</th><th>Alojamientos</th></tr>"
  );

  reservasCliente.forEach((reserva) => {
    oVentana.document.write(reserva.toHtmlRow());
  });

  oVentana.document.write("</table>");
  oVentana.document.close();
  oVentana.document.title = "Listado de Reservas";

  frmListadoReservas.reset();
  frmListadoReservas.style.display = "none";
}
