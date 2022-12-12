import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { IPOSTEL_DATA_EMPRESA_ID, IPOSTEL_U_Status_Opp_Sub } from '@core/services/empresa/form-opp.service';
import { UtilService } from '@core/services/util/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from "jwt-decode";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
  styleUrls: ['./subcontractor.component.scss']
})
export class SubcontractorComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;

  
  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public CambiarStatus  : IPOSTEL_U_Status_Opp_Sub = {
    id_opp: 0,
    status_empresa: null,
    observacion: ''
  }

  public items = 
    { 
      id_opp : undefined, 
      nombre_empresa : undefined, 
      rif : undefined, 
      nombre_tipologia : undefined, 
      correo_electronico : undefined, 
      status_empresa : undefined, 
      observacion : undefined, 
      actividades_economicas_seniat : undefined, 
      cantidad_subcontratados : undefined, 
      cantidad_trabajadores : undefined, 
      certificado_eomic : undefined, 
      certificado_rupdae : undefined, 
      ciudad_empresa : undefined, 
      direccion_empresa : undefined, 
      empresa_facebook : undefined, 
      empresa_instagram : undefined, 
      empresa_twitter : undefined, 
      especificacion_servicio : undefined, 
      estado_empresa : undefined, 
      flota_utilizada : undefined, 
      id_tipologia : undefined, 
      identificacion_laboral_ministerio_trabajo : undefined, 
      licencia_actividades_economicas_municipales : undefined, 
      matricula_inces : undefined, 
      municipio_empresa : undefined, 
      opp : undefined, 
      parroquia_empresa : undefined, 
      password : undefined, 
      patronal_ivss : undefined, 
      permiso_bomberos : undefined, 
      registro_nacional_contratista : undefined, 
      registro_sapi : undefined, 
      role : undefined, 
      subcontrataciones : undefined, 
      sucursales : undefined, 
      tipo_agencia : undefined, 
      tipo_registro : undefined, 
      tipo_servicio : undefined, 
      tipologia_empresa : undefined, 
    }

  public Subcontratista = []
  public token
  public TipoRegistro
  public IdOPP
  public CargarSub

  public SelectStatusSubcontratista = [
    { id: 0, name: 'En Espera'},
    { id: 1, name: 'Aprobado'},
    { id: 2, name: 'Rechazado'}
  ]

  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public rowsSubcontratistas
  public tempDataSubcontratas = []

  public TitleModal

  public item = []
  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.token = jwt_decode(sessionStorage.getItem('token'));
    this.TipoRegistro = this.token.Usuario[0].tipo_registro
    this.IdOPP = this.token.Usuario[0].id_opp
    this.CargarSub = await this.Subcontratistas(this.IdOPP)

  }


  async Subcontratistas(id: any){
    this.xAPI.funcion = "IPOSTEL_R_Subcontratista_ID"
    this.xAPI.parametros = id
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
             data.Cuerpo.map(e => {
              if (e.tipo_registro == '1') {
                e.tipo_registro = 'Oficina Postal Privada'
              } else {
                e.tipo_registro = 'Subcontratista'
              }
              this.Subcontratista.push(e)
        });
        this.rowsSubcontratistas = this.Subcontratista;
        this.tempDataSubcontratas = this.rowsSubcontratistas
      },
      (error) => {
        console.log(error)
      }
    )
  }


async filterUpdateSubcontratistas(event) {
      // Reset ng-select on search
      const val = event.target.value.toLowerCase();
      // Filter Our Data
      const temp = this.tempDataSubcontratas.filter(function (d) {
        return d.nombre_empresa.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // Update The Rows
      this.rowsSubcontratistas = temp;
      // Whenever The Filter Changes, Always Go Back To The First Page
      this.table.offset = 0;
    }

  async RegistrarCambiarStatus(){
    this.xAPI.funcion = "IPOSTEL_U_Status_Opp_Sub"
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.CambiarStatus)
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.sectionBlockUI.start('Cambiando Status, Porfavor Espere!!!');
        this.rowsSubcontratistas.push({})      
        if (data.tipo === 1) {    
          this.Subcontratista = []
          this.Subcontratistas(this.IdOPP)
          this.modalService.dismissAll('Close')
          this.sectionBlockUI.stop()
          this.utilService.alertConfirmMini('success', 'Status Cambiado Exitosamente!')
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

  async CambiarStatusSubcontratista(modal,data){
    this.CambiarStatus.id_opp = data.id_opp
    this.TitleModal = data.nombre_empresa
    this.modalService.open(modal, {
      centered: true,
      size: 'lg',
      backdrop: false,
      keyboard: false,
      windowClass: 'fondo-modal',
    });
    }


}
