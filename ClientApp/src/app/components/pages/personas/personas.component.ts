import { Component, OnInit } from '@angular/core';
import { ApiInfoLocalService } from '../../../services/api-info-local.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  sucursales: string[] = [];
  contadorPersonas: { [key: string]: number } = {};

  constructor(private apiService: ApiInfoLocalService) { }

  ngOnInit() {
    this.recuperarContadores();
  }

  recuperarContadores() {
    this.apiService.getData().subscribe((data) => {
      if (data && data.sucursales) {
        this.sucursales = data.sucursales;
        this.sucursales.forEach((sucursal) => {
          const contador = localStorage.getItem(sucursal);
          if (contador) {
            this.contadorPersonas[sucursal] = parseInt(contador, 10);
          } else {
            this.contadorPersonas[sucursal] = 0;
          }
        });
      }
    });
  }

  incrementarContador(sucursal: string) {
    this.contadorPersonas[sucursal]++;
    this.guardarContador(sucursal);
  }

  decrementarContador(sucursal: string) {
    if (this.contadorPersonas[sucursal] > 0) {
      this.contadorPersonas[sucursal]--;
      this.guardarContador(sucursal);
    }
  }

  guardarContador(sucursal: string) {
    localStorage.setItem(sucursal, this.contadorPersonas[sucursal].toString());
  }
}
