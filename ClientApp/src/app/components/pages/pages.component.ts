import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { MenuServiceService } from 'src/app/services/menu.service.service';
import { UtilidadService } from '../reusable/utilidad.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  listamenus:Menu[] =[];
  correousuario:string='';
  rolUsuario:string='';



  constructor(
    private router:Router,
    private _menuServicio:MenuServiceService,
    private _utilidadServicio:UtilidadService
  ) { }


  ngOnInit(): void {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    if(usuario!=null){
      this.correousuario =usuario.correo;
      this.rolUsuario= usuario.rolDescripcion;
      }
      
    }


  }


