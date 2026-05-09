import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-badge">Studio di Fisioterapia · Bologna</p>
        <h1>Riabilitazione e prevenzione,<br />terapie manuali avanzate</h1>
        <p class="hero-tagline">
          Fisioterapisti laureati e iscritti all'Albo TSRM-PSTRP. Prima valutazione gratuita.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota una visita</a>
          <a routerLink="/terapie" class="btn btn-secondary">Scopri le terapie</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Studio Ariosto</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Professionisti certificati</h3>
          <p>Tutti i fisioterapisti sono laureati e iscritti all'Albo TSRM-PSTRP con anni di specializzazione.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Tecnologie avanzate</h3>
          <p>Tecar di terza generazione, laser Hilterapia, baropodometro digitale e strumentazione certificata CE.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>Protocolli EBM</h3>
          <p>Trattamenti basati su evidenze scientifiche aggiornate. Piano terapeutico personalizzato per ogni paziente.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">⏱️</span>
          <h3>Appuntamenti rapidi</h3>
          <p>Prima valutazione gratuita disponibile entro 48 ore. Nessuna lista d'attesa per i percorsi riabilitativi.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredTerapie$ | async as terapie">
      <div class="section-header">
        <h2>Le terapie più richieste</h2>
        <a routerLink="/terapie" class="link-more">Tutte le terapie →</a>
      </div>
      <ul class="terapie-grid">
        <li *ngFor="let terapia of terapie" class="terapia-card">
          <div class="terapia-card__head">
            <h3>{{ terapia.nome }}</h3>
            <span class="terapia-card__price">da {{ terapia.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="terapia-card__desc">{{ terapia.descrizione }}</p>
          <div class="terapia-card__meta">
            <span class="terapia-card__duration">{{ terapia.durata }} min</span>
            <ul class="terapia-card__tags">
              <li *ngFor="let ind of terapia.indicazioni.slice(0, 2)">{{ ind }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </section>

    <section class="trust-band">
      <div class="demo-container trust-grid">
        <div class="trust-item">
          <span class="trust-number">19+</span>
          <span class="trust-label">Anni di esperienza</span>
        </div>
        <div class="trust-item">
          <span class="trust-number">3</span>
          <span class="trust-label">Fisioterapisti laureati</span>
        </div>
        <div class="trust-item">
          <span class="trust-number">12</span>
          <span class="trust-label">Terapie disponibili</span>
        </div>
        <div class="trust-item">
          <span class="trust-number">8</span>
          <span class="trust-label">Tecnologie certificate</span>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prima valutazione gratuita</h2>
        <p>
          20 minuti con il tuo fisioterapista: anamnesi, valutazione funzionale e piano di trattamento personalizzato.
          Nessun impegno.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/chi-siamo" class="btn btn-secondary">Conosci il team</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-badge {
        display: inline-block;
        background: #d1fae5;
        color: #065f46;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .hero h1 {
        font-size: clamp(1.8rem, 5vw, 3.2rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 540px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
      .featured {
        padding: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .terapie-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .terapia-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .terapia-card__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .terapia-card__head h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .terapia-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 0.9rem;
      }
      .terapia-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .terapia-card__meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .terapia-card__duration {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        background: var(--color-bg-subtle);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
      }
      .terapia-card__tags {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.3rem;
        flex-wrap: wrap;
      }
      .terapia-card__tags li {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        background: #d1fae5;
        color: #065f46;
        font-weight: 500;
      }
      .trust-band {
        background: var(--color-fg-default);
        color: #ffffff;
        padding: 3rem 1rem;
      }
      .trust-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 2rem;
        text-align: center;
      }
      .trust-number {
        display: block;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
        margin-bottom: 0.5rem;
      }
      .trust-label {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.8);
      }
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-top: 1px solid var(--color-border);
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
      }
      .cta-band p {
        color: var(--color-fg-muted);
        margin: 0 auto 2rem;
        max-width: 540px;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredTerapie$ = this.mockData.terapie$.pipe(
    map((data) => data.terapie.filter((t) => t.featured).slice(0, 3))
  );
}
