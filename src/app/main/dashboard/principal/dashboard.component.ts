import { Component, OnInit, ViewEncapsulation, ViewChild, Injectable } from '@angular/core';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { ICrearCertificados } from '@core/services/empresa/form-opp.service';
import { PdfService } from '@core/services/pdf/pdf.service';
import { UtilService } from '@core/services/util/util.service';
import jwt_decode from "jwt-decode";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import puppeteer from 'puppeteer';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('section-block') sectionBlockUI: NgBlockUI;
  

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };

  public CrearCert: ICrearCertificados = {
    usuario: 0,
    token: '',
    type: 0,
    created_user: 0
  }
  public title
  
  public DataEmpresa
  public token
  public empresa = false
  public usuario = false
  public n_curp
  public statusEmpresaOPP = false
  public statusEmpresaSUB = false


  public empresaOPP = false
  public empresaSUB = false

  public fecha = new Date('yyyy-MM-dd HH:mm:ss');
  public anio = this.fecha.getFullYear();
  public hora
  public fecha_Actual_convert
  public hora_Actual_convert

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private pdf: PdfService,
    private httpClient: HttpClient
  ) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  async ngOnInit() {
    this.fecha_Actual_convert = this.utilService.FechaMomentActual()
    console.log(this.hora)
    this.token =  jwt_decode(sessionStorage.getItem('token'));
    this.EmpresaRIF(this.token.Usuario[0].id_opp)
    switch (this.token.Usuario[0].tipo_registro) {
      case undefined:
        this.title =  'Administrador IPOSTEL'
        this.usuario = false
        this.empresa = true
        break;
      case '1':
        this.title =  'Operador Postal Privado'
        this.empresaSUB = false
        this.empresaOPP = true
        this.usuario = true
        this.empresa = false
      break;
        case '2':
          this.title =  'Sub Contratista'
          this.empresaSUB = true
          this.empresaOPP = false  
          this.usuario = true
          this.empresa = false
          break;
      default:
        break;
    }


    if (this.token.Usuario[0].status_curp != null) {
      this.statusEmpresaOPP = true
      this.statusEmpresaSUB = true
    } else {
      this.statusEmpresaSUB = false
      this.statusEmpresaOPP = false
    }

  }

  GenerarReporteLiquidacionFPO(){
    this.sectionBlockUI.start('Generando Reporte de Liquidación P.F.O, Porfavor Espere!!!');
    setTimeout(() => {
      this.sectionBlockUI.stop()
      this.utilService.alertConfirmMini('success', 'Reporte de Liquidacion P.P.O Descagado Exitosamente')
    }, 2000);
  }

  async EmpresaRIF(id: any) {
    this.xAPI.funcion = "IPOSTEL_R_empresa_id";
    this.xAPI.parametros = id
    this.DataEmpresa = []
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
          this.DataEmpresa.push(data.Cuerpo);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  async GenerarCertificadoInscripcion() {
    this.CrearCert.usuario = this.token.Usuario[0].id_opp
    this.CrearCert.token = this.utilService.TokenAleatorio(10),
    this.CrearCert.type = 1,
     // 1 CERTIFICADO UNICO OPP
     // 2 AUTORIZACION UNICA  SUB
    this.CrearCert.created_user = this.token.Usuario[0].id_opp
    this.xAPI.funcion = "IPOSTEL_C_Certificados";
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.CrearCert)
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.sectionBlockUI.start('Generando Certificado, Porfavor Espere!!!');
        this.n_curp = data.msj+'-IP'+this.anio
        if (data.tipo === 1) {
          var id = this.CrearCert.token
          let ruta: string = btoa('https://sirp.ipostel.gob.ve');
          this.apiService.GenQR(id, ruta).subscribe(
            (data) => {
              // INSERT API
              this.apiService.LoadQR(id).subscribe(
                (xdata) => {
                  var sdata = this.DataEmpresa[0]
                  console.log(sdata)
                  this.pdf.CertificadoInscripcion(sdata[0], xdata.contenido, this.CrearCert.token, this.n_curp)
                  this.sectionBlockUI.stop()
                  this.utilService.alertConfirmMini('success', 'Certificado Descagado Exitosamente')
                },
                (error) => {
                  console.log(error)
                }
              )
            },
            (error) => {
              console.log(error)
            }
          )
        } else {
          this.utilService.alertConfirmMini('error', 'Oops! Algo salio mal, intente de nuevo')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async GenerarAutorizacionInscripcion() {
    this.CrearCert.usuario = this.token.Usuario[0].id_opp
    this.CrearCert.created_user = this.token.Usuario[0].id_opp
    this.CrearCert.token = this.utilService.TokenAleatorio(10),
    this.CrearCert.type = 2,
     // 1 CERTIFICADO UNICO OPP
     // 2 AUTORIZACION UNICA  SUB
    this.CrearCert.created_user = this.token.Usuario[0].id_opp
    this.xAPI.funcion = "IPOSTEL_C_Certificados";
    this.xAPI.parametros = ''
    this.xAPI.valores = JSON.stringify(this.CrearCert)
    await this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        this.sectionBlockUI.start('Generando Autorización, Porfavor Espere!!!');
        this.n_curp = data.msj+'-IP'+this.anio
        if (data.tipo === 1) {
          var id = this.CrearCert.token
          let ruta: string = btoa('https://sirp.ipostel.gob.ve');
          this.apiService.GenQR(id, ruta).subscribe(
            (data) => {
              // INSERT API
              this.apiService.LoadQR(id).subscribe(
                (xdata) => {
                  var sdata = this.DataEmpresa[0]
                  this.pdf.AutorizacionInscripcion(sdata[0], xdata.contenido, this.CrearCert.token, this.n_curp)
                  this.sectionBlockUI.stop()
                  this.utilService.alertConfirmMini('success', 'Autorización Descagada Exitosamente')
                },
                (error) => {
                  console.log(error)
                }
              )
            },
            (error) => {
              console.log(error)
            }
          )
        } else {
          this.utilService.alertConfirmMini('error', 'Oops! Algo salio mal, intente de nuevo')
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }


}
