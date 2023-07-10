import { Component, OnInit } from '@angular/core';
import { ApiInfoLocalService } from '../../../services/api-info-local.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  sucursales: { id: number, nombre: string, valor: number, capacidad: number }[] = [];
  contadorPersonas: { [key: string]: number } = {};
  apiStatus: string = '';

  constructor(private apiService: ApiInfoLocalService, private http: HttpClient) { }

  ngOnInit() {
    this.obtenerInformacionAPI();
    this.actualizarDatosPeriodicamente();
  }

  obtenerInformacionAPI() {
    this.apiService.getData().subscribe(
      (data) => {
        const sucursalKeys = Object.keys(data);
        this.sucursales = sucursalKeys.map(key => {
          const sucursal = data[key];
          return {
            id: sucursal.id,
            nombre: `${sucursal.nombre} - ${sucursal.ubicacion}`,
            valor: sucursal.cantidad,
            capacidad: sucursal.capacidad
          };
        });
        for (const sucursal of this.sucursales) {
          this.contadorPersonas[sucursal.nombre] = 0;
        }
        this.apiStatus = 'Conexión exitosa con la API';
        console.log('Conexión exitosa con la API:', data);
      },
      (error) => {
        this.apiStatus = 'Error al conectar con la API';
        console.error('Error al conectar con la API:', error);
      }
    );
  }

  incrementarContador(sucursal: string) {
    this.contadorPersonas[sucursal]++;
    this.actualizarContadorAPI(sucursal);
  }

  decrementarContador(sucursal: string) {
    if (this.contadorPersonas[sucursal] > 0) {
      this.contadorPersonas[sucursal]--;
      this.actualizarContadorAPI(sucursal);
    }
  }

  guardarContador(sucursal: string) {
    localStorage.setItem(sucursal, this.contadorPersonas[sucursal].toString());
  }

  generarJsonContador() {
    const datosContador: { id: number, nombre: string, cantidad: number, capacidad: number }[] = [];

    for (const sucursal of Object.keys(this.contadorPersonas)) {
      datosContador.push({
        id: this.sucursales.find(s => s.nombre === sucursal)?.id || 0,
        nombre: sucursal,
        cantidad: this.contadorPersonas[sucursal],
        capacidad: this.sucursales.find(s => s.nombre === sucursal)?.capacidad || 0
      });
    }

    return JSON.stringify(datosContador);
  }

  actualizarArchivo() {
    const jsonData = this.generarJsonContador();
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Generar un nombre de archivo único basado en la fecha y hora actual
    const currentDate = new Date();
    const fileName = `contador-personas_${currentDate.toISOString()}.json`;
    saveAs(blob, fileName);
  }

  actualizarContadorAPI(sucursal: string) {
    const jsonData = this.generarJsonContador();
    this.http.post('https://sponge-faithful-hickory.glitch.me/', jsonData).subscribe(
      (response) => {
        this.apiStatus = 'Contador actualizado en el servidor';
        console.log('Contador actualizado en el servidor:', response);
      },
      (error) => {
        this.apiStatus = 'Error al actualizar el API';
        console.error('Error al actualizar el API:', error);
      }
    );
  }

  actualizarDatosPeriodicamente() {
    setInterval(() => {
      this.actualizarArchivo();
    }, 10 * 60 * 1000); // Descargar el archivo cada 10 minutos
  }
}
