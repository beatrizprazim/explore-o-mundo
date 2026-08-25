import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CountryData {
  names: {
    common: string;
    official: string;
    native?: {
      [key: string]: {
        common: string;
        official: string;
      };
    };
  };

  codes: {
    alpha_2: string;
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
    description?: string;
    emoji?: string;
    url_png?: string;
    url_svg?: string;
  };

  languages?: {
    name: string;
    native_name?: string;
    iso639_1?: string;
  }[];

  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];

  area?: {
    kilometers?: number;
    miles?: number;
  };
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

  constructor(private http: HttpClient) {}

  buscarPais(nome: string): Observable<CountryData[]> {

    console.log('BUSCANDO PAÍS:', nome);

    const url =
      `${this.apiUrl}?nome=${encodeURIComponent(nome)}`;

    console.log('URL DO BACKEND:', url);

    return this.http
      .get<ApiResponse>(url)
      .pipe(
        map(response => response.data.objects)
      );
  }
}