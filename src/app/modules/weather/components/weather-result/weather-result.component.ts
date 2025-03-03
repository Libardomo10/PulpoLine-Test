import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/core/models/weather.model';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherResultComponent implements OnInit {

  @Input() weatherData!: WeatherData;
  addingFavorite = false;
  favoriteCities: string[] = [];

  constructor(public favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteCities = this.favoritesService.getFavorites();
  }

  toggleFavorite(city: string): void {
    if (this.favoritesService.isFavorite(city)) {
      this.favoritesService.removeFavorite(city);
    } else {
      this.favoritesService.addFavorite(city);
      this.addingFavorite = true;
      setTimeout(() => this.addingFavorite = false, 2000);
    }
    this.loadFavorites();
  }
}
