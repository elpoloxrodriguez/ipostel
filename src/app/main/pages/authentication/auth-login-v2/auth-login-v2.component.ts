import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { IToken, LoginService } from '@core/services/seguridad/login.service';
import Swal from 'sweetalert2';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { UtilService } from '@core/services/util/util.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {

  public xAPI : IAPICore = {
    funcion: '',
    parametros: '',
    valores : {},
  };

  public fecha = new Date(); 
  public hora = this.fecha.getHours();
  public dia = this.fecha.getDay();
  public btnShow = true

  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public usuario: string;
  public clave: string;

  public sessionTOKEN

  public Nsession : string = '0';

  //  QR certifucado
  public Qr
  public img
  public appLogoImage
  public appName
  public infoUsuario
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
    private _coreMenuService: CoreMenuService,
    private apiService : ApiService,
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private loginService: LoginService,
    private _router: Router,
    private utilservice: UtilService
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

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    // this.login(this.loginForm)

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (sessionStorage.getItem("token") != undefined) {
      this._router.navigate(['/']);
    }

    // Login
    this.loading = true;

    // redirect to home page
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 200);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {
    await this.BloqueoSystem()
    let urlQR = this._router.url
    if (urlQR  == undefined) {
      this.Qr = ''
    } else {
      this.Qr = urlQR.substring(7, urlQR.length  +1)
      // this.EmpresaRIF()
      this.Qr = ''
    }

    if (sessionStorage.getItem("token") != undefined) {
      this._router.navigate(['/home'])
      return
   }
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      // console.log(this.coreConfig)
      this.img = this.coreConfig.layout.skin
      this.appLogoImage = this.coreConfig.app.appLogoImage
      this.appName = this.coreConfig.app.appName
    });
  }


  async login() {
    this.submitted = true;
    this.loading = true;
    var Xapi = {
      "funcion": 'IPOSTEL_R_Login',
      "parametros": this.usuario + ',' + this.clave
    }
    await this.loginService.getLoginExternas(Xapi).subscribe(
      (data) => {
        const stoken = jwt_decode(data.token)
        this.sessionTOKEN = stoken 
        const tokenSession = this.sessionTOKEN.Usuario[0].status_empresa

        switch (tokenSession) {
          case '0':
             this.utilservice.alertConfirmMini('error', '<strong><font color="red">Oops lo sentimos!</font></strong> <br> Estimado usuario su cuenta aun no se encuentra validada por <strong><font color="red">IPOSTEL</font></strong>, porfavor intente de nuevo mas tarde.');
             this.loading = false;
             this._router.navigate(['login'])     
             break;
            case '1':
            this.itk = data;
            sessionStorage.setItem("token", this.itk.token);
            this.infoUsuario = jwt_decode(sessionStorage.getItem('token'));
            this.utilservice.alertConfirmMini('success', `Bienvenido al IPOSTEL`);
            this._router.navigate(['']).then(() => {window.location.reload()});
          // return;
            break;
            case '2':
              this.utilservice.alertConfirmMini('error', '<strong><font color="red">Oops lo sentimos!</font></strong> <br> Estimado usuario su cuenta Deshabilitada por <strong><font color="red">REVOCATORIA</font></strong>, porfavor pongase en contacto con la administración de IPOSTEL.');
              this.loading = false;
              this._router.navigate(['login'])      
              break;
             case '3':
              this.utilservice.alertConfirmMini('error', '<strong><font color="red">Oops lo sentimos!</font></strong> <br> Estimado usuario su cuenta Deshabilitada por <strong><font color="red">FINIQUITO DE CONTRATO</font></strong>, porfavor pongase en contacto con la administración de IPOSTEL.');
              this.loading = false;
              this._router.navigate(['login'])      
              break;
             case '4':
              this.utilservice.alertConfirmMini('error', '<strong><font color="red">Oops lo sentimos!</font></strong> <br> Estimado usuario su cuenta Deshabilitada por <strong><font color="red">NO MOVILIZACIÓN DE PIEZAS</font></strong>, porfavor pongase en contacto con la administración de IPOSTEL.');
              this.loading = false;
              this._router.navigate(['login'])      
              break;
          default:
            break;
        }

        // if (tokenSession != '0') {
        //   this.itk = data;
        //   sessionStorage.setItem("token", this.itk.token);
        //   this.infoUsuario = jwt_decode(sessionStorage.getItem('token'));
        //   this.utilservice.alertConfirmMini('success', `Bienvenido al IPOSTEL`);
        //   this._router.navigate(['']).then(() => {window.location.reload()});
        //   return;
        // } else {
        //   this.loading = false;
        //   this.utilservice.alertConfirmMini('error', '<strong><font color="red">Oops lo sentimos!</font></strong> <br> Estimado usuario su cuenta aun no se encuentra validada por <strong><font color="red">IPOSTEL</font></strong>, porfavor intente de nuevo mas tarde.');
        // }
      },
      (error) => {
        this.loading = false;
        this._router.navigate(['login'])
        this.utilservice.alertConfirmMini('error','Verifique los datos, e intente nuevamente')
        this.usuario = ''
        this.clave = ''
      }
    );
  }

  async BloqueoSystem(){
    this.xAPI.funcion = "IPOSTEL_R_Settings_Initials"
    this.xAPI.parametros = ''
    await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        data.Cuerpo.map(e => {
          if (e.status_hora == '1') {
            if(this.hora >= e.hora_desde || this.hora < e.hora_hasta ){
              this.utilservice.alertMessageAutoCloseTimer(5000,'<font color="red">Estimado Usuario</font>', '<strong><h4>El sistema estará operativo de Lunes a Viernes de 7:00AM hasta las 8:00PM.</h4></strong>')
              this.btnShow = false
              this._router.navigate(['login']);
              sessionStorage.clear();
              localStorage.clear();
              }
          }
          if (e.status_dia == '1') {
            if(this.dia == e.dia_desde || this.dia == e.dia_hasta ){
              this.utilservice.alertMessageAutoCloseTimer(5000,'<font color="red">Estimado Usuario</font>', '<strong><h4>El sistema estará operativo de Lunes a Viernes de 7:00AM hasta las 8:00PM.</h4></strong>')
              this.btnShow = false
              this._router.navigate(['login']);
              sessionStorage.clear();
              localStorage.clear();
            }
          }
          if (e.app_status == '1') {
            if(this.dia > e.app_dia ){
              this.utilservice.alertMessageAutoCloseTimer(10000,'<h5><font color="red"><strong>Estimados Operadores Postales Privados</strong></font></h5>', '<strong><h5>En este momento nos encontramos en desarrollo de los modulos consiguientes, para la entrada en vigencia del  <strong>SIRPV-IPOSTEL</strong><br><br><strong><font color="red">Sistema Integrado de Regulación Postal Privado Venezolano 🇻🇪</font></strong></h5></strong>')
              this.btnShow = false
              this._router.navigate(['login']);
              sessionStorage.clear();
              localStorage.clear();
            }
          }
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async Certificado(id: string){
    this.xAPI.funcion = "IPOSTEL_R_Certificados";
    this.xAPI.parametros = id
     await this.apiService.EjecutarDev(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data.Cuerpo.length != 0) {
          this.Qr = ''
          // console.log(data.Cuerpo[0])
          var cert = data.Cuerpo[0]
          Swal.fire({
            html: `
                  <div class="card card-congratulations">
                    <div class="card-body text-center">
                      <div class="avatar avatar-xl bg-primary shadow">
                      </div>
                      <div class="text-center">
                        <h1 class="mb-1 text-white">${cert.nombre_empresa}</h1>
                        <p class="card-text m-auto w-50">
                        RIF: ${cert.rif}
                        </p>
                        <p class="card-text m-auto w-100">
                        DIRECCIÓN: ${cert.direccion_empresa}
                        </p>
                        <p class="card-text m-auto w-75">
                        ${cert.correo_electronico}
                        </p>
                      </div>
                      <br>
                      <p align="right">
                      ${this.utilservice.FechaMoment(cert.created_date)}
                      </p>
                    </div>
                  </div>
            `,
            footer: `
            <div class="auth-footer-btn d-flex justify-content-center">
              <p class="text-center mt-2">
            <small align="center"><strong>INSTITUTO POSTAL TELEGRÁFICO DE VENEZUELA</strong> <br>  RIF G-20000043-0
            <br>
            Dirección : Avenida José Ángel Lamas, San Martín, Caracas, edificio Centro Postal Caracas, Distrito Capital
            <br>
            E-mail: <a href="mailto:tsuarez@ipostel.gob.ve@fona.gob.ve">tsuarez@ipostel.gob.ve</a>
            <br>
            Telf: <a href="Tel:02124053340">0212-405.33.40</a> / 0412-711.08.00 / fax: 0212-405.33.66
            </small>
            </p>
          </div>
            `,
            icon: 'success',
            width: '900px',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#3085d6',
          })
         } else {
          this.Qr = ''
          Swal.fire({
            title: 'Certificado NO Valido!',
            text: 'Lo sentimos, este certificado no es generado por nuestro sistema.',
            icon: 'error',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
         } 
      },
      (error) => {
        console.log(error)
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
