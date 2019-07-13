import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-loader'
})
export class LoaderComponent implements OnInit {

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController) { }

  ngOnInit() {}

  async startLoader() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
  }

  async closeLoader(navegateTo) {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot(navegateTo);
    });
  }

}
