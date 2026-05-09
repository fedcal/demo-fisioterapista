import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, TerapieData, TeamData, TecnologieData, FaqData } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache stream con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly terapie$: Observable<TerapieData> = this.http
    .get<TerapieData>('/assets/mock/terapie.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<TeamData> = this.http
    .get<TeamData>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly tecnologie$: Observable<TecnologieData> = this.http
    .get<TecnologieData>('/assets/mock/tecnologie.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<FaqData> = this.http
    .get<FaqData>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
