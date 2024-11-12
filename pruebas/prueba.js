class Cliente {
  _dni_cliente;
  _nombre;
  _apellidos;
  _usuario;

  constructor(dni_cliente, nombre, apellidos) {
    this._dni_cliente = dni_cliente.toLowerCase();
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._usuario = this.generarUsuario();
  }

  get dni_cliente() {
    return this._dni_cliente;
  }

  set dni_cliente(value) {
    this._dni_cliente = value.toLowerCase();
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
    const inicial_nombre = this._nombre.charAt(0).toLowerCase();
    const primeras_apellido1 = this._apellidos
      .split(" ")[0]
      .substring(0, 3)
      .toLowerCase();
    const primeras_apellido2 =
      this._apellidos.split(" ")[1]?.substring(0, 3).toLowerCase() || "";
    const ultimos_digitos_dni = this._dni_cliente.slice(-3);

    return `${inicial_nombre}${primeras_apellido1}${primeras_apellido2}${ultimos_digitos_dni}`;
  }

  toHtmlRow() {
    let exit = "<tr>";

    // Usar los getters para acceder a los valores privados
    const values = Object.values(this);

    for (let value of values) {
      exit += "<td>" + value + "</td>";
    }
    exit += "</tr>";

    return exit;
  }
}

const cliente = new Cliente("47548773E", "Ángel", "Apellidos");

console.log(cliente.toHtmlRow());

const d = new Date();

let date1 = d.toLocaleDateString();
let date2 = "15/12/2023";
if (date2 < date2) {
  console.log("Todo ok");
} else {
  console.log("La fecha es menor a la actual");
}
