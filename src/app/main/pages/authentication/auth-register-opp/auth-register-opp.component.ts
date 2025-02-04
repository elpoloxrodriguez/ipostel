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
import { IPOSTEL_C_ConexionFlotaUtilizada, IPOSTEL_C_DelegadoOPP, IPOSTEL_C_OPP, IPOSTEL_C_RepresentanteLegal } from '@core/services/empresa/form-opp.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n } from '@core/services/util/datapicker.service';

@Component({
  selector: 'app-auth-register-opp',
  templateUrl: './auth-register-opp.component.html',
  styleUrls: ['./auth-register-opp.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, NgbModalConfig, NgbModal] // define custom NgbDatepickerI18n provider
})
export class AuthRegisterOppComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;


  public fechaActual = new Date();


  public IFormOPP: IPOSTEL_C_OPP = {
    nombre_empresa: '',
    rif: '',
    direccion_empresa: '',
    correo_electronico: '',
    empresa_facebook: '',
    empresa_instagram: '',
    empresa_twitter: '',
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
    status: 0,
    tipo_registro: 0,
    password: '',
    especificacion_servicio: ''
  }

  public IFormOPP_RepresentanteLegal: IPOSTEL_C_RepresentanteLegal = {
    id_opp: 0,
    n_registro: '',
    fecha_registro: '',
    tomo: '',
    nombres_representante_legal: '',
    apellidos_representante_legal: '',
    cedula_representante_legal: '',
    direccion_representante_legal: '',
    email_representante_legal: '',
    facebook_representante_legal: '',
    instagram_representante_legal: '',
    twitter_representante_legal: '',
    cargo_representante_legal: '',
    telefono_movil_representante_legal: '',
    telefono_residencial_representante_legal: '',
    n_registro_contrato: '',
    fecha_registro_contrato: '',
    tomo_contrato: ''
  }

  public IFormOPP_DelegadoOPP: IPOSTEL_C_DelegadoOPP = {
    nombres_delegado: '',
    apellidos_delegado: '',
    cedula_delegado: '',
    cargo_delegado: '',
    telefono_delegado: '',
    email_delegado: '',
    facebook_delegado: '',
    instagram_delegado: '',
    twitter_delegado: ''
  }

  public IConexionFlotaUtilizada: IPOSTEL_C_ConexionFlotaUtilizada = {
    id_opp_sub: null,
    vehiculo_liviano: null,
    camionetas: null,
    camion_350: null,
    camion_750: null,
    camion_3_ejes: null,
    camion_4_ejes: null,
    camion_5_ejes: null,
    camion_6_ejes: null,
    buques: null,
    aviones: null,
    avionetas: null,
    containers: null,
    motos: null,
    bicicletas: null,
    autobuses: null
  }

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };



  // Show Inputs Conexion Flota Utilizada
  public vehiculo_liviano = false
  public camionetas = false
  public camion_350 = false
  public camion_750 = false
  public camion_3_ejes = false
  public camion_4_ejes = false
  public camion_5_ejes = false
  public camion_6_ejes = false
  public buques = false
  public aviones = false
  public avionetas = false
  public containers = false
  public motos = false
  public bicicletas = false
  public autobuses = false
  public ErrorRegistro


  public SelectEstado
  public SelectCiudad
  public SelectMunicipio
  public SelectParroquia
  public labelTipologiaEmpresa
  public SelectTipoAgencia
  public SelectTipologiaEmpresa
  public SelectTipoServicio
  public SelectFlotaUtilizada
  public SelectOpp

  public JSON_flota_utilizada: any
  public inputs

  public TipoRegistro = [
    {
      name: 'Operador Postal Privado'
    },
    {
      name: 'SubContratista'
    }
  ]


  public passwordConfirm

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
    private apiService: ApiService,
    private datePipe: DatePipe,
    private utilService: UtilService,
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
    this.Select_Tipo_servicio()
    this.Select_Opp()
    this.Select_Tipo_Flota()
  }

  async RegisterPrivatePostOffices() {
    this.IFormOPP.tipo_registro = 1
    this.IFormOPP.password = this.utilService.md5(this.IFormOPP.password)
    this.IFormOPP.estado_empresa = this.IFormOPP.estado_empresa['estado']
    this.IFormOPP.ciudad_empresa = this.IFormOPP.ciudad_empresa['ciudad']
    this.IFormOPP.municipio_empresa = this.IFormOPP.municipio_empresa['municipio']
    this.IFormOPP.parroquia_empresa = this.IFormOPP.parroquia_empresa['parroquia']
    this.IFormOPP.tipo_servicio = JSON.stringify(this.IFormOPP.tipo_servicio)
    this.IFormOPP.flota_utilizada = JSON.stringify(this.IFormOPP.flota_utilizada)
    this.xAPI.funcion = 'IPOSTEL_C_OPP'
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.IFormOPP)
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (opp) => {
        this.ErrorRegistro = opp.msj
        if (opp.tipo === 1) {
          this.sectionBlockUI.start('Guardo Registro, Porfavor Espere!!!');
          this.IFormOPP_RepresentanteLegal.id_opp = opp.msj
          // this.IFormOPP_RepresentanteLegal.fecha_registro = this.IFormOPP_RepresentanteLegal.fecha_registro.year+'-'+this.IFormOPP_RepresentanteLegal.fecha_registro.month+'-'+this.IFormOPP_RepresentanteLegal.fecha_registro.day,
          this.xAPI.funcion = 'IPOSTEL_C_RepresentanteLegal'
          this.xAPI.parametros = ''
          this.xAPI.valores = JSON.stringify(this.IFormOPP_RepresentanteLegal)
          this.apiService.EjecutarDev(this.xAPI).subscribe(
            (representante_legal) => {
              this.IFormOPP_DelegadoOPP.id_opp = opp.msj
              this.xAPI.funcion = 'IPOSTEL_C_DelegadoOPP'
              this.xAPI.parametros = ''
              this.xAPI.valores = JSON.stringify(this.IFormOPP_DelegadoOPP)
              this.apiService.EjecutarDev(this.xAPI).subscribe(
                (delegado) => {
                  this.IConexionFlotaUtilizada.id_opp_sub = opp.msj
                  this.xAPI.funcion = 'IPOSTEL_C_ConexionFlotaUtilizada'
                  this.xAPI.parametros = ''
                  this.xAPI.valores = JSON.stringify(this.IConexionFlotaUtilizada)
                  this.apiService.EjecutarDev(this.xAPI).subscribe(
                    (conexion_flota_utilizada) => {
                      this.sectionBlockUI.stop();
                      this.utilService.alertConfirmMini('success', 'Felicidades! Registro Exitoso')
                      this._router.navigate(['/'])
                    },
                    (error) => {
                      console.error(error)
                    }
                  )
                },
                (error) => {
                  console.error(error)
                }
              )
            },
            (error) => {
              console.error(error)
            }
          )
        } else {
          this.utilService.alertConfirmMini('error', 'Oops! Lo sentimos algo salio mal, intente de nuevo.')
        }
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async Select_Estados() {
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
  async Select_TipologiaEmpresa(event: any) {
    switch (event.length) {
      case 1:
        this.IFormOPP.tipologia_empresa = 3
        this.labelTipologiaEmpresa = 'Operador Pequeña Escala'
        break;
      case 2:
        this.IFormOPP.tipologia_empresa = 2
        this.labelTipologiaEmpresa = 'Operador Mediana Escala'
        break;
      case 3:
        this.IFormOPP.tipologia_empresa = 1
        this.labelTipologiaEmpresa = 'Operador Gran Escala'
        break;
      case 0:
        this.IFormOPP.tipologia_empresa = 0
        this.labelTipologiaEmpresa = ''
        break;
      default:
        break;
    }
    // this.xAPI.funcion = 'IPOSTEL_tipologia_empresa'
    // this.xAPI.parametros = ''
    // this.xAPI.valores = ''
    // this.SelectTipologiaEmpresa = []
    // await this.apiService.EjecutarDev(this.xAPI).subscribe(
    //   (data) => {
    //     this.SelectTipologiaEmpresa = data.Cuerpo.map(e => {
    //       return e
    //     })
    //   },
    //   (error) => {
    //     console.error(error)
    //   }
    // )

  }
  async Select_Tipo_servicio() {
    this.xAPI.funcion = 'IPOSTEL_tipo_servicio'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectTipoServicio = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectTipoServicio = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  async Select_Tipo_Flota() {
    this.xAPI.funcion = 'IPOSTEL_tipo_flota'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectFlotaUtilizada = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectFlotaUtilizada = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async Select_Opp() {
    this.xAPI.funcion = 'IPOSTEL_R_OPP'
    this.xAPI.parametros = ''
    this.xAPI.valores = ''
    this.SelectOpp = []
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        this.SelectOpp = data.Cuerpo.map(e => {
          return e
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }

  async CantidadFlota(event: any) {
    event.forEach(e => {
      switch (e.id_flota_utilizada) {
        case 0:
          this.vehiculo_liviano = false
          this.camionetas = false
          this.camion_350 = false
          this.camion_750 = false
          this.camion_3_ejes = false
          this.camion_4_ejes = false
          this.camion_5_ejes = false
          this.camion_6_ejes = false
          this.buques = false
          this.aviones = false
          this.avionetas = false
          this.containers = false
          this.motos = false
          this.bicicletas = false
          this.autobuses = false
          break;
        case '1':
          this.vehiculo_liviano = true
          break;
        case '2':
          this.camionetas = true
          break;
        case '3':
          this.camion_350 = true
          break;
        case '4':
          this.camion_750 = true
          break;
        case '5':
          this.camion_3_ejes = true
          break;
        case '6':
          this.camion_4_ejes = true
          break;
        case '7':
          this.camion_5_ejes = true
          break;
        case '8':
          this.camion_6_ejes = true
          break;
        case '9':
          this.buques = true
          break;
        case '10':
          this.aviones = true
          break;
        case '11':
          this.avionetas = true
          break;
        case '12':
          this.containers = true
          break;
        case '13':
          this.motos = true
          break;
        case '14':
          this.bicicletas = true
          break;
          case '15':
            this.autobuses = true
            break;


        default:
          break;
      }
    });
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

