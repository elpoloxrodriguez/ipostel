import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiService, DocumentoAdjunto, IAPICore } from '@core/services/apicore/api.service';
import { Router } from '@angular/router';
import { UtilService } from '@core/services/util/util.service';
import { NgbModal, NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import jwt_decode from "jwt-decode";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IPOSTEL_C_MovilizacionPiezas } from '@core/services/empresa/form-opp.service';

export const repeaterAnimation = trigger('heightIn', [
  transition(':enter', [
    style({ opacity: '0', height: '0px' }),
    animate('.2s ease-out', style({ opacity: '1', height: '*' }))
  ])
]);

@Component({
  selector: 'app-statement-of-parties',
  templateUrl: './statement-of-parties.component.html',
  styleUrls: ['./statement-of-parties.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal],
  animations: [repeaterAnimation]
})
export class StatementOfPartiesComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };
  
  public InsertarMovilizacionPiezas : IPOSTEL_C_MovilizacionPiezas = {
    id_opp: 0,
    id_servicio_franqueo: 0,
    id_peso_envio: 0,
    tarifa_servicio: '',
    porcentaje_tarifa: 0,
    monto_fpo: '',
    mes: '',
    cantidad_piezas: 0,
    monto_causado: '',
    user_created: 0
  }

  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';

  public token
  public idOPP
  public fechax
  public fecha = new Date();
  public mes = this.fecha.getMonth() + 1;
  public anio = this.fecha.getFullYear();

  public montoIVA = 16
  public montoTASA
  public montoTASAnombre
  public ServicioFranqueoID = 1

  public DeclaracionPiezas = []
  public rowsDeclaracionPiezas
  public tempDataDeclaracionPiezas = []
  
  public itemsSelectPesoEnvio = []
  public itemsSelectTipoServicio = []
  public items = [];
  public item = {
    id_opp: '', // ID DE LA OPP
    id_servicio_franqueo: '', // ID DEL TIPO DE SERVICIO DE FRANQUEO
    id_peso_envio: '', // ID TIPO DE PESO DE ENVIO
    tarifa_servicio: '', // MONTO DEL PESO DE ENVIO 
    porcentaje_tarifa: '', // PORCENTAJE DE TARIFA SEGUN TIPOLOGIA_EMPRESA
    monto_fpo: '', // MONTO DE FPD
    mes: '', // MES DE DECLARACION
    cantidad_piezas: '', // CANTIDAD DE PIEZAS DECLARADAS
    monto_causado : '', // MONTO TOTAL A PAGAR
    user_created: ''
};

  public rowsUtilidadCierreFiscal = []

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.token = jwt_decode(sessionStorage.getItem('token'));
    this.idOPP = this.token.Usuario[0].id_opp
    await this.TasaPostal(this.token.Usuario[0].tipologia_empresa, this.idOPP)
    await this.ListaServicioFranqueo()
    await this.ListaDeclaracionMovilizacionPiezas()
    // this.sectionBlockUI.start('Registrando Movilización de Piezas, Porfavor Espere!!!');
    // setTimeout(() => this.sectionBlockUI.stop(), 3000)
  }

  filterUpdate(event) {

  }


  async TasaPostal(tipologia, id_opp){
    this.xAPI.funcion = "IPOSTEL_R_TasaPostal"
    this.xAPI.parametros = tipologia+','+id_opp
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        data.Cuerpo.map(e => {
          this.montoTASA = e.tasa_postal
          this.montoTASAnombre = e.nombre_tasa_postal
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  addItem() {
    this.items.push({
      id_opp: this.idOPP, // ID DE LA OPP
      id_servicio_franqueo: null, // ID DEL TIPO DE SERVICIO DE FRANQUEO
      id_peso_envio: null, // ID TIPO DE PESO DE ENVIO
      tarifa_servicio: null, // MONTO DEL PESO DE ENVIO 
      porcentaje_tarifa: null, // PORCENTAJE DE TARIFA SEGUN TIPOLOGIA_EMPRESA
      monto_fpo: null, // MONTO DE FPD
      mes: null, // MES DE DECLARACION
      cantidad_piezas: null, // CANTIDAD DE PIEZAS DECLARADAS
      monto_causado : null, // MONTO TOTAL A PAGAR
      user_created: this.idOPP
    });
  }
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  async RegistrarDeclaracionPiezas(){
    let valor = this.items
    for (let i = 0; i < valor.length; i++) {
      const element = valor[i];
    this.InsertarMovilizacionPiezas.id_opp = this.idOPP
     this.InsertarMovilizacionPiezas.id_servicio_franqueo = element.id_servicio_franqueo
     this.InsertarMovilizacionPiezas.id_peso_envio = element.id_peso_envio
     this.InsertarMovilizacionPiezas.tarifa_servicio = element.tarifa_servicio
     this.InsertarMovilizacionPiezas.porcentaje_tarifa = parseInt(this.montoTASA)
     const MontoFPO =  this.InsertarMovilizacionPiezas.tarifa_servicio *  this.InsertarMovilizacionPiezas.porcentaje_tarifa / 100
     this.InsertarMovilizacionPiezas.monto_fpo = parseFloat(MontoFPO.toFixed(2))
     this.InsertarMovilizacionPiezas.mes = this.fechax
     this.InsertarMovilizacionPiezas.cantidad_piezas = element.cantidad_piezas 
     const MontoCusado =  this.InsertarMovilizacionPiezas.monto_fpo * element.cantidad_piezas
     this.InsertarMovilizacionPiezas.monto_causado = parseFloat(MontoCusado.toFixed(2))
    this.InsertarMovilizacionPiezas.user_created = this.idOPP
    this.xAPI.funcion = 'IPOSTEL_C_MovilizacionPiezas'
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.InsertarMovilizacionPiezas)
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.sectionBlockUI.start('Guardando Declaración de Piezas, Porfavor Espere!!!');
        this.rowsDeclaracionPiezas.push(this.DeclaracionPiezas)
        if (data.tipo === 1) {
          this.DeclaracionPiezas = []
          this.ListaDeclaracionMovilizacionPiezas()
          this.modalService.dismissAll('Close')
          this.sectionBlockUI.stop()
          this.utilService.alertConfirmMini('success', 'Declaración Registrada Exitosamente!')
        } else {
          this.sectionBlockUI.stop();
          this.utilService.alertConfirmMini('error', 'Algo salio mal! <br> Verifique e intente de nuevo')
        }
      },
      (error) => {
        console.error(error)
      }
    )
    }
  }

  async ListaPesoEnvio(id: any) {
    if (id != null || this.fechax != '') {
      this.xAPI.funcion = "IPOSTEL_R_ListarTablaPesoEnvio_ID"
    this.xAPI.parametros = id+','+this.fechax
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.itemsSelectPesoEnvio = data.Cuerpo.map(e => {
          e.name = e.nombre_peso_envio +' ('+this.utilService.ConvertirMoneda(e.total_pagar)+')'
          e.id = e.id_peso_envio
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
    } else {
      this.itemsSelectPesoEnvio = []
    }
  }

  async CapturarNav(event) {
    switch (event.target.id) {
      case 'ngb-nav-0':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 1
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      case 'ngb-nav-1':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 2
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      case 'ngb-nav-2':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 3
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      case 'ngb-nav-3':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 4
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      case 'ngb-nav-4':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 5
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      case 'ngb-nav-5':
        this.DeclaracionPiezas = []
        this.ServicioFranqueoID = 6
        await this.ListaDeclaracionMovilizacionPiezas()
        break;
      default:
        break;
    }
  }

  async ListaDeclaracionMovilizacionPiezas() {
    const date = this.anio + '-' + this.mes
    const id = this.ServicioFranqueoID
    this.xAPI.funcion = "IPOSTEL_R_MovilizacionPiezas_date_id"
    this.xAPI.parametros = this.idOPP + ',' + date  + ',' + id
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        data.Cuerpo.map(e => {
          e.tarifa_servicio = this.utilService.ConvertirMoneda(e.tarifa_servicio);
          e.monto_fpo = this.utilService.ConvertirMoneda(e.monto_fpo);
          e.monto_causado = this.utilService.ConvertirMoneda(e.monto_causado);
          this.DeclaracionPiezas.push(e)
        });
        this.rowsDeclaracionPiezas = this.DeclaracionPiezas;
        this.tempDataDeclaracionPiezas = this.rowsDeclaracionPiezas
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async ListaServicioFranqueo() {
    this.xAPI.funcion = "IPOSTEL_R_ServicioFranqueo";
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.itemsSelectTipoServicio = data.Cuerpo.map(e => {
          e.name = e.nombre_servicios_franqueo
          e.id = e.id_servicios_franqueo
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  AddMovilizacionPiezas(modal){
    this.modalService.open(modal, {
      centered: true,
      size: 'xl',
      backdrop: false,
      keyboard: false,
      windowClass: 'fondo-modal',
    });
    this.fechax = ''
    this.items.splice(0);
    // this.items.push([{
    //   id_opp: this.idOPP, // ID DE LA OPP
    //   id_servicio_franqueo: '', // ID DEL TIPO DE SERVICIO DE FRANQUEO
    //   id_peso_envio: '', // ID TIPO DE PESO DE ENVIO
    //   tarifa_servicio: '', // MONTO DEL PESO DE ENVIO 
    //   porcentaje_tarifa: '', // PORCENTAJE DE TARIFA SEGUN TIPOLOGIA_EMPRESA
    //   monto_fpo: '', // MONTO DE FPD
    //   mes: '', // MES DE DECLARACION
    //   cantidad_piezas: '', // CANTIDAD DE PIEZAS DECLARADAS
    //   monto_causado : '', // MONTO TOTAL A PAGAR
    //   user_created: this.idOPP
    // }]);
  }

  async DeletePiezas(data: any) {
    await Swal.fire({
      title: 'Esta Seguro?',
      text: "De Eliminar Este Registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.xAPI.funcion = "IPOSTEL_D_DeclaracionPiezas";
        this.xAPI.parametros = data.id_movilizacion_piezas
        this.xAPI.valores = ''
        this.apiService.Ejecutar(this.xAPI).subscribe(
          (data) => {
            this.rowsDeclaracionPiezas.push(this.DeclaracionPiezas)
            if (data.tipo === 1) {
              this.utilService.alertConfirmMini('success', 'Registro Eliminado Exitosamente')
              this.DeclaracionPiezas = []
              this.ListaDeclaracionMovilizacionPiezas()
            } else {
              this.utilService.alertConfirmMini('error', 'Lo sentimos algo salio mal, intente de nuevo')
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }
    })
  }

}
