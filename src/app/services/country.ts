import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  private apiUrl = '/api/pais';

  constructor(
    private http: HttpClient
  ) {}

  buscarPais(nome: string): Observable<CountryData[]> {

    const url =
      `${this.apiUrl}?nome=${encodeURIComponent(nome)}`;

    console.log('BUSCANDO PAÍS:', nome);
    console.log('URL DO BACKEND:', url);

    return this.http
      .get<ApiResponse>(url)
      .pipe(
        map(response => response.data.objects)
      );
  }
}