import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { WeatherApiService } from 'src/app/core/services/weather-api.service';
import { WeatherData } from 'src/app/core/models/weather.model';
import { HistoryService } from 'src/app/core/services/history-service.service';
import { SearchRecord } from 'src/app/core/models/search-record.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  searchControl = new FormControl('');
  isLoading = false;
  showToast = false;
  toastMessage = '';
  weatherData!: WeatherData | null; // Almacena los datos del clima

  private citySuggestionsSubject$ = new BehaviorSubject<any[]>([]); // BehaviorSubject para manejar los datos
  citySuggestions$: Observable<any[]> = this.citySuggestionsSubject$.asObservable(); // Observable para el template

  constructor(private weatherApiService: WeatherApiService,
    private historyService: HistoryService,
    private route: ActivatedRoute) {
      this.setupSearch();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.onSelectCity(city);
      }
    });
  }

  private setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(() => (this.isLoading = true)),
      switchMap(value => {
        if (!value?.trim()) { 
          this.citySuggestionsSubject$.next([]); // Limpia sugerencias si el campo está vacío
          this.isLoading = false;
          this.showToastMessage('PLS_ENTER_CITY_NAME');
          return []; // Retorna un array vacío para evitar la consulta
        }
        return this.weatherApiService.getCitySuggestions(value);
      }),
      tap(() => (this.isLoading = false))
    ).subscribe(suggestions => {
      if (suggestions.length == 0) {
        this.showToastMessage('CITY_NOT_FOUND');
      }
      this.citySuggestionsSubject$.next(suggestions || []);
    });
  }

  public onSelectCity(city: string): void {
    this.searchControl.setValue(city, { emitEvent: false });
    this.citySuggestionsSubject$.next([]); // Limpia las sugerencias
    
    this.weatherApiService.getCurrentWeather(city).subscribe(data => {
      if (data) {
        this.weatherData = {
          city: data.location.name,
          country: data.location.country,
          temperatureC: data.current.temp_c,
          temperatureF: data.current.temp_f,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          windSpeed: data.current.wind_kph,
          humidity: data.current.humidity,
          localTime: data.location.localtime
        };

        const selectCityRecord: SearchRecord = {
          city: city,
          temperatureC: this.weatherData?.temperatureC,
          temperatureF: this.weatherData?.temperatureF,
          weather: this.weatherData?.condition,
          localTime: this.weatherData?.localTime
        };
        this.historyService.addToHistory(selectCityRecord); // Guarda en el historial
      } else {
        this.weatherData = null;
        this.showToastMessage('CITY_NOT_FOUND');
      }
    });
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
