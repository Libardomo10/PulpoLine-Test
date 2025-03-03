import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private readonly API_URL = environment.apiUrl;
  private readonly API_KEY = environment.weatherApiKey;

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', city)
      .set('aqi', 'no');

    return this.http.get(`${this.API_URL}/current.json`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getCitySuggestions(query: string): Observable<any> {
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', query);

    return this.http.get(`${this.API_URL}/search.json`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Failed to fetch data.'));
  }
}
