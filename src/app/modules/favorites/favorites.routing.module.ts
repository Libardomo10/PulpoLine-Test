import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: FavoriteListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
