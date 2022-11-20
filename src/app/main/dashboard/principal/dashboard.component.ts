import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ApiService, IAPICore } from '@core/services/apicore/api.service';
import { PdfService } from '@core/services/pdf/pdf.service';
import { UtilService } from '@core/services/util/util.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public xAPI: IAPICore = {
    funcion: '',
    parametros: '',
    valores: {},
  };


  
  public IdEmpresa
  public DataEmpresa
  public token
  public empresa = false
  public usuario = false

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private pdf: PdfService,
  ) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  async ngOnInit() {
    this.token =  jwt_decode(sessionStorage.getItem('token'));
    // console.log(this.token)
    this.IdEmpresa = this.token.Usuario[0].EmpresaId
    await this.EmpresaRIF(this.token.Usuario[0].Rif)
    if (this.token.Usuario[0].EsAdministrador != "9") {
      this.usuario = true
      this.empresa = false
    } else {
      this.usuario = false
      this.empresa = true
    }
  }

  async EmpresaRIF(id: any) {
    this.xAPI.funcion = "RECOSUP_R_empresa_rif";
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


}
