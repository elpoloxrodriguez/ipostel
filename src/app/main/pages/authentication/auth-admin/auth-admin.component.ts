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
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AuthAdminComponent implements OnInit {

  public xAPI : IAPICore = {
    funcion: '',
    parametros: '',
    valores : {},
  };

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

  //  QR certifucado
  public Qr

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
  ngOnInit(): void {
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
    });
  }


  async login() {
    this.submitted = true;
    this.loading = true;
    var Xapi = {
      "funcion": 'IPOSTEL_R_Login_admin',
      "parametros": this.usuario + ',' + this.clave
    }
    this.loginService.getLoginExternas(Xapi).subscribe(
      (data) => {
        // console.log(data)
        if (sessionStorage.getItem("token") != '') {
          this.itk = data;
          sessionStorage.setItem("token", this.itk.token);
          this.infoUsuario = jwt_decode(sessionStorage.getItem('token'));
          // console.log(this.infoUsuario.Usuario[0])
          this.utilservice.alertConfirmMini('success', `Bienvenido al SIRP-IPOSTEL`);
          this._router.navigate(['home'])
            .then(() => {
              window.location.reload();
            });
          return;
        } else {
          this.utilservice.alertConfirmMini('error', 'Errorr');
        }
      },
      (error) => {
        this.loading = false;
        this._router.navigate(['sirpv-admin'])
        this.utilservice.alertConfirmMini('error','Verifique los datos, e intente nuevamente')
      }
    );
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
