import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Il nostro team</h1>
        <p>Fisioterapisti laureati, iscritti all'Albo TSRM-PSTRP, con formazione continua certificata.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Studio Ariosto Fisioterapia</h2>
        <p>
          Fondato nel 2005 dal Dott. Marco Ariosto, lo Studio nasce dall'idea di offrire a Bologna una fisioterapia
          di alto livello clinico, accessibile in regime privato con tempi di attesa minimi. Ogni paziente è
          un individuo con una storia specifica: il nostro approccio è sempre personalizzato, basato su evidenze
          scientifiche aggiornate e fondato sulla relazione terapeutica.
        </p>
        <p>
          Nel corso degli anni il team si è ampliato con professionisti selezionati per competenza e vocazione.
          La Dott.ssa Chiara Ferretti ha portato l'eccellenza nella riabilitazione sportiva; il Dott. Luca Zanetti
          la padronanza delle tecnologie fisioterapiche più avanzate. Tre figure complementari, una sola filosofia:
          trattare la causa, non solo il sintomo.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Evidenza scientifica</h3>
            <p>Ogni protocollo segue le linee guida internazionali più aggiornate. Formazione continua obbligatoria per tutti i professionisti.</p>
          </li>
          <li>
            <h3>Approccio globale</h3>
            <p>Valutiamo la persona nella sua interezza, non solo il sintomo. Anamnesi completa, analisi posturale, piano personalizzato.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Spieghiamo sempre la diagnosi funzionale, il piano di trattamento e i tempi attesi di recupero prima di iniziare.</p>
          </li>
          <li>
            <h3>Privacy sanitaria</h3>
            <p>I dati sensibili di salute (Art. 9 GDPR) sono trattati con le massime garanzie: consenso esplicito, cifratura, accesso limitato.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>I fisioterapisti</h2>
        <ul class="team-grid">
          <li *ngFor="let membro of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ membro.nome.charAt(5) }}</div>
            <h3>{{ membro.nome }}</h3>
            <p class="team-card__role">{{ membro.ruolo }}</p>
            <p class="team-card__albo">Albo n. {{ membro.alboNumero }}</p>
            <p class="team-card__bio">{{ membro.bio }}</p>
            <p class="team-card__exp">{{ membro.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills" aria-label="Specializzazioni">
              <li *ngFor="let s of membro.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq-preview" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
        font-size: 1rem;
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
        text-transform: uppercase;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.875rem;
      }
      .team-card__albo {
        margin: 0 0 0.75rem;
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .team-card__bio {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.6;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: #d1fae5;
        color: #065f46;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-weight: 500;
      }
      .faq-preview h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-subtle);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
