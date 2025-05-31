import { Component } from '@angular/core';
import { SearchForm } from "./search-form/search-form";
import { UserCards } from "./user-cards/user-cards";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchForm, UserCards],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  searchTerm: string = '';

  onSearchChange(value: string) {
    this.searchTerm = value;
  }
}
