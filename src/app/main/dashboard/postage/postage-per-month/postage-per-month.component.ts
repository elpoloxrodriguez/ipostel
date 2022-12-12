import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { cloneDeep } from 'lodash';
import { GlobalConfig, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-postage-per-month',
  templateUrl: './postage-per-month.component.html',
  styleUrls: ['./postage-per-month.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostagePerMonthComponent implements OnInit {

  public fecha = new Date();
  public mes = this.fecha.getMonth() + 1;
  public anio = this.fecha.getFullYear();


  public contentHeader: object;
  public json = require('feather-icons/dist/icons.json');
  public copyCodeStatus: boolean = false;
  public searchText;
  public data = []

  // public datax = [
  //   {
  //     id: 1, 
  //     name: 'ENERO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+1
  //   },
  //   {
  //     id: 2, 
  //     name: 'FEBRERO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+2
  //   },
  //   {
  //     id: 3, 
  //     name: 'MARZO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+3
  //   },
  //   {
  //     id: 4, 
  //     name: 'ABRIL',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+4
  //   },
  //   {
  //     id: 5, 
  //     name: 'MARZO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+5
  //   },
  //   {
  //     id: 6, 
  //     name: 'JUNIO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+6
  //   },
  //   {
  //     id: 7, 
  //     name: 'JULIO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+7
  //   },
  //   {
  //     id: 8, 
  //     name: 'AGOSTO',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+8
  //   },
  //   {
  //     id: 9, 
  //     name: 'SEPTIEMBRE',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+9
  //   },
  //   {
  //     id: 10, 
  //     name: 'OCTUBRE',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+10
  //   },
  //   {
  //     id: 11, 
  //     name: 'NOVIEMBRE',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+11
  //   },
  //   {
  //     id: 12, 
  //     name: 'DICIEMBRE',
  //     fecha: this.anio,
  //     concepto: 'Declaraciones de Movilización de Piezas',
  //     mes: this.anio+'-'+12
  //   },
  // ]

  // Private
  private options: GlobalConfig;

  constructor() { }

  async ngOnInit() {
    await this.SeleccionarMes(event)

    var mesActual = new Date().getMonth()
    var meses = [
    { name: "ENERO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',}, 
    { name: "FEBRERO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "MARZO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "ABRIL", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "MAYO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "JUNIO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "JULO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "AGOSTO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "SEPTIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "OCTUBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "NOVIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',},
    { name: "DICIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas',}
    ]

    for (let i = 0; i <= mesActual; i++) {
     this.data.push(meses[i])
    }

  }

  async SeleccionarMes(dat: any) {
    console.log(dat)
  }

}
