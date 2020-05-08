import { Component, OnInit } from '@angular/core';
import { AuthResponseData ,AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin:boolean= false;

  constructor(private _authservice:AuthService , private router:Router , private _loadCtrl:LoadingController , private _alterCtrl:AlertController) { }

  ngOnInit() {
  }

  authenticate(email,password){
    this._loadCtrl.create({
      keyboardClose:true,
      message:'Logging in ...',
      spinner:"circular",

    }).then((spinEl)=>{
      spinEl.present();
      let authObs = new Observable<AuthResponseData>();
      if(this.isLogin){
        console.log(email,password);
        authObs = this._authservice.login(email,password);
      }else {
        authObs= this._authservice.signUp(email,password)
      }
      authObs.subscribe((responseData)=>{
        console.log(responseData)
        this.router.navigateByUrl('/places/tabs/discover')
        spinEl.dismiss();
      },errResponse=>{
        console.log(errResponse)
        let code = errResponse.error.error.message;
        let message='';
        if(code==='EMAIL_EXISTS'){
          message = 'The Email already exists ,  please try with another one'
        }else if (code==='EMAIL_NOT_FOUND'){
          message ="Email not found , please check email id entered"
        }else if(code ==='INVALID_PASSWORD'){
          message = "Password entered is invalid"
        }
        this._alterCtrl.create({
          header:'Error message',
          message:message,
          buttons:['Okay']
        }).then((alertEl)=>{
          alertEl.present();
        })
      });
     
    })
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return
    }
    const email = form.value.email;
    const password= form.value.password;
    this.authenticate(email,password)

  }
  onSwitch(){
    this.isLogin = !this.isLogin;
  }

}
