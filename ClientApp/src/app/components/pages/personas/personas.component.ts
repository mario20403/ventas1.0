import { Component, OnInit } from '@angular/core';
import { ApiInfoLocalService } from '../../../services/api-info-local.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  sucursales: { id: string, nombre: string, ubicacion: string }[] = [];
  contadorPersonas: { [key: string]: number } = {};

  constructor(private apiService: ApiInfoLocalService, private http: HttpClient) { }

  ngOnInit() {
    this.obtenerInformacionAPI();
  }

  obtenerInformacionAPI() {
    this.apiService.getData().subscribe(
      (data) => {
        const sucursalKeys = Object.keys(data);
        this.sucursales = sucursalKeys.map(key => {
          const sucursal = data[key];
          return {
            id: key,
            nombre: `${sucursal.nombre} - ${sucursal.ubicacion}`,
            ubicacion: sucursal.ubicacion
          };
        });
        for (const sucursal of sucursalKeys) {
          this.contadorPersonas[sucursal] = 0;
        }
        console.log('Conexión exitosa con la API:', data);
      },
      (error) => {
        console.error('Error al conectar con la API:', error);
      }
    );
  }

  incrementarContador(sucursal: string) {
    this.contadorPersonas[sucursal]++;
    this.guardarContador(sucursal);
    this.actualizarApi();
  }

  decrementarContador(sucursal: string) {
    if (this.contadorPersonas[sucursal] > 0) {
      this.contadorPersonas[sucursal]--;
      this.guardarContador(sucursal);
      this.actualizarApi();
    }
  }

  guardarContador(sucursal: string) {
    localStorage.setItem(sucursal, this.contadorPersonas[sucursal].toString());
  }

  generarJsonContador() {
    const datosContador: { [key: string]: number } = {}; // Definir la firma de índice del objeto

    for (const sucursal of Object.keys(this.contadorPersonas)) {
      datosContador[sucursal] = this.contadorPersonas[sucursal];
    }

    return JSON.stringify(datosContador);
  }

  actualizarApi() {
    const jsonData = this.generarJsonContador();
    this.http.post('URL_DEL_API', jsonData).subscribe(
      (response) => {
        console.log('API actualizado exitosamente:', response);
      },
      (error) => {
        console.error('Error al actualizar el API:', error);
      }
    );
  }
}
