class Alojamiento {
  _idAlojamiento;
  _numPersonas;

  constructor(idAlojamiento, numPersonas) {
    this._idAlojamiento = idAlojamiento;
    this._numPersonas = numPersonas;
  }

  get idAlojamiento() {
    return this._idAlojamiento;
  }

  set idAlojamiento(value) {
    this._idAlojamiento = value;
  }

  get numPersonas() {
    return this._numPersonas;
  }

  set numPersonas(value) {
    this._numPersonas = value;
  }
}

class Habitacion extends Alojamiento {
  _desayuno;

  constructor(idAlojamiento, numPersonas, desayuno) {
    super(idAlojamiento, numPersonas);
    this._desayuno = desayuno;
  }

  get desayuno() {
    return this._desayuno;
  }

  set desayuno(value) {
    this._desayuno = value;
  }

  toHtmlRow() {
    let exit = "<tr>";

    const values = Object.values(this);

    for (let value of values) {
      exit += "<td>" + value + "</td>";
    }
    exit += "</tr>";

    return exit;
  }
}

class Apartamento extends Alojamiento {
  _parking;
  _dormitorios;

  constructor(idAlojamiento, numPersonas, parking, dormitorios) {
    super(idAlojamiento, numPersonas);
    this._parking = parking;
    this._dormitorios = dormitorios;
  }

  get parking() {
    return this._parking;
  }

  set parking(value) {
    this._parking = value;
  }

  get dormitorios() {
    return this._dormitorios;
  }

  set dormitorios(value) {
    this._dormitorios = value;
  }

  toHtmlRow() {
    let fila = super.toHtmlRow(); // Llama a toHtmlRow de la clase base

    // Modifica la fila agregando la información específica del apartamento
    fila = fila.slice(0, fila.length - 5); // Elimina las últimas 5 posiciones (lo que agrega la clase base)

    fila += "<td>" + this.parking + "</td>";
    fila += "<td>" + this.dormitorios + "</td>";

    return fila;
  }
}

class Cliente {
  _dniCliente;
  _nombre;
  _apellidos;
  _usuario;

  constructor(dniCliente, nombre, apellidos) {
    this._dniCliente = dniCliente.toLowerCase();
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._usuario = this.generarUsuario();
  }

  get dniCliente() {
    return this._dniCliente;
  }

  set dniCliente(value) {
    this._dniCliente = value.toLowerCase();
    this._usuario = this.generarUsuario();
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
    this._usuario = this.generarUsuario();
  }

  get apellidos() {
    return this._apellidos;
  }

  set apellidos(value) {
    this._apellidos = value;
    this._usuario = this.generarUsuario();
  }

  get usuario() {
    return this._usuario;
  }

  generarUsuario() {
    const inicialNombre = this._nombre.charAt(0).toLowerCase();
    const primerasApellido1 = this._apellidos
      .split(" ")[0]
      .substring(0, 3)
      .toLowerCase();
    const primerasApellido2 =
      this._apellidos.split(" ")[1]?.substring(0, 3).toLowerCase() || "";
    const ultimosDigitosDNI = this._dniCliente.slice(-3);

    return `${inicialNombre}${primerasApellido1}${primerasApellido2}${ultimosDigitosDNI}`;
  }

  toHtmlRow() {
    let exit = "<tr>";

    const values = Object.values(this);

    for (let value of values) {
      exit += "<td>" + value + "</td>";
    }
    exit += "</tr>";

    return exit;
  }
}

class Reserva {
  _idReserva;
  _cliente;
  _alojamientos;
  _fechaInicio;
  _fechaFin;

  constructor(idReserva, cliente, fechaInicio, fechaFin) {
    this._idReserva = idReserva;
    this._cliente = cliente;
    this._alojamientos = [];
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
  }

  get idReserva() {
    return this._idReserva;
  }

  set idReserva(value) {
    this._idReserva = value;
  }

  get cliente() {
    return this._cliente;
  }

  set cliente(value) {
    this._cliente = value;
  }

  get alojamientos() {
    return this._alojamientos;
  }

  set alojamientos(value) {
    this._alojamientos = value;
  }

  get fechaInicio() {
    return this._fechaInicio;
  }

