import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

var app = new Vue({
    el: '#app',
    data: {
        escritores: null,
        frases: null,
        rows:26
    },
    methods: {

    mostrar_frase(id){
          
                var autor = document.getElementById(id);
                var aux=document.getElementsByClassName("titulo");
                 for (var i = aux.length - 1; i >= 0; --i) {
                  aux[i].className="autor";
                }
                var titulo = document.getElementById(id + "_" + id);
                titulo.className = "titulo autor";
            
                var p_remove = document.getElementsByTagName("p");
                for (var i = p_remove.length - 1; i >= 0; --i) {
                  p_remove[i].remove();
                }
            
                for (var i = 0; i < app.frases.length; i++) {
                  if (app.frases[i].id_autor == id) {
                    var frase = document.createElement("p");
                    frase.innerText = app.frases[i].texto;
                    frase.className = "fondo";
                    autor.appendChild(frase);
                  }
                }
              }
    }


});
$.getJSON('https://dataserverdaw.herokuapp.com/escritores', function (json) {
    var aux = json.escritores;
    console.log(aux);
    app.escritores=aux;
});

$.getJSON('https://dataserverdaw.herokuapp.com/escritores/frases', function (json) {
    var aux = json.frases;
    app.frases=aux;
});



