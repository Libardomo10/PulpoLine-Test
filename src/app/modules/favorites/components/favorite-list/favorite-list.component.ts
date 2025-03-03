import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  favoriteCities: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.favorites$.subscribe(data => {
      this.favoriteCities = data;
      this.adjustPagination();
    });
  }

  paginatedCities(): string[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.favoriteCities.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.favoriteCities.length / this.itemsPerPage);
  }

  removeFavorite(city: string): void {
    this.favoritesService.removeFavorite(city);
    this.adjustPagination();
  }

  private adjustPagination(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }
}
