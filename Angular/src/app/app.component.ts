import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

var frases: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpService: HttpClient) { }
  escritores: any;

  ngOnInit() {

    this.httpService.get<any>('https://dataserverdaw.herokuapp.com/escritores').subscribe(
      data => {

        this.escritores = data.escritores;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


    this.httpService.get<any>('https://dataserverdaw.herokuapp.com/escritores/frases').subscribe(
      data => {
        frases = data.frases;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


  }

  mostrar_frase(id: any) {
    let autor = document.getElementById(id);
    let aux=document.getElementsByClassName("titulo");
     for (var i = aux.length - 1; i >= 0; --i) {
      aux[i].className="autor";
    }
    let titulo = document.getElementById(id + "_" + id);
    titulo.className = "titulo autor";

    let p_remove = document.getElementsByTagName("p");
    for (var i = p_remove.length - 1; i >= 0; --i) {
      p_remove[i].remove();
    }

    for (let i = 0; i < frases.length; i++) {
      if (frases[i].id_autor == id) {
        let frase = document.createElement("p");
        frase.innerText = frases[i].texto;
        frase.className = "fondo";
        autor.appendChild(frase);
      }
    }
  }



}
