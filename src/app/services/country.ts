import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CountryData {
  names: {
    common: string;
    official: string;
  };

  codes: {
    alpha_3: string;
  };

  capitals?: {
    name: string;
    attributes?: {
      primary?: boolean;
    };
  }[];

  region: string;

  subregion?: string;

  population: number;

  flag: {
    emoji?: string;
    url_png?: string;
    url_svg?: string;
  };

  languages?: {
    name: string;
    native_name?: string;
  }[];

  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];
}

interface ApiResponse {
  data: {
    objects: CountryData[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl =
    'https://api.restcountries.com/countries/v5';

  constructor(
    private http: HttpClient
  ) {}

  buscarPais(nome: string): Observable<CountryData[]> {

    const url =
      `${this.apiUrl}?q=${encodeURIComponent(nome)}&api-key=${environment.apiKey}`;

    console.log('CHAVE USADA:', environment.apiKey);
    console.log('URL DA API:', url);

    return this.http
      .get<ApiResponse>(url)
      .pipe(
        map(response => response.data.objects)
      );
  }
}