  set fechaInicio(value) {
    const d = new Date();
    const actualDate = d.toLocaleDateString();

    if (value < actualDate) {
      alert(
        "La fecha introducida es menor a la actual, se pondrá la fecha actual como inicio por defecto"
      );
      this._fechaInicio = actualDate;
    } else {
      this._fechaInicio = value;
    }
  }

  get fechaFin() {
    return this._fechaFin;
  }

  set fechaFin(value) {
    const d = new Date();
    const actualDate = d.toLocaleDateString();

    if (value < actualDate) {
      alert(
        "La fecha introducida es menor a la actual, se pondrá la fecha actual como inicio por defecto"
      );
      this._fechaFin = actualDate;
    } else {
      this._fechaFin = value;
    }
  }

  verificarDisponibilidad(alojamientosReservados) {
    for (let alojamiento of this._alojamientos) {
      for (let reserva of alojamientosReservados) {
        // Compara las fechas de las reservas existentes con las nuevas
        if (
          reserva._alojamientos.includes(alojamiento) &&
          !(
            this._fechaFin < reserva._fechaInicio ||
            this._fechaInicio > reserva._fechaFin
          )
        ) {
          alert(
            `El alojamiento ${alojamiento} ya está reservado en las fechas solicitadas.`
          );
          return false;
        }
      }
    }

    return true;
  }

  reservaAlojamientos(numeroReservas) {
    if (numeroReservas <= 0) {
      alert("El número de reservas debe de ser mayor que 0");
      return;
    }

    for (let i = 0; i < numeroReservas && i < this._alojamientos.length; i++) {
      let alojamiento = this._alojamientos[i];

      // Usar el setter de alojamiento para añadirlo
      this.setAlojamiento(alojamiento);
    }
  }

  setAlojamiento(alojamiento) {
    if (!this._alojamientos.includes(alojamiento)) {
      this._alojamientos.push(alojamiento);
    } else {
      alert(`El alojamiento ${alojamiento.idAlojamiento} ya está reservado.`);
    }
  }

  toHtmlRow() {
    let tag = "<tr>";

    let values = Object.values(this);

    for (let value of values) {
      tag += "<td>" + value + "</td>";
    }

    tag += "</tr>";
    return tag;
  }
}

class Agencia {
  constructor() {
    this._clientes = [];
    this._reservas = [];
    this._alojamientos = [];
  }

  altaCliente(cliente) {
    if (!this._clientes.find((c) => c.dniCliente === cliente.dniCliente)) {
      this._clientes.push(cliente);
    } else {
      alert("Este cliente ya está registrado.");
    }
  }

  altaAlojamiento(alojamiento) {
    if (
      !this._alojamientos.find(
        (a) => a.idAlojamiento === alojamiento.idAlojamiento
      )
    ) {
      this._alojamientos.push(alojamiento);
    } else {
      alert("Este alojamiento ya está registrado.");
    }
  }

  altaReserva(reserva) {
    const disponibilidad = reserva.verificarDisponibilidad(this._reservas);

    if (disponibilidad) {
      this._reservas.push(reserva);
    } else {
      alert("No se puede realizar la reserva en las fechas seleccionadas.");
    }
  }

  listadoClientes() {
    return this._clientes;
  }

  listadoAlojamientos() {
    return this._alojamientos;
  }

  listadoReservasCliente(dniCliente) {
    return this._reservas.filter(
      (reserva) => reserva.cliente.dniCliente === dniCliente
    );
  }

  listadoReservasPorFechas(fechaInicio, fechaFin) {
    return this._reservas.filter((reserva) => {
      return reserva.fechaInicio >= fechaInicio && reserva.fechaFin <= fechaFin;
    });
  }

  listadoHabitacionesConDesayuno() {
    return this._alojamientos
      .filter(
        (alojamiento) =>
          alojamiento instanceof Habitacion && alojamiento.desayuno
      )
      .sort((a, b) => {
        if (b.numPersonas - a.numPersonas === 0) {
          return a.idAlojamiento.localeCompare(b.idAlojamiento);
        }
        return b.numPersonas - a.numPersonas;
      });
  }
}
