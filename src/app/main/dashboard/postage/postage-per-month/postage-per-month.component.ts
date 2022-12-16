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

  public mesEncode64 = btoa(this.anio+'-'+this.mes)
  public mesDecode64 = this.anio+'-'+this.mes

  public contentHeader: object;
  public copyCodeStatus: boolean = false;
  public searchText;
  public data = []

  // Private

  constructor() { }

  async ngOnInit() {
    await this.SeleccionarMes(event)

    var mesActual = new Date().getMonth()
    var meses = [
    { name: "ENERO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64}, 
    { name: "FEBRERO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "MARZO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "ABRIL", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "MAYO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "JUNIO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "JULO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "AGOSTO", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "SEPTIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "OCTUBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "NOVIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64},
    { name: "DICIEMBRE", fecha: this.anio, concepto: 'Declaraciones de Movilización de Piezas', mes: this.mesEncode64}
    ]

    for (let i = 0; i <= mesActual; i++) {
     this.data.push(meses[i])
    }


  }

  async SeleccionarMes(dat: any) {
    console.log(dat)
  }

}
