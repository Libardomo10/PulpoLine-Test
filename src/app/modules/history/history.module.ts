import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { HistoryRoutingModule } from './history.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchHistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    TranslateModule
  ]
})
export class HistoryModule { }
