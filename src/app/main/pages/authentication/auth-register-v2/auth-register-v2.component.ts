import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { IToken, LoginService } from '@core/services/seguridad/login.service';
import Swal from 'sweetalert2';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { UtilService } from '@core/services/util/util.service';
import { DatePipe } from '@angular/common';
import { IPOSTEL_C_OPP } from '@core/services/empresa/form-opp.service';

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {

  public fechaActual = new Date();


  public IFormOPP : IPOSTEL_C_OPP = {
    nombre_empresa: '',
    rif: '',
    direccion_empresa: '',
    correo_electronico: '',
    empresa_facebook: '',
    empresa_instagram: '',
    empresa_twitter: '',
    tipo_agencia: 0,
    sucursales: 0,
    subcontrataciones: 0,
    tipologia_empresa: 0,
    tipo_servicio: '',
    licencia_actividades_economicas_municipales: '',
    actividades_economicas_seniat: '',
    certificado_rupdae: '',
    patronal_ivss: '',
    matricula_inces: '',
    identificacion_laboral_ministerio_trabajo: '',
    certificado_eomic: '',
    permiso_bomberos: '',
    registro_sapi: '',
    registro_nacional_contratista: '',
    flota_utilizada: '',
    total_arrendados: 0,
    total_propio: 0,
    subcontratados: 0,
    alianzas: 0,
    otros: 0,
    cantidad_trabajadores: 0,
    cantidad_subcontratados: 0
  }


  public xAPI : IAPICore = {
    funcion: '',
    parametros: '',
    valores : {},
  };


  public SelectEstado
  public SelectCiudad
  public SelectMunicipio
  public SelectParroquia
  public SelectTipoAgencia
  public SelectTipologiaEmpresa 
public SelectEspecificacionServicio



  public tipoDocumento


  estado
  ciudad
  municipio
  parroquia
  
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public confirmeContrasenaUsuarioTextType: boolean;
  public contrasenaUsuarioTextType: boolean;
  public usuario: string;
  public clave: string;


  public iToken: IToken = { token: '', };
  public itk: IToken;
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private apiService : ApiService,
    private datePipe: DatePipe,
    private utilService : UtilService,
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private loginService: LoginService,
    private _router: Router
  ) {

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }
  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.confirmeContrasenaUsuarioTextType = !this.confirmeContrasenaUsuarioTextType;
    this.contrasenaUsuarioTextType = !this.contrasenaUsuarioTextType;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    if (sessionStorage.getItem("token") != undefined) {
      this._router.navigate(['/home'])
      return
   }
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
    this.Select_Estados()
    this.Select_TipoAgencia()
    this.Select_TipologiaEmpresa()
    this.Select_Especificacion_servicio()
  }

  async RegisterPrivatePostOffices(){
    this.IFormOPP.estado_empresa = this.IFormOPP.estado_empresa['estado']
    this.IFormOPP.ciudad_empresa = this.IFormOPP.ciudad_empresa['ciudad']
    this.IFormOPP.municipio_empresa = this.IFormOPP.municipio_empresa['municipio']
    this.IFormOPP.parroquia_empresa = this.IFormOPP.parroquia_empresa['parroquia']
    // console.log(this.IFormOPP)
    this.xAPI.funcion = 'IPOSTEL_C_OPP'
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.IFormOPP)
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
       if (data.tipo === 1) {
        this.utilService.alertConfirmMini('success', 'Felicidades! Registro Exitoso')
        this._router.navigate(['/'])
       } else {
        this.utilService.alertConfirmMini('error', 'Oops! Lo sentimos algo salio mal, intente de nuevo.')
       }
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async Select_Estados(){
    this.xAPI.funcion = 'ListarEstados'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectEstado = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectEstado = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_Ciudad(id: any) {
    this.xAPI.funcion = 'ListarCiudad'
    this.xAPI.parametros = id
    this.xAPI.valores = ''
    this.SelectCiudad = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectCiudad = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_Municipo(id: any) {
    this.xAPI.funcion = 'ListarMunicipio'
    this.xAPI.parametros = id
    this.xAPI.valores = ''
    this.SelectMunicipio = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectMunicipio = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_Parroquia(id: any) {
    this.xAPI.funcion = 'ListarParroquia'
    this.xAPI.parametros = id
    this.xAPI.valores = ''
    this.SelectParroquia = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectParroquia = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_TipoAgencia() {
    this.xAPI.funcion = 'IPOSTEL_tipo_agencia'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectTipoAgencia = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectTipoAgencia = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_TipologiaEmpresa() {
    this.xAPI.funcion = 'IPOSTEL_tipologia_empresa'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectTipologiaEmpresa = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectTipologiaEmpresa = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_Especificacion_servicio() {
    this.xAPI.funcion = 'IPOSTEL_especificacion_servicio'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectEspecificacionServicio = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectEspecificacionServicio = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  
}
