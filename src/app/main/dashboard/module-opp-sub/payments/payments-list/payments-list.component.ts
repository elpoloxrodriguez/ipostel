import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { IPOSTEL_DATA_EMPRESA_ID, IPOSTEL_U_PagosDeclaracionOPP_SUB, IPOSTEL_U_Status_Opp_Sub } from '@core/services/empresa/form-opp.service';
import { UtilService } from '@core/services/util/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from "jwt-decode";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { PdfService } from '@core/services/pdf/pdf.service';
import { AngularFileUploaderComponent } from 'angular-file-uploader';


@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;
  @ViewChild('fileUpload1')
  private fileUpload1: AngularFileUploaderComponent


  public chkBoxSelected = [];


  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public MontoTotalAdeudado : string = '0';
  public archivos = []
  public hashcontrol = ''
  public numControl: string = ''


  public ActualizarPago : IPOSTEL_U_PagosDeclaracionOPP_SUB = {
    status_pc: 0,
    fecha_pc: '',
    id_banco_pc: undefined,
    referencia_bancaria: '',
    monto_pc: '',
    monto_pagar: '',
    dolar_dia: '',
    petro_dia: '',
    archivo_adjunto: '',
    observacion_pc: '',
    user_created: 0,
    user_updated: 0,
    id_pc: 0
  }
  
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;

  public idOPP
  public RowsLengthConciliacion
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selected = [];

  public title_modal
  public ShowReportarPago = false
  public ShowModificarPago = false
  public monto_pagarX
  public monto_pagar_muestra

  public ShowMontoCero

  public SelectionType = SelectionType;

  public MantenimientoYSeguridad = []
  
  public  MontoRealPagar
  public token
  public n_opp = 0
  public rowsPagosConciliacion
  public tempDataPagosConciliacion = []
  public List_Pagos_Recaudacion = []
  public TipoRegistro

  public SelectBancos = []
  public NombreBancoEmisor

  public MontoMantenimiento = []
  public DolarPetroDia = []

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private router: Router,
    private pdf: PdfService,
  ) { }

  async ngOnInit() {
    // this.sectionBlockUI.start('Registrando Pago, Porfavor Espere!!!');
    // setTimeout(() => this.sectionBlockUI.stop(), 3000)
    this.token = jwt_decode(sessionStorage.getItem('token'));
    this.idOPP = this.token.Usuario[0].id_opp
    await this.ListaPagosRecaudacion()
    await this. ListaBancosVzla()
    await this.ListaMantenimientoSeguidad()
    this.MantenimientoSIRPVEN()
    this.Precio_Dolar_Petro()
  }

  async ListaBancosVzla() {
    this.xAPI.funcion = "IPOSTEL_R_BancosVzla"
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.SelectBancos = data.Cuerpo.map(e => {
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    for (let i = 0; i < selected.length; i++) {
      const element = selected[i];
      console.log("Total: ", element.montoReal)
    }
  }
  onActivate(event) {
    // console.log('Activate Event', event);
  }
  
  fileSelected(e) {
    this.archivos.push(e.target.files[0])
  }

   subirArchivo(e) {
    this.sectionBlockUI.start('Subiendo Archivo, Porfavor Espere!!!');
    this.token = jwt_decode(sessionStorage.getItem('token'));
    // this.DocAdjunto.nombre = this.archivos[0].name
    // this.DocAdjunto.usuario = this.token.Usuario[0].id_opp
    // this.DocAdjunto.empresa = this.token.Usuario[0].id_opp
    // this.DocAdjunto.numc = this.numControl
    // this.DocAdjunto.tipo = parseInt(this.TipoDocument)
    // this.DocAdjunto.vencimiento = this.datetime1.year+'-'+this.datetime1.month+'-'+this.datetime1.day 
    var frm = new FormData(document.forms.namedItem("forma"))
    // console.log(frm)
    try {
       this.apiService.EnviarArchivos(frm).subscribe(
        (data) => {
          // this.rowsDocumentosAdjuntosEmpresa.push(this.EmpresaDocumentosAdjuntos)
          this.xAPI.funcion = 'IPOSTEL_I_ArchivoDigital'
          this.xAPI.parametros = ''
          // this.xAPI.valores = JSON.stringify(this.DocAdjunto)
          this.apiService.Ejecutar(this.xAPI).subscribe(
            (xdata) => {
              if (xdata.tipo == 1) {
                // this.EmpresaDocumentosAdjuntos = []
                // this.DocumentosAdjuntosOPPSUB()    
                this.utilService.alertConfirmMini('success', 'Tu archivo ha sido cargado con exito')
                this.modalService.dismissAll('Cerrar Modal')
                 this.sectionBlockUI.stop();
              } else {
                this.utilService.alertConfirmMini('info', xdata.msj)
                this.sectionBlockUI.stop();
              }
            },
            (error) => {
              this.utilService.alertConfirmMini('error', error)
              this.sectionBlockUI.stop();
            }
          )
        }
      )
    } catch (error) {
      this.utilService.alertConfirmMini('error', error)
      this.sectionBlockUI.stop();
    }

  }

  async CapturarNav(event) {
    switch (event.target.id) {
      case 'ngb-nav-0':
        this.List_Pagos_Recaudacion = []
        this.n_opp = 0
        await this.ListaPagosRecaudacion()
        break;
      case 'ngb-nav-1':
        this.List_Pagos_Recaudacion = []
        this.n_opp = 2
        await this.ListaPagosRecaudacion()
        break;
        case 'ngb-nav-2':
          this.List_Pagos_Recaudacion = []
          this.n_opp = 3
          await this.ListaPagosRecaudacion()
          break;
          case 'ngb-nav-3':
            this.List_Pagos_Recaudacion = []
            this.n_opp = 1
            await this.ListaPagosRecaudacion()
            break;
      default:
        break;
    }
  }

  async ListaPagosRecaudacion() {
    this.List_Pagos_Recaudacion = []
    this.xAPI.funcion = "IPOSTEL_R_Pagos_Conciliacion_IDOPP"
    this.xAPI.parametros = this.idOPP+','+this.n_opp
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        data.Cuerpo.map(e => {
          e.montoReal = e.monto_pagar
          e.monto_pcx = e.monto_pc
          this.MontoRealPagar = e.monto_pagar
          e.monto_pc = this.utilService.ConvertirMoneda(e.monto_pc)
          e.monto_pagar = this.utilService.ConvertirMoneda(e.monto_pagar)
          this.List_Pagos_Recaudacion.push(e)  
          // console.log(this.List_Pagos_Recaudacion)
        });
        let MontoTotalA =  this.List_Pagos_Recaudacion.map(item => item.montoReal).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
        this.MontoTotalAdeudado =  this.utilService.ConvertirMoneda(MontoTotalA)
        this.rowsPagosConciliacion = this.List_Pagos_Recaudacion
        this.RowsLengthConciliacion = this.rowsPagosConciliacion.length
        this.tempDataPagosConciliacion = this.rowsPagosConciliacion
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async ModalPagar(modal, data){
    this.token = jwt_decode(sessionStorage.getItem('token'));
    this.numControl = this.token.Usuario[0].rif
    this.hashcontrol = btoa("D" + this.numControl) //Cifrar documentos

    this.title_modal = 'Reportar Declaración de Pago'
    this.ShowReportarPago = true
    this.ShowModificarPago = false
    // console.log(data)
    this.ActualizarPago.status_pc = 0
    this.ActualizarPago.monto_pagar = data.montoReal
    this.monto_pagarX = data.monto_pagar
    this.monto_pagar_muestra = data.monto_pagar
    this.ActualizarPago.monto_pc = data.montoReal
    this.ActualizarPago.dolar_dia = data.dolar_dia
    this.ActualizarPago.petro_dia = data.petro_dia
    this.ActualizarPago.user_created = this.idOPP
    this.ActualizarPago.user_updated = this.idOPP
    this.ActualizarPago.id_pc = data.id_pc
    this.modalService.open(modal, {
      centered: true,
      size: 'lg',
      backdrop: false,
      keyboard: false,
      windowClass: 'fondo-modal',
    });
  }

  async ModalPagarModificar(modal, data){
    // console.log(data)
    this.title_modal = 'Modificar Declaración de Pago'
    this.ShowReportarPago = false
    this.ShowModificarPago = true
    this.ActualizarPago.status_pc = 0
    this.ActualizarPago.monto_pagar = data.montoReal
    this.monto_pagarX = data.monto_pagar
    this.ActualizarPago.monto_pc = data.montoReal
    this.ActualizarPago.fecha_pc = data.fecha_pc
    this.ActualizarPago.id_banco_pc = data.id_banco_pc
    this.ActualizarPago.referencia_bancaria = data.referencia_bancaria
    this.ActualizarPago.observacion_pc = data.observacion_pc
    this.ActualizarPago.dolar_dia = data.dolar_dia
    this.ActualizarPago.petro_dia = data.petro_dia
    this.ActualizarPago.archivo_adjunto = this.archivos[0].name
    this.ActualizarPago.user_created = this.idOPP
    this.ActualizarPago.user_updated = this.idOPP
    this.ActualizarPago.id_pc = data.id_pc
    this.modalService.open(modal, {
      centered: true,
      size: 'lg',
      backdrop: false,
      keyboard: false,
      windowClass: 'fondo-modal',
    });
  }

  async ModificarConciliarPagoRecaudacion(){
    this.xAPI.funcion = "IPOSTEL_U_PagosDeclaracionOPP_SUB"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.ActualizarPago)
    this.sectionBlockUI.start('Comprobando Pago, Porfavor Espere!!!');
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.rowsPagosConciliacion.push(this.List_Pagos_Recaudacion)
        if (data.tipo === 1) {
          this.List_Pagos_Recaudacion = []
          this.ListaPagosRecaudacion()
          this.modalService.dismissAll('Close')
          this.sectionBlockUI.stop()
          this.utilService.alertConfirmMini('success', 'Pago Modificado Exitosamente!')
        } else {
          this.sectionBlockUI.stop();
          this.utilService.alertConfirmMini('error', 'Algo salio mal! <br> Verifique e intente de nuevo')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async PagarRecaudacion(){
    // console.log(this.archivos[0].name)
    this.sectionBlockUI.start('Reportando Pago, Porfavor Espere!!!');
    this.ActualizarPago.archivo_adjunto = this.archivos[0].name
    var frm = new FormData(document.forms.namedItem("forma"))
    try {
      await this.apiService.EnviarArchivos(frm).subscribe(
        (data) => {
    this.xAPI.funcion = "IPOSTEL_U_PagosDeclaracionOPP_SUB"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.ActualizarPago)
    if (this.ActualizarPago.monto_pagar === this.ActualizarPago.monto_pc) {
       this.apiService.Ejecutar(this.xAPI).subscribe(
        (datax) => {
          this.rowsPagosConciliacion.push(this.List_Pagos_Recaudacion)
          if (datax.tipo === 1) {
            this.List_Pagos_Recaudacion = []
            this.ListaPagosRecaudacion()
            this.modalService.dismissAll('Close')
            this.sectionBlockUI.stop()
            this.utilService.alertConfirmMini('success', 'Reporte de Pago Registrado Exitosamente!')
          } else {
            this.sectionBlockUI.stop();
            this.utilService.alertConfirmMini('error', 'Algo salio mal! <br> Verifique e intente de nuevo')
          }
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      this.sectionBlockUI.stop();
      this.utilService.alertConfirmMini('warning', 'El Monto Pagado es Diferente al de la Factura Adeudada, Porfavor verifique e intente nuevamente')
    }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  MantenimientoSIRPVEN() {
    this.xAPI.funcion = "IPOSTEL_R_MantenimientoSIRPVEN";
    this.xAPI.parametros = '7'
     this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.MontoMantenimiento = data.Cuerpo.map(e => {
            return e
          });
      },
      (error) => {
        console.log(error)
      }
    )
  }

   Precio_Dolar_Petro() {
    this.xAPI.funcion = "IPOSTEL_R_PRECIO_PETRO_DOLAR";
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
      this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.DolarPetroDia = data.Cuerpo.map(e => {
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async ListaMantenimientoSeguidad() {
    this.xAPI.funcion = "IPOSTEL_R_MantenimientoSeguridad"
    this.xAPI.parametros = '1'
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.MantenimientoYSeguridad = data.Cuerpo.map(e => {
          return e
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async DescargarFactura(data: any){
    this.sectionBlockUI.start('Generando Factura, Porfavor Espere!!!');
    this.xAPI.funcion = "IPOSTEL_R_GenerarPlanillaAutoliquidacion"
    this.xAPI.parametros = data.id_opp+','+data.id_pc
    this.xAPI.valores = ''
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        let datos = data.Cuerpo.map(e => {
          e.ListaFranqueo = JSON.parse(e.ListaFranqueo)
          e.ListaFacturas = JSON.parse(e.ListaFacturas)
          this.sectionBlockUI.stop()
          this.utilService.alertConfirmMini('success', 'Factura Generada Exitosamente!')
          return e
        });
        this.pdf.GenerarFactura(datos, this.MantenimientoYSeguridad)
      },
      (error) => {
        console.log(error)
      }
    )

  }

  filterUpdatePagos(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.tempDataPagosConciliacion.filter(function (d) {
      return d.nombre_empresa.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // Update The Rows
    this.rowsPagosConciliacion = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  filterUpdatePagosNoLiquidados(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // Filter Our Data
    const temp = this.tempDataPagosConciliacion.filter(function (d) {
      return d.nombre_empresa.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // Update The Rows
    this.rowsPagosConciliacion = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

}

