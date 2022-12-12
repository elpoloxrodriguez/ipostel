import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { IPOSTEL_DATA_DELEGADOP_ID, IPOSTEL_DATA_EMPRESA_ID, IPOSTEL_DATA_REPRESENTANTE_LEGAL_ID } from '@core/services/empresa/form-opp.service';
import { UtilService } from '@core/services/util/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from "jwt-decode";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-opp',
  templateUrl: './opp.component.html',
  styleUrls: ['./opp.component.scss']
})
export class OppComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;


  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

public DataEmpresa : IPOSTEL_DATA_EMPRESA_ID = {
  id_opp : undefined,
  nombre_empresa: undefined,
  rif: undefined,
  role: undefined,
  status_empresa: undefined,
  tipo_registro: undefined,
  opp: undefined,
  direccion_empresa: undefined,
  estado_empresa: undefined,
  ciudad_empresa: undefined,
  parroquia_empresa: undefined,
  correo_electronico: undefined,
  empresa_facebook: undefined,
  empresa_instagram: undefined,
  empresa_twitter: undefined,
  tipo_agencia: undefined,
  nombre_tipo_agencia: undefined,
  sucursales: undefined,
  subcontrataciones: undefined,
  tipologia_empresa: undefined,
  nombre_tipologia: undefined,
  tipo_servicio: undefined,
  especificacion_servicio: undefined,
  licencia_actividades_economicas_municipales: undefined,
  actividades_economicas_seniat: undefined,
  certificado_rupdae: undefined,
  patronal_ivss: undefined,
  matricula_inces: undefined,
  identificacion_laboral_ministerio_trabajo: undefined,
  certificado_eomic: undefined,
  permiso_bomberos: undefined,
  registro_sapi: undefined,
  registro_nacional_contratista: undefined,
  flota_utilizada: undefined,
  cantidad_trabajadores: undefined,
  cantidad_subcontratados: undefined
}

public DataRepresentanteLegal : IPOSTEL_DATA_REPRESENTANTE_LEGAL_ID = {
  apellidos_representante_legal: undefined,
  cargo_representante_legal: undefined,
  cedula_representante_legal: undefined,
  direccion_representante_legal: undefined,
  email_representante_legal: undefined,
  facebook_representante_legal: undefined,
  fecha_registro: undefined,
  id_opp: undefined,
  id_representante_legal: undefined,
  instagram_representante_legal: undefined,
  n_registro: undefined,
  nombres_representante_legal: undefined,
  telefono_movil_representante_legal: undefined,
  telefono_residencial_representante_legal: undefined,
  tomo: undefined,
  twitter_representante_legal: undefined
}

