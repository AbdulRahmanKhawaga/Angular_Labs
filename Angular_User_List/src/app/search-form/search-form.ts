import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css'
})
export class SearchForm {
  searchText: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearch() {
    this.searchChange.emit(this.searchText);
  }

  onReset() {
    this.searchText = '';
    this.searchChange.emit(this.searchText);
  }
}
