import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import axios from 'axios';
import { GlobalUrl } from 'src/app/globalurl';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Localizacao } from 'src/app/interfaces/localizacao';
import { EnderecoService } from 'src/app/services/endereco-service';

@Component({
  selector: 'app-buraco',
  templateUrl: './buraco.page.html',
  styleUrls: ['./buraco.page.scss'],
  providers: [Camera, AlertsComponent, EnderecoService]
})
export class BuracoPage implements OnInit {

  public localizacao = new Localizacao();
  private latitude: number;
  private longitude: number;

  productForm: FormGroup;
  street: string = '';
  proto: string = '';
  photo: any;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private globalUrl: GlobalUrl,
    public navController: NavController,
    public alertsComponent: AlertsComponent,
    public geolocation: Geolocation,
    public enderecoService: EnderecoService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      // 'street' : [null, Validators.required],
    });

    //Captura a latitude e longitudo do usuário
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude
        this.longitude = resp.coords.longitude;

        this.getEndereco();
      })
      .catch(err => {
        //Tratamendo da excessão
        console.log("Erro")
      });
  }

  getEndereco() {
    this.enderecoService.getEndereco(this.latitude, this.longitude)
      .subscribe(resp => {
        //console.log(resp);
        //https://nominatim.org/release-docs/develop/api/Reverse/

        this.localizacao.cidade = resp.features[0].properties.address.city;
        this.localizacao.bairro = resp.features[0].properties.address.suburb;
        this.localizacao.cep = resp.features[0].properties.address.postcode;
        this.localizacao.logradouro = resp.features[0].properties.address.road;
        this.localizacao.enderecoCompleto = resp.features[0].properties.display_name;

      }, err => {
        console.log(err);
      });
  }

  //Responsável por abrir a camera para tirar fotografia do buraco
  startCamera() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }


  async onFormSubmit(form: NgForm) {

    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    let formData = new FormData;
    formData.append('photo', this.photo);
    formData.append('street', form.value.street);
    //Parâmetros que devemos enviar para API

    await axios.post(`${this.globalUrl.baseAPIUrl}/buraco`, formData)
      .then(res => {
        this.alertsComponent.saveSuccess();
        this.navController.navigateRoot('/home-results');
      })
      .catch(err => {
        loading.dismiss();
      })
    loading.dismiss();
  }
}
