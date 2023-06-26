import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/interfaces/rol';



@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackbar:MatSnackBar  ) {}


  obtenerSesionUsuario(){
    const dataCadena=localStorage.getItem("usuario")
    const usuario=JSON.parse(dataCadena!)
    return usuario

  }
  }

  