import { Component, inject, ChangeDetectorRef } from '@angular/core';
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

  paisesRegiao: CountryData[] = [];

  regiaoSelecionada: string = '';

  carregando: boolean = false;

  erro: string = '';

  private countryService = inject(CountryService);

  private cdr = inject(ChangeDetectorRef);

  explorarPais(): void {

    console.log('1 - INICIANDO BUSCA:', this.paisBusca);

    if (!this.paisBusca.trim()) {

      this.erro = 'Digite o nome de um país.';
      this.resultado = null;

      this.cdr.detectChanges();

      return;
    }

    this.carregando = true;
    this.erro = '';
    this.resultado = null;
    this.paisesRegiao = [];
    this.regiaoSelecionada = '';

    this.countryService
      .buscarPais(this.paisBusca.trim())
      .subscribe({

        next: (paises: CountryData[]) => {

          console.log('2 - RESPOSTA RECEBIDA:', paises);
          console.log(
            '3 - QUANTIDADE DE PAÍSES:',
            paises.length
          );

          this.carregando = false;

          if (paises.length > 0) {

            console.log(
              '4 - PAÍS ENCONTRADO:',
              paises[0]
            );

            this.resultado = paises[0];

            console.log(
              '5 - RESULTADO DEFINIDO:',
              this.resultado
            );

          } else {

            this.erro = 'País não encontrado.';

          }

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'ERRO AO BUSCAR PAÍS:',
            error
          );

          this.carregando = false;

          this.erro =
            'Não encontramos esse país. Tente novamente.';

          this.cdr.detectChanges();

        }

      });

  }

  explorarRegiao(regiao: string): void {

    console.log(
      'BUSCANDO REGIÃO:',
      regiao
    );

    this.carregando = true;
    this.erro = '';
    this.resultado = null;
    this.paisesRegiao = [];
    this.regiaoSelecionada = regiao;

    this.cdr.detectChanges();

    this.countryService
      .buscarRegiao(regiao)
      .subscribe({

        next: (paises: CountryData[]) => {

          console.log(
            'PAÍSES DA REGIÃO:',
            paises
          );

          console.log(
            'QUANTIDADE RECEBIDA:',
            paises.length
          );

          this.carregando = false;

          this.paisesRegiao = [...paises];

          console.log(
            'PAÍSES NO COMPONENTE:',
            this.paisesRegiao
          );

          console.log(
            'QUANTIDADE NO COMPONENTE:',
            this.paisesRegiao.length
          );

          this.cdr.detectChanges();

          console.log(
            'ATUALIZAÇÃO DA TELA SOLICITADA'
          );

        },

        error: (error) => {

          console.error(
            'ERRO AO BUSCAR REGIÃO:',
            error
          );

          this.carregando = false;

          this.erro =
            'Não foi possível carregar os países dessa região.';

          this.cdr.detectChanges();

        }

      });

  }

}