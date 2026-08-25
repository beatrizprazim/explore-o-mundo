import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountryService, CountryData } from '../../services/country';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  paisBusca: string = '';

  resultado: CountryData | null = null;

  carregando: boolean = false;

  erro: string = '';

  private countryService = inject(CountryService);

  explorarPais(): void {

    console.log('1 - INICIANDO BUSCA:', this.paisBusca);

    if (!this.paisBusca.trim()) {
      this.erro = 'Digite o nome de um país.';
      this.resultado = null;
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.resultado = null;

    this.countryService
      .buscarPais(this.paisBusca.trim())
      .subscribe({
        next: (paises: CountryData[]) => {

          console.log('2 - RESPOSTA RECEBIDA:', paises);
          console.log('3 - QUANTIDADE DE PAÍSES:', paises.length);

          this.carregando = false;

          if (paises.length > 0) {

            console.log('4 - PAÍS ENCONTRADO:', paises[0]);

            this.resultado = paises[0];

            console.log('5 - RESULTADO DEFINIDO:', this.resultado);

          } else {

            this.erro = 'País não encontrado.';

          }
        },

        error: (error) => {

          console.error('ERRO AO BUSCAR PAÍS:', error);

          this.carregando = false;

          this.erro = 'Não encontramos esse país. Tente novamente.';

        }
      });
  }
}