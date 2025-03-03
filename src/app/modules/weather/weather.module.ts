import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherRoutingModule } from './weather.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WeatherSearchComponent,
    WeatherResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WeatherRoutingModule,
    TranslateModule
  ],
  exports: [
    WeatherSearchComponent,
    WeatherResultComponent
  ]
})
export class WeatherModule { }
