import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { FavoritesRoutingModule } from './favorites.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FavoriteListComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    TranslateModule
  ]
})
export class FavoritesModule { }
