import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountryService, CountryData } from '../../services/country';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  paisBusca = '';

  resultado: CountryData | null = null;

  carregando = false;

  erro = '';

private countryService = inject(CountryService);

  explorarPais(): void {

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

        next: (paises) => {

          this.carregando = false;

          if (paises.length > 0) {
            this.resultado = paises[0];
          } else {
            this.erro = 'País não encontrado.';
          }

        },

        error: () => {

          this.carregando = false;

          this.erro =
            'Não encontramos esse país. Tente novamente.';

        }

      });

  }

}