public DataDelegado : IPOSTEL_DATA_DELEGADOP_ID = {
  apellidos_delegado: undefined,
  cargo_delegado: undefined,
  cedula_delegado: undefined,
  email_delegado: undefined,
  facebook_delegado: undefined,
  id_delegado: undefined,
  id_opp: undefined,
  instagram_delegado: undefined,
  nombres_delegado: undefined,
  telefono_delegado: undefined,
  twitter_delegado: undefined
}
  
  public Subcontratista = []
  public token
  public TipoRegistro
  public IdOPP

  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public rowsSubcontratistas
  public tempDataSubcontratas = []


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
    await this.EmpresaOPP(this.IdOPP)
    await this.Subcontratistas(this.IdOPP)
    await this.RepresentanteLegal(this.IdOPP)
    await this.Delegado(this.IdOPP)
  }

  async EmpresaOPP(id: any){
    this.xAPI.funcion = "IPOSTEL_R_OPP_ID"
    this.xAPI.parametros = id
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
             data.Cuerpo.map(e => {
              this.DataEmpresa.id_opp = e.id_opp
              this.DataEmpresa.nombre_empresa = e.nombre_empresa
              this.DataEmpresa.rif = e.rif
               this.DataEmpresa.role = e.role
               this.DataEmpresa.status_empresa = e.status_empresa
               if (e.tipo_registro == '1') {
                this.DataEmpresa.tipo_registro = 'Oficina Postal Privada'
               } else {
                this.DataEmpresa.tipo_registro = 'Subcontratista'
               }
               this.DataEmpresa.opp  = e.opp
               this.DataEmpresa.direccion_empresa  = e.direccion_empresa
               this.DataEmpresa.estado_empresa  = e.estado_empresa
               this.DataEmpresa.ciudad_empresa  = e.ciudad_empresa
               this.DataEmpresa.parroquia_empresa  = e.parroquia_empresa
               this.DataEmpresa.correo_electronico  = e.correo_electronico
               this.DataEmpresa.empresa_facebook  = e.empresa_facebook
               this.DataEmpresa.empresa_instagram  = e.empresa_instagram
               this.DataEmpresa.empresa_twitter  = e.empresa_twitter
               this.DataEmpresa.tipo_agencia  = e.tipo_agencia
               this.DataEmpresa.nombre_tipo_agencia  = e.nombre_tipo_agencia
               this.DataEmpresa.sucursales  = e.sucursales
               this.DataEmpresa.subcontrataciones  = e.subcontrataciones
               this.DataEmpresa.tipologia_empresa  = e.tipologia_empresa
              this.DataEmpresa.nombre_tipologia  = e.nombre_tipologia
               this.DataEmpresa.tipo_servicio = JSON.parse(e.tipo_servicio)
               this.DataEmpresa.especificacion_servicio = e.especificacion_servicio
               this.DataEmpresa.licencia_actividades_economicas_municipales = e.licencia_actividades_economicas_municipales
               this.DataEmpresa.actividades_economicas_seniat = e.actividades_economicas_seniat
               this.DataEmpresa.certificado_rupdae = e.certificado_rupdae
               this.DataEmpresa.patronal_ivss = e.patronal_ivss
               this.DataEmpresa.matricula_inces = e.matricula_inces
               this.DataEmpresa.identificacion_laboral_ministerio_trabajo = e.identificacion_laboral_ministerio_trabajo
               this.DataEmpresa.certificado_eomic = e.certificado_eomic
               this.DataEmpresa.permiso_bomberos = e.permiso_bomberos
               this.DataEmpresa.registro_sapi = e.registro_sapi
               this.DataEmpresa.registro_nacional_contratista = e.registro_nacional_contratista
               this.DataEmpresa.flota_utilizada = JSON.parse(e.flota_utilizada)
               this.DataEmpresa.cantidad_trabajadores = e.cantidad_trabajadores
               this.DataEmpresa.cantidad_subcontratados = e.cantidad_subcontratados
        });   
      },
      (error) => {
        console.log(error)
      }
    )
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

  async RepresentanteLegal(id: any){
    this.xAPI.funcion = "IPOSTEL_R_RepresentanteLegal_ID"
    this.xAPI.parametros = id
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
             data.Cuerpo.map(e => {
              this.DataRepresentanteLegal.apellidos_representante_legal = e.apellidos_representante_legal
              this.DataRepresentanteLegal.cargo_representante_legal = e.cargo_representante_legal
              this.DataRepresentanteLegal.cedula_representante_legal = e.cedula_representante_legal
              this.DataRepresentanteLegal.direccion_representante_legal = e.direccion_representante_legal
              this.DataRepresentanteLegal.email_representante_legal = e.email_representante_legal
              this.DataRepresentanteLegal.facebook_representante_legal = e.facebook_representante_legal
              this.DataRepresentanteLegal.fecha_registro = this.utilService.FechaMomentL(e.fecha_registro)
              this.DataRepresentanteLegal.id_opp = e.id_opp
              this.DataRepresentanteLegal.id_representante_legal = e.id_representante_legal
              this.DataRepresentanteLegal.instagram_representante_legal = e.instagram_representante_legal
              this.DataRepresentanteLegal.n_registro = e.n_registro
              this.DataRepresentanteLegal.nombres_representante_legal = e.nombres_representante_legal
              this.DataRepresentanteLegal.telefono_movil_representante_legal = e.telefono_movil_representante_legal
              this.DataRepresentanteLegal.telefono_residencial_representante_legal = e.telefono_residencial_representante_legal
              this.DataRepresentanteLegal.tomo = e.tomo
              this.DataRepresentanteLegal.twitter_representante_legal = e.twitter_representante_legal

        });   
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async Delegado(id: any){
    this.xAPI.funcion = "IPOSTEL_R_Delegado_ID"
    this.xAPI.parametros = id
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
             data.Cuerpo.map(e => {
              this.DataDelegado.apellidos_delegado = e.apellidos_delegado
              this.DataDelegado.cargo_delegado = e.cargo_delegado
              this.DataDelegado.cedula_delegado = e.cedula_delegado
              this.DataDelegado.email_delegado = e.email_delegado
              this.DataDelegado.facebook_delegado = e.facebook_delegado
              this.DataDelegado.id_delegado = e.id_delegado
              this.DataDelegado.id_opp = e.id_opp
              this.DataDelegado.instagram_delegado = e.instagram_delegado
              this.DataDelegado.nombres_delegado = e.nombres_delegado
              this.DataDelegado.telefono_delegado = e.telefono_delegado
              this.DataDelegado.twitter_delegado = e.twitter_delegado
        });   
      },
      (error) => {
        console.log(error)
      }
    )
  }


  filterUpdateSubcontratistas(event) {
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

}
