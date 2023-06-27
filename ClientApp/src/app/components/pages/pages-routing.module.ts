import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistorialventaComponent } from './historialventa/historialventa.component';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VenderComponent } from './vender/vender.component';
import { ApiProductosService } from 'src/app/services/api-productos.service';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path:'dashboard',component:DashboardComponent},
      {path:'usuarios',component:UsuariosComponent},
      {path:'productos',component:ProductosComponent},
      {path:'vender',component:VenderComponent},
      {path:'historialventas',component:HistorialventaComponent},
      {path:'reportes',component:ReportesComponent}
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule implements OnInit { 

  data : any[] =[];

  constructor(private apiProductosService: ApiProductosService){}

  ngOnInit(): void {
    this.llenarData();
    
  }

  llenarData(){

    this.apiProductosService.getData().subscribe( data=> {
      this.data = data;
      console.log(this.data);
    })


  }
}
