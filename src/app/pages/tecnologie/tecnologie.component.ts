import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Tecnologia } from '../../data/types';

interface TecnologiePerCategoria {
  categoria: string;
  tecnologie: Tecnologia[];
}

@Component({
  selector: 'app-tecnologie',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Tecnologie e attrezzature</h1>
        <p>Dotazione strumentale certificata CE con 8 dispositivi fisioterapici di ultima generazione.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="intro">
        <p>
          Lo Studio Ariosto investe continuamente nell'aggiornamento tecnologico perché le strumentazioni di qualità,
          abbinate alla competenza clinica del fisioterapista, consentono trattamenti più efficaci, più veloci e
          più precisi. Ogni dispositivo è dotato di certificazione CE Medico e viene sottoposto a manutenzione
          annuale certificata.
        </p>
      </section>

      <section
        *ngFor="let gruppo of gruppi$ | async"
        class="tecnologia-group"
      >
        <h2>{{ gruppo.categoria }}</h2>
        <ul class="tecnologia-list">
          <li *ngFor="let tech of gruppo.tecnologie" class="tecnologia-card">
            <div class="tecnologia-card__head">
              <h3>{{ tech.nome }}</h3>
              <span class="tecnologia-card__anno">dal {{ tech.annoAcquisto }}</span>
            </div>
            <p class="tecnologia-card__desc">{{ tech.descrizione }}</p>
            <div class="tecnologia-card__footer">
              <div class="tecnologia-card__indicazioni">
                <span class="label">Indicazioni:</span>
                <ul class="tag-list">
                  <li *ngFor="let ind of tech.indicazioni">{{ ind }}</li>
                </ul>
              </div>
              <div class="tecnologia-card__cert">
                <span class="label">Certificazioni:</span>
                <ul class="cert-list">
                  <li *ngFor="let cert of tech.certificazioni">{{ cert }}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <div class="nota-tecnica">
        <p>
          Tutta la strumentazione è soggetta a manutenzione periodica certificata e taratura annuale.
          I dispositivi elettromedicali rispettano la Direttiva 93/42/CEE e il Regolamento (UE) 2017/745 (MDR).
        </p>
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
      .intro {
        max-width: 720px;
        margin: 0 auto 3rem;
        text-align: center;
      }
      .intro p {
        color: var(--color-fg-muted);
        line-height: 1.7;
        margin: 0;
      }
      .tecnologia-group {
        margin-bottom: 3rem;
      }
      .tecnologia-group h2 {
        font-size: 1.3rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .tecnologia-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.25rem;
      }
      .tecnologia-card {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .tecnologia-card__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .tecnologia-card__head h3 {
        margin: 0;
        font-size: 1rem;
      }
      .tecnologia-card__anno {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        flex-shrink: 0;
      }
      .tecnologia-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.75rem;
        line-height: 1.6;
      }
      .tecnologia-card__footer {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .tecnologia-card__indicazioni,
      .tecnologia-card__cert {
        display: flex;
        align-items: flex-start;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        flex-shrink: 0;
      }
      .tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .tag-list li {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        background: #d1fae5;
        color: #065f46;
        font-weight: 500;
      }
      .cert-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .cert-list li {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        background: #dbeafe;
        color: #1e40af;
        font-weight: 500;
      }
      .nota-tecnica {
        margin-top: 2rem;
        padding: 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-border);
      }
      .nota-tecnica p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.85rem;
        font-style: italic;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TecnologieComponent {
  private readonly mockData = inject(MockDataService);

  readonly gruppi$ = this.mockData.tecnologie$.pipe(
    map((data): TecnologiePerCategoria[] => {
      const categorieUniche = [...new Set(data.tecnologie.map((t) => t.categoria))];
      return categorieUniche.map((cat) => ({
        categoria: cat,
        tecnologie: data.tecnologie.filter((t) => t.categoria === cat)
      }));
    })
  );
}
