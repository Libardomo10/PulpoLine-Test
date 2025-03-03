import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchRecord } from 'src/app/core/models/search-record.model';
import { HistoryService } from 'src/app/core/services/history-service.service';
import { TranslationService } from 'src/app/core/Translate/translation.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  history: SearchRecord[] = [];
  @Output() citySelected = new EventEmitter<string>();

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private historyService: HistoryService,
    private router: Router,
    public translationService: TranslationService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyService.history$.subscribe(data => {
      this.history = data;
      this.adjustPagination();
    });
  }

  paginatedHistory(): SearchRecord[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.history.slice(start, start + this.itemsPerPage);
  }

  selectCity(city?: string): void {
    this.citySelected.emit(city);
    this.router.navigate(['/weather'], { queryParams: { city } });
  }

  clearHistory(): void {
    this.historyService.clearHistory();
    this.adjustPagination();
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
    return Math.ceil(this.history.length / this.itemsPerPage);
  }

  private adjustPagination(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }
}
