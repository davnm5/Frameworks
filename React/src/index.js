import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <h1 class="formato"> Frases celebres por escritores </h1>
    );
  }


}


function Cargar_escritores(props) {
  var frases;
  $.getJSON('https://dataserverdaw.herokuapp.com/escritores/frases', function (json) {
    frases = json.frases;
  });

  function cargarFrases(id) {
    var autor = document.getElementById(id);
    var aux = document.getElementsByClassName("titulo");
    for (var i = aux.length - 1; i >= 0; --i) {
      aux[i].className = "autor";
    }
    var titulo = document.getElementById(id + "_" + id);
    titulo.className = "titulo autor";

    var p_remove = document.getElementsByTagName("p");
    for (var i = p_remove.length - 1; i >= 0; --i) {
      p_remove[i].remove();
    }

    for (var i = 0; i < frases.length; i++) {
      if (frases[i].id_autor == id) {
        var frase = document.createElement("p");
        frase.innerText = frases[i].texto;
        frase.className = "fondo";
        autor.appendChild(frase);
      }
    }
  }

  const x = props.escritores;
  const listItems = x.map((escritor) =>
    <div id={escritor.id} class="col-md-15 col-xs-3" key={escritor.toString()} onClick={cargarFrases.bind(this, escritor.id)}>
      <h6 class="autor" id={escritor.id+'_'+escritor.id}>
        {escritor.nombre}
      </h6>
    </div>
  );
  return (
    <div class="row">
      {listItems}
    </div>
  );
}


$.getJSON('https://dataserverdaw.herokuapp.com/escritores', function (json) {
  const aux = json.escritores;
  render(<Cargar_escritores escritores={aux} />, document.getElementById('body'));

});
render(<App />, document.getElementById('header'));
