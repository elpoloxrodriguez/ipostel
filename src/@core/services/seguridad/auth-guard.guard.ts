import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import Swal from 'sweetalert2'
import { UtilService } from '../util/util.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  public fecha = new Date(); 
  public hora = this.fecha.getHours();
  public dia = this.fecha.getDay();
  public btnShow = true


  constructor(private router: Router, private loginService: LoginService, private utilservice: UtilService
    ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {     
    
      // if(this.hora >= 20 || this.hora < 7 ){
      //   this.utilservice.alertMessageAutoCloseTimer(5000,'<font color="red">Estimado Usuario</font>', '<strong><h4>El sistema estará operativo de Lunes a Viernes de 7:00AM hasta las 8:00PM.</h4></strong>')
      //   this.btnShow = false
      //   this.router.navigate(['login']);
      //   sessionStorage.clear();
      //   localStorage.clear();
      //   }
      // if(this.dia == 6 || this.dia == 0 ){
      //   this.utilservice.alertMessageAutoCloseTimer(5000,'<font color="red">Estimado Usuario</font>', '<strong><h4>El sistema estará operativo de Lunes a Viernes de 7:00AM hasta las 8:00PM.</h4></strong>')
      //   this.btnShow = false
      //   this.router.navigate(['login']);
      //   sessionStorage.clear();
      //   localStorage.clear();
      // }


      
      if (sessionStorage.getItem("token") != undefined ){
        return true;
      }else{
        console.log('Entrando');
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        this.router.navigate(['login']);
        return false;
      }
    

  }

  authConecting(): Promise<boolean> {    
    return new Promise<boolean>((resolv, reject) => {      
      // firebase.auth().onAuthStateChanged( user => {
      //   if(user){
      //     return resolv(true);
      //   }else{
      //     return reject(false);
      //   }
      // })
    })
  }



}