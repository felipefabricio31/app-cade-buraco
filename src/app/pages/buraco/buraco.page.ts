import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import axios from 'axios';
import { GlobalUrl } from 'src/app/globalurl';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';

import { Localizacao } from 'src/app/interfaces/localizacao';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-buraco',
  templateUrl: './buraco.page.html',
  styleUrls: ['./buraco.page.scss'],
  providers: [Camera, AlertsComponent]
})
export class BuracoPage implements OnInit {
  watchLocationUpdates: any;
  loading: any;
  isWatching: boolean;
  userLocation;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;

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
    private nativeGeocoder: NativeGeocoder,
    public localizacao: Localizacao

  ) { }

  ngOnInit() {

    this.loading = this.loadingController.create();

    this.productForm = this.formBuilder.group({
      // 'street' : [null, Validators.required],
    });

    this.getGeolocation();

  }
   
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };


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

  //Get current coordinates of device
  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;

      //alert(this.geoLatitude);

      this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        var retorno = result[0];
        this.localizacao.latitude = retorno.latitude;
        this.localizacao.longitude = retorno.longitude;
        this.localizacao.uf = retorno.countryCode;
        this.localizacao.cidade = retorno.subAdministrativeArea;
        this.localizacao.bairro = retorno.subAdministrativeArea;
        this.localizacao.cidade = retorno.subLocality;
        this.localizacao.cep = retorno.postalCode;
        this.localizacao.logradouro = retorno.thoroughfare;
        this.localizacao.numero = retorno.subThoroughfare;
      })
      .catch((error: any) => {
        alert('Erro ao recuperar endereço, tente novamente(#2202)' + JSON.stringify(error));
      });
  }
}
