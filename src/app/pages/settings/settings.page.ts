import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;
  name_user:string = '';
  email_user:string = '';

  languages: any = ['English', 'Portuguese', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'BRL', 'EUR'];

  constructor(
    public navCtrl: NavController,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('name_user').then(name_user => {
      
      this.name_user = name_user
    })
    this.storage.get('email_user').then(email_user => {
      
      this.email_user = email_user
    })
  
       
  }

  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }

}
