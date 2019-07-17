import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Localizacao } from '../interfaces/localizacao';


@Injectable({
    providedIn: 'root'
})

export class EnderecoService {

    public localizacao: Localizacao;

    constructor(private http: HttpClient) {
    }

    getEndereco(latitude, longitude): Observable<any> {
        return this.http.get<any>('https://nominatim.openstreetmap.org/reverse?format=geojson&lat=' + latitude + '&lon=' + longitude)
            .pipe(
                tap(resp => {
                    //return console.log('Retorno API --> ', clima);
                    return resp;
                }),
                catchError(this.handleError([]))
            );
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}