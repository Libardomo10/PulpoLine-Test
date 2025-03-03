import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/weather/weather.module').then(m => m.WeatherModule) },
  { path: 'favorites', loadChildren: () => import('./modules/favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'history', loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
