import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alerts'
})
export class AlertsComponent implements OnInit {

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  async saveSuccess(mensagem = 'Salvo com sucesso!') {
    const alert = await this.alertController.create({ 
      subHeader: mensagem, 
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorWhileSaving(message = 'Erro ao salvar') {
    const alert = await this.alertController.create({ 
      subHeader: message, 
      buttons: ['OK']
    });

    await alert.present();
  }

}
