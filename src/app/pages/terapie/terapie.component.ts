import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Terapia } from '../../data/types';

interface TerapieCategorizzate {
  id: string;
  nome: string;
  terapie: Terapia[];
}

@Component({
  selector: 'app-terapie',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Le nostre terapie</h1>
        <p>12 trattamenti fisioterapici erogati da professionisti laureati e iscritti all'Albo.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section
        *ngFor="let cat of view"
        class="terapia-category"
        [id]="cat.id"
      >
        <h2>{{ cat.nome }}</h2>
        <ul class="terapia-list">
          <li *ngFor="let terapia of cat.terapie" class="terapia-item">
            <div class="terapia-item__head">
              <h3>{{ terapia.nome }}</h3>
              <span class="terapia-item__price">{{ terapia.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="terapia-item__desc">{{ terapia.descrizione }}</p>
            <div class="terapia-item__footer">
              <span class="terapia-item__duration">
                <span aria-label="Durata seduta">⏱</span> {{ terapia.durata }} min
              </span>
              <ul class="terapia-item__tags" aria-label="Indicazioni principali">
                <li *ngFor="let ind of terapia.indicazioni">{{ ind }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <div class="terapie-cta">
        <p>
          Non trovi la terapia che cerchi o vuoi sapere qual è la più adatta alla tua condizione?
          Prenota la valutazione gratuita.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Prima valutazione gratuita</a>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .terapia-category {
        margin-bottom: 3.5rem;
      }
      .terapia-category h2 {
        font-size: 1.4rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .terapia-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .terapia-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .terapia-item__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .terapia-item__head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .terapia-item__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
      }
      .terapia-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
        line-height: 1.6;
      }
      .terapia-item__footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .terapia-item__duration {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        white-space: nowrap;
      }
      .terapia-item__tags {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .terapia-item__tags li {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        background: #d1fae5;
        color: #065f46;
        font-weight: 500;
      }
      .terapie-cta {
        margin-top: 2rem;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        text-align: center;
      }
      .terapie-cta p {
        color: var(--color-fg-muted);
        margin: 0 0 1.25rem;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #047857;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerapieComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.terapie$.pipe(
    map((data): TerapieCategorizzate[] =>
      data.categorie
        .slice()
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat) => ({
          id: cat.id,
          nome: cat.nome,
          terapie: data.terapie.filter((t) => t.categoria === cat.id)
        }))
    )
  );
}
