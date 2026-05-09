// Tipi TypeScript per i dati mock dello Studio Ariosto Fisioterapia

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziStudio {
  primoAppuntamento: string;
  convenzioneSSN: boolean;
  privato: boolean;
  pagamentiAccettati: string[];
  accessibileDisabili: boolean;
  parcheggioNearby: boolean;
  wifiGratuito: boolean;
  spogliatoi: boolean;
}

export interface AlboIscrizione {
  ente: string;
  regioneIscrizione: string;
  partitaIva: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziStudio;
  albo: AlboIscrizione;
  metaSeo: MetaSeo;
}

export interface CategoriaTerapia {
  id: string;
  nome: string;
  ordine: number;
}

export interface Terapia {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  durata: number;
  prezzo: number;
  indicazioni: string[];
  featured: boolean;
}

export interface TerapieData {
  categorie: CategoriaTerapia[];
  terapie: Terapia[];
}

export interface FisioterapistaMembro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
  alboNumero: string;
  laurea: string;
}

export interface TeamData {
  team: FisioterapistaMembro[];
}

export interface Tecnologia {
  id: number;
  nome: string;
  categoria: string;
  descrizione: string;
  indicazioni: string[];
  certificazioni: string[];
  annoAcquisto: number;
}

export interface TecnologieData {
  tecnologie: Tecnologia[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}
