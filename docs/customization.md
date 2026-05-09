# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Studio Fisioterapista'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili sviluppi customizzabili

Oltre ai Tier standard, il template Studio Fisioterapista supporta queste integrazioni:

1. **Video esercizi offline mobile**: Libreria HD custom, cacheable su app, timer con notifiche beep
2. **Biomechanics tracking**: Apple Health ROM, Garmin balance score, sincronizzazione automatica portale
3. **Posture AI (BlazePose)**: Foto paziente → TensorFlow.js → score 0-100% correttezza, feedback per esercizio
4. **Tele-therapy Zoom**: Link consultation auto-generato, integrato nel piano cura
5. **App mobile offline**: iOS/Android con esercizi cached, progress chart dolore/ROM, sincronizzazione cloud
6. **Analytics outcome**: Retention rate piano, riduzione dolore media, adherence per esercizio
7. **Multi-sede**: Riepilogo consolidato revenue, performance per studio, centralized patient DB

**Note healthcare**: Tutti gli sviluppi avanzati rispettano GDPR Art.9 (dati health sensibili).

Contatta Federico per valutazione effort e pricing addon.

---

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `fisioterapista` con nome cliente (`studio-davide`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
