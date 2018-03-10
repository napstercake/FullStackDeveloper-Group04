import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { IUsuario } from 'app/i-usuario';

import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: IUsuario = {correo: "", contrasena: ""}
  mensajeError: string

  constructor(private auth: AuthService, private ruteador: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.auth.login(this.usuario)
      .subscribe(
        (data: IUsuario) => {
          localStorage.setItem("logueado", JSON.stringify(data))
          this.auth.cambioEstado.emit(true)
          this.ruteador.navigate(["home"])
        },
        (error: any) => {
          this.mensajeError = error.error.error
          //console.log(error)
        }
      )
    /*this.mensajeError= this.auth.login(this.usuario)

    if(this.mensajeError == "") {
      this.ruteador.navigate(["home"])
    } */

    // if(estado) document.location.href="/home"
  }

}
