import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { GlobalUrl } from 'src/app/globalurl';
import { Storage } from '@ionic/storage';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [GlobalUrl, LoaderComponent]
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private  authService:  AuthService,
    private  router:  Router, 
    public globalUrl :GlobalUrl,
    private  storage:  Storage,
    public loaderComponent: LoaderComponent

  ) { 
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.storage.remove('token').then((val) => {
      
    });
    
    this.storage.remove('name_user').then((val) => {
       
    });

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Esqueceu sua senha?',
      message: 'Digite seu endereço de e-mail para receber o link de redefinição de senha.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          
          }
        }, {
          text: 'Enviar',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Um email foi enviado para você, verifique sua caixa de entrada.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async login(form){
    this.loaderComponent.startLoader();

    this.authService.login(form.value).then((res)=>{
      this.loaderComponent.closeLoader('/home-results')
      this.router.navigateByUrl('/home-results');
    }, err => {
      this.presentAlert()
    }); 
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuário ou senha inválidos',
      buttons: ['OK']
    })

    await alert.present()
  }


}
