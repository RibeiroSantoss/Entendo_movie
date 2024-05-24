import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string = '';
  suggestions: any[] = [];
  apiKey: string = '803a3f9c47e434587d7521eec20a889d';

  constructor() {}

  async searchQuotes() {
    if (this.searchTerm.trim() === '') {
      this.suggestions = [];
      return;
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.searchTerm}`);
      this.suggestions = response.data.results.slice(0, 5).map((movie: any) => {
        return {
          id: movie.id,
          title: movie.title,
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
        };
      });
    } catch (error) {
      console.error('Error searching suggestions', error);
      this.suggestions = [];
    }
  }
}
