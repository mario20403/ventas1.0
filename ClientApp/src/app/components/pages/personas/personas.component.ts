import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  sucursales: string[] = ['Sucursal 1', 'Sucursal 2', 'Sucursal 3', 'Sucursal 4'];
  contadorPersonas: { [key: string]: number } = {};

  constructor() { }

  ngOnInit() {
    this.recuperarContadores();
  }

  recuperarContadores() {
    for (const sucursal of this.sucursales) {
      const contador = localStorage.getItem(sucursal);
      if (contador) {
        this.contadorPersonas[sucursal] = parseInt(contador, 10);
      } else {
        this.contadorPersonas[sucursal] = 0;
      }
    }
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
