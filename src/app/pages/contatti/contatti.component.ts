import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota un appuntamento</h1>
        <p>Prima valutazione gratuita — disponibile entro 48 ore. Nessun impegno.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Studio Ariosto Fisioterapia</h2>
          <p class="info-address">
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{
                info.contatti.whatsapp
              }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="primo-appuntamento">
            <p>{{ info.servizi.primoAppuntamento }}</p>
          </div>

          <div class="pagamenti">
            <h2>Pagamenti accettati</h2>
            <ul class="pagamenti-list">
              <li *ngFor="let p of info.servizi.pagamentiAccettati">{{ p }}</li>
            </ul>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiedi un appuntamento</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <div class="field">
              <label for="nome">Nome e cognome <span aria-hidden="true">*</span></label>
              <input
                id="nome"
                type="text"
                formControlName="nome"
                required
                autocomplete="name"
                [attr.aria-invalid]="isInvalid('nome')"
              />
              <span class="field-error" *ngIf="isInvalid('nome')" role="alert">Nome obbligatorio (min. 2 caratteri)</span>
            </div>

            <div class="field">
              <label for="email">Email <span aria-hidden="true">*</span></label>
              <input
                id="email"
                type="email"
                formControlName="email"
                required
                autocomplete="email"
                [attr.aria-invalid]="isInvalid('email')"
              />
              <span class="field-error" *ngIf="isInvalid('email')" role="alert">Email non valida</span>
            </div>

            <div class="field">
              <label for="telefono">Telefono <span aria-hidden="true">*</span></label>
              <input
                id="telefono"
                type="tel"
                formControlName="telefono"
                required
                autocomplete="tel"
                [attr.aria-invalid]="isInvalid('telefono')"
              />
              <span class="field-error" *ngIf="isInvalid('telefono')" role="alert">Numero di telefono non valido</span>
            </div>

            <div class="row">
              <div class="field">
                <label for="data">Data preferita <span aria-hidden="true">*</span></label>
                <input
                  id="data"
                  type="date"
                  formControlName="data"
                  required
                  [attr.aria-invalid]="isInvalid('data')"
                />
              </div>
              <div class="field">
                <label for="fascia">Fascia oraria <span aria-hidden="true">*</span></label>
                <select
                  id="fascia"
                  formControlName="fascia"
                  required
                  [attr.aria-invalid]="isInvalid('fascia')"
                >
                  <option value="">-- Seleziona --</option>
                  <option value="mattina">Mattina (8:00–12:00)</option>
                  <option value="pomeriggio">Pomeriggio (14:00–17:00)</option>
                  <option value="sera">Sera (17:00–20:00)</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="motivazione">Motivo della visita <span aria-hidden="true">*</span></label>
              <select
                id="motivazione"
                formControlName="motivazione"
                required
                [attr.aria-invalid]="isInvalid('motivazione')"
              >
                <option value="">-- Seleziona --</option>
                <option value="valutazione">Prima valutazione (gratuita)</option>
                <option value="cervicale">Dolore cervicale / collo</option>
                <option value="lombare">Mal di schiena / lombalgia</option>
                <option value="spalla">Spalla / braccio</option>
                <option value="ginocchio">Ginocchio / anca</option>
                <option value="post-chirurgia">Riabilitazione post-chirurgica</option>
                <option value="sport">Infortuni sportivi</option>
                <option value="postura">Postura / scoliosi</option>
                <option value="altro">Altro</option>
              </select>
              <span class="field-error" *ngIf="isInvalid('motivazione')" role="alert">Seleziona il motivo della visita</span>
            </div>

            <div class="field">
              <label for="note">Note aggiuntive (esami, patologie, farmaci)</label>
              <textarea id="note" formControlName="note" rows="3" placeholder="Es. RMN del 2024, in cura con ibuprofene, allergie..."></textarea>
            </div>

            <!-- Consenso GDPR Art. 9 dati sanitari -->
            <div class="gdpr-block">
              <h3 class="gdpr-title">Consenso trattamento dati sanitari (GDPR Art. 9)</h3>
              <p class="gdpr-text">
                I dati che fornisci (inclusi quelli relativi alla tua salute) rientrano nelle
                <strong>categorie particolari di dati personali</strong> ai sensi dell'Art. 9 del Regolamento (UE)
                2016/679 (GDPR). Il loro trattamento è consentito solo con il tuo consenso esplicito e scritto.
                I dati saranno utilizzati esclusivamente per la gestione della prenotazione e del percorso
                terapeutico, conservati per 10 anni come previsto dalla normativa sanitaria e non ceduti a terzi.
              </p>
              <div class="field field--checkbox">
                <input
                  id="consensoSanitario"
                  type="checkbox"
                  formControlName="consensoSanitario"
                  [attr.aria-invalid]="isInvalid('consensoSanitario')"
                />
                <label for="consensoSanitario">
                  <strong>Consenso obbligatorio —</strong> Acconsento al trattamento dei miei dati personali di
                  natura sanitaria (Art. 9 GDPR) per la prenotazione e il percorso fisioterapico. *
                </label>
              </div>
              <span class="field-error" *ngIf="isInvalid('consensoSanitario')" role="alert">
                Il consenso al trattamento dei dati sanitari è obbligatorio
              </span>
              <div class="field field--checkbox">
                <input id="consensoMarketing" type="checkbox" formControlName="consensoMarketing" />
                <label for="consensoMarketing">
                  Acconsento facoltativamente all'invio di comunicazioni informative sulle terapie e promozioni
                  dello studio (revocabile in qualsiasi momento).
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="form.invalid"
            >
              Invia richiesta
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna prenotazione è realmente inviata.
              Per prenotare contatta il numero sopra.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">✅</span>
              <h3>Grazie, {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta di appuntamento per
                <strong>{{ form.value['motivazione'] }}</strong>
                il <strong>{{ form.value['data'] }}</strong> ({{ form.value['fascia'] }})
                è stata simulata con successo.
              </p>
              <p>
                In un sito reale riceveresti una email di conferma e verrebbe contattato entro 24 ore
                per definire orario e dettagli della seduta.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-address {
        color: var(--color-fg-muted);
        line-height: 1.7;
        margin: 0 0 1rem;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .primo-appuntamento {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: #d1fae5;
        border-radius: var(--radius-sm);
        border-left: 3px solid var(--color-accent);
      }
      .primo-appuntamento p {
        margin: 0;
        font-size: 0.875rem;
        color: #065f46;
        font-weight: 500;
      }
      .pagamenti-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .pagamenti-list li {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field input[aria-invalid="true"],
      .field select[aria-invalid="true"] {
        border-color: var(--color-danger);
      }
      .field-error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .gdpr-block {
        background: #fffbeb;
        border: 1px solid #fde68a;
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.25rem;
      }
      .gdpr-title {
        margin: 0 0 0.5rem;
        font-size: 0.9rem;
        color: #92400e;
      }
      .gdpr-text {
        font-size: 0.8rem;
        color: #78350f;
        line-height: 1.6;
        margin: 0 0 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
        text-align: center;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
        background: #047857;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 1rem 0;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 0.5rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    data: ['', Validators.required],
    fascia: ['', Validators.required],
    motivazione: ['', Validators.required],
    note: [''],
    consensoSanitario: [false, Validators.requiredTrue],
    consensoMarketing: [false]
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset(): void {
    this.form.reset({ consensoSanitario: false, consensoMarketing: false });
    this.submitted.set(false);
  }
}
