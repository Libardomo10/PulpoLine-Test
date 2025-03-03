import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favoriteCities';

  private favoritesSubject = new BehaviorSubject<string[]>(this.getFavorites());
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() { }

  getFavorites(): string[] {
    const storedFavorites = localStorage.getItem(this.STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  addFavorite(city: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites); // Emitir cambios
    }
  }

  removeFavorite(city: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav !== city);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites); // Emitir cambios
  }

  isFavorite(city: string): boolean {
    return this.getFavorites().includes(city);
  }
}
