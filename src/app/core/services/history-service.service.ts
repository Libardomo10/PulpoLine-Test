import { Injectable } from '@angular/core';
import { SearchRecord } from '../models/search-record.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly HISTORY_KEY = 'weather_search_history';

  private historySubject = new BehaviorSubject<SearchRecord[]>(this.getHistory());
  public history$ = this.historySubject.asObservable();

  constructor() { }


  /** Obtiene el historial desde localStorage y lo convierte en un array de SearchRecord */
  getHistory(): SearchRecord[] {
    const storedHistory = localStorage.getItem(this.HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  }

  /** Guarda una nueva búsqueda en el historial */
  addToHistory(record: SearchRecord): void {
    let history = this.getHistory();

    // Evitar duplicados (solo una entrada por ciudad)
    history = history.filter(item => item.city !== record.city);

    history.unshift(record); // Agrega al inicio
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));

    // Emitir nuevo historial actualizado
    this.historySubject.next(history);
  }

  /** Limpia el historial de búsquedas */
  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
    this.historySubject.next([]); // Emitir lista vacía
  }
}
