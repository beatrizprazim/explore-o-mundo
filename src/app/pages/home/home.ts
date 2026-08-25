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

  console.log('1 - INICIANDO BUSCA:', this.paisBusca);

  this.countryService
    .buscarPais(this.paisBusca.trim())
    .subscribe({

      next: (paises) => {

        console.log('2 - RESPOSTA RECEBIDA:', paises);
        console.log('3 - QUANTIDADE DE PAÍSES:', paises.length);

        this.carregando = false;

        if (paises.length > 0) {

          console.log('4 - PAÍS ENCONTRADO:', paises[0]);

          this.resultado = paises[0];

          console.log('5 - RESULTADO DEFINIDO:', this.resultado);

        } else {

          console.log('4 - NENHUM PAÍS ENCONTRADO');

          this.erro = 'País não encontrado.';
        }

      },

      error: (erro) => {

        console.error('ERRO AO BUSCAR PAÍS:', erro);

        this.carregando = false;

        this.erro =
          'Não encontramos esse país. Tente novamente.';

      }

    });
}