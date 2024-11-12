function altaArbol(a) {
  arboles.push(a);
}

//indexOf busca el primer indice que tenga el tipo

const fruis = ["Banana", "Apple", "Orange", "Mango"];

let index = fruis.indexOf("Apple");


const person = {
  firstName: "John",...
}
 
function toHtmlRow() {

  let exit = "<tr>"

  //Los atributos y valores del propio objeto
  //let atributtes = Object.keys(this)
  let values = Object.values(this)

  for(let value of values) {
    exit += "<td>" + value + "</td>";
  }

  exit += "</tr>"

}

/**
 * Diferencia entre of y in
 * of --> iteración sobre las propiedades de un objeto iterable
 * in --> se enfoca en la existencia de una propiedad "True" - "False"
 * */


class Vivero {

  _arboles;

  constructor() {
    this._arboles = []
  }
  get arboles() {
    return this._arboles;
  }
  set arboles(value) {
    this._arboles = value;
  }

  altaArbol(oArbol) {
    let encontrado = ""
    while(i < this.arboles.length && !encontrado) {
      if (this.arboles[i] == oArbol) {
        encontrado = true
      }else {
        i++
      }

    }

    if(encontrado) {
      alert("Arbol encontrado")
    }else{
      this.arboles.push(oArbol)
      alert("Árbol no encontrado")
    }

    return !encontrado; //No encontrado lo tiene que insertar
  }
  
}