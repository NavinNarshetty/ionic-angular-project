import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin:boolean= true;

  constructor(private _authservice:AuthService , private router:Router , private _loadCtrl:LoadingController) { }

  ngOnInit() {
  }

  onLogin(){
    this._authservice.login();
    this._loadCtrl.create({
      keyboardClose:true,
      message:'Logging in ...',
      spinner:"circular",

    }).then((spinEl)=>{
      spinEl.present();
      setTimeout(() => {
        spinEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover')
      }, 1500);
    })
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return
    }
    const email = form.value.email;
    const password= form.value.password;

    if(this.isLogin){
      console.log(email,password);
    }
    this.router.navigateByUrl('/places/tabs/discover')

  }
  onSwitch(){
    this.isLogin = !this.isLogin;
  }

}
