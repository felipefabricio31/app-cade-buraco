import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Localizacao {
    latitude: string;
    longitude: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    observacao: string;
    cidade: string;
    uf: string;
    estado: string;
    enderecoCompleto: string;
}