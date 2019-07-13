import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { NavController } from '@ionic/angular';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [LoaderComponent, AlertsComponent]
})
export class RegisterPage implements OnInit {
  constructor(
    private  authService:  AuthService, 
    private  router:  Router,
    public navCtrl: NavController,
    public loaderComponent: LoaderComponent,
    public alertsComponent: AlertsComponent
    ) { }

  ngOnInit() {
  }

  async register(form) {
    this.loaderComponent.startLoader();

    this.authService.register(form.value).subscribe((res) => {
      this.alertsComponent.saveSuccess();
      this.loaderComponent.closeLoader('/')
    }, err => {
      this.alertsComponent.saveSuccess();
      this.loaderComponent.closeLoader('/')
    });

    this.navCtrl.navigateRoot('/');

  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

  
}
