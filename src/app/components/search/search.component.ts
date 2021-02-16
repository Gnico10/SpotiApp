import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  artistas: any[] = [];
  loading: boolean;

  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string): void {

    this.loading = true;
    this.error = false;

    this.spotify.getArtistas( termino )
        .subscribe( (data: any) => {
          this.artistas = data;
          this.loading = false;
        }, ( errorServicio ) => {
          this.loading = false;
          this.error = true;
          this.errorMessage = errorServicio.error.error.message;
        });
  }
}
