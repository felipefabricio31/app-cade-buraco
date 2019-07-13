import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { AuthService } from './auth/auth.service';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { GlobalUrl } from './globalurl';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  name_user: string = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private  authService:  AuthService,
    public storage: Storage,
    public globalUrl :GlobalUrl,


  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Sobre',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'Buracos',
        url: '/buraco',
        direct: 'forward',
        icon: 'md-close-circle'
      },

      {
        title: 'Configurações',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      },
    ];

    this.initializeApp();
  }

  ngOnInit() {
    this.storage.get('name_user').then(name_user => {
      this.name_user = name_user
    })
       
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.authService.logout
    this.navCtrl.navigateRoot('/');
  }
